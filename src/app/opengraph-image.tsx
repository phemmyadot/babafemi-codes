import { ImageResponse } from 'next/og'
import { getProfile } from '@/lib/queries'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const profile = await getProfile()

  const name   = profile ? `${profile.firstName} ${profile.lastName}` : ''
  const title  = profile?.titles?.[0] ?? ''
  const tags   = profile?.certifications?.slice(0, 4) ?? []

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background: '#0A0A0F',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
          }}
        />

        {/* Domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '48px',
            color: '#8B5CF6',
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
        >
          babafemi.codes
        </div>

        {/* Name */}
        {name && (
          <div
            style={{
              display: 'flex',
              fontSize: '72px',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #8B5CF6 60%, #06B6D4 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {name}
          </div>
        )}

        {/* Title */}
        {title && (
          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              fontWeight: 500,
              color: '#94A3B8',
              marginBottom: '40px',
            }}
          >
            {title}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: '12px' }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '8px 20px',
                  borderRadius: '999px',
                  border: '1px solid rgba(139,92,246,0.4)',
                  background: 'rgba(139,92,246,0.1)',
                  color: '#C4B5FD',
                  fontSize: '16px',
                  fontWeight: 500,
                  display: 'flex',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    ),
    { ...size }
  )
}
