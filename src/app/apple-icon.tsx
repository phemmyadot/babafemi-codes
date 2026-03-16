import { ImageResponse } from 'next/og'

export const size        = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6366F1 0%, #22D3EE 100%)',
          borderRadius: '40px',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 96,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            letterSpacing: '-5px',
            marginTop: '-4px',
          }}
        >
          B.
        </span>
      </div>
    ),
    { ...size },
  )
}
