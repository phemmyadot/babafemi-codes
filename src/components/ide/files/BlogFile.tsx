import type { BlogPost } from '@/lib/hashnode'
import { formatBlogDate } from '../config'

interface BlogFileProps {
  blogPosts: BlogPost[]
  hashnodeUrl: string
  isActive: boolean
}

export function BlogFile({ blogPosts, hashnodeUrl, isActive }: BlogFileProps) {
  return (
    <div className={`file-section ${isActive ? 'active' : ''}`} id="file-blog">
      <div className="code-block">
        <div className="code-line"><span className="cm"># Writing &amp; Thoughts</span></div>
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">Articles on mobile engineering, full-stack development,</span></div>
        <div className="code-line"><span className="cm">and lessons from the field.</span></div>
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">---</span></div>

        {blogPosts.length > 0 ? blogPosts.map((post, i) => (
          <div key={i}>
            <div className="code-line blank"/>
            <div className="code-line"><span className="cm">## {post.title}</span></div>
            <div className="code-line blank"/>
            <div className="code-line">
              <span className="pl">📅 {formatBlogDate(post.publishedAt)} · {post.readTimeInMinutes} min read</span>
            </div>
            <div className="code-line blank"/>
            <div className="code-line"><span className="cm">{post.brief}</span></div>
            <div className="code-line blank"/>
            <div className="code-line">
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <span className="lk">[Read on Hashnode →]</span>
              </a>
            </div>
            <div className="code-line blank"/>
            <div className="code-line"><span className="cm">---</span></div>
          </div>
        )) : (
          <>
            <div className="code-line blank"/>
            <div className="code-line"><span className="cm">No posts yet. Check back soon.</span></div>
          </>
        )}

        {hashnodeUrl && (
          <>
            <div className="code-line blank"/>
            <div className="code-line">
              <a href={hashnodeUrl} target="_blank" rel="noopener noreferrer">
                <span className="lk">[View all posts →]</span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
