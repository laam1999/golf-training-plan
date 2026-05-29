import { ImageResponse } from 'next/og'

export const alt = 'GolfGains — a 12-week golf practice plan built around your game'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, #14361f 0%, #0a1f14 55%, #06140d 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#34d399',
              marginRight: 18,
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: 22, background: '#06140d' }} />
          </div>
          <div style={{ display: 'flex', fontSize: 36, fontWeight: 600 }}>GolfGains</div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 70, fontWeight: 700, lineHeight: 1.1 }}>
            A 12-week practice plan
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 70,
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#34d399',
            }}
          >
            built around your game
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 30,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 900,
            }}
          >
            Specific, drill-by-drill plans from your clubs, weak spots & schedule.
          </div>
        </div>

        {/* Footer chips */}
        <div style={{ display: 'flex', fontSize: 24, color: 'rgba(255,255,255,0.6)' }}>
          Generates in ~30 seconds   ·   Free, no signup
        </div>
      </div>
    ),
    { ...size }
  )
}
