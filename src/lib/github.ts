export interface GitHubEvent {
  id:        string
  type:      string
  repo:      string
  repoUrl:   string
  message:   string
  createdAt: string
}

const INTERESTING = new Set([
  'PushEvent',
  'PullRequestEvent',
  'CreateEvent',
  'ReleaseEvent',
  'IssuesEvent',
])

function summarise(event: {
  type: string
  repo: { name: string }
  payload: Record<string, unknown>
}): string {
  const repo = event.repo.name.split('/')[1] ?? event.repo.name
  switch (event.type) {
    case 'PushEvent': {
      const commits = (event.payload.commits as unknown[])?.length ?? 1
      return `Pushed ${commits} commit${commits > 1 ? 's' : ''} to ${repo}`
    }
    case 'PullRequestEvent': {
      const action = event.payload.action as string
      return `${action === 'closed' ? 'Merged' : 'Opened'} a pull request in ${repo}`
    }
    case 'CreateEvent': {
      const ref = event.payload.ref_type as string
      return `Created a ${ref} in ${repo}`
    }
    case 'ReleaseEvent':
      return `Published a release in ${repo}`
    case 'IssuesEvent': {
      const action = event.payload.action as string
      return `${action === 'closed' ? 'Closed' : 'Opened'} an issue in ${repo}`
    }
    default:
      return `Activity in ${repo}`
  }
}

export async function getGitHubActivity(githubUrl: string): Promise<GitHubEvent[]> {
  try {
    const username = githubUrl.replace(/\/$/, '').split('/').pop()
    if (!username) return []

    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=30`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 },
      }
    )

    if (!res.ok) return []

    const events: { id: string; type: string; repo: { name: string }; payload: Record<string, unknown>; created_at: string }[] =
      await res.json()

    return events
      .filter((e) => INTERESTING.has(e.type))
      .slice(0, 8)
      .map((e) => ({
        id:        e.id,
        type:      e.type,
        repo:      e.repo.name,
        repoUrl:   `https://github.com/${e.repo.name}`,
        message:   summarise(e),
        createdAt: e.created_at,
      }))
  } catch {
    return []
  }
}
