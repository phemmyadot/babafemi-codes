import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Card } from '@/components/ui/Card'
import { BlogPost } from '@/lib/hashnode'

interface BlogProps {
  posts:       BlogPost[]
  hashnodeUrl: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'short',
    day:   'numeric',
  })
}

export function Blog({ posts, hashnodeUrl }: BlogProps) {
  if (posts.length === 0) return null

  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-content mx-auto">
        <AnimatedSection>
          <SectionHeader
            label="05 / Blog"
            title="Writing &"
            titleAccent="thoughts"
            description="Articles on mobile engineering, full-stack development, and lessons from the field."
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 60}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <Card hover className="h-full flex flex-col p-0 overflow-hidden">
                  {/* Cover image */}
                  <div className="relative w-full aspect-video bg-surface-elevated overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10" />
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-3 mb-3 font-mono text-xs text-text-muted">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>·</span>
                      <span>{post.readTimeInMinutes} min read</span>
                    </div>

                    <h3 className="font-display font-semibold text-base text-text-primary leading-snug mb-2 group-hover:text-accent-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed flex-1 line-clamp-3">
                      {post.brief}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-accent-primary">
                      Read more <ArrowUpRight size={13} />
                    </span>
                  </div>
                </Card>
              </a>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200}>
          <div className="mt-10 text-center">
            <a
              href={hashnodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-accent-primary transition-colors"
            >
              View all posts <ArrowUpRight size={15} />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
