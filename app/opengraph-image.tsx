import { ImageResponse } from 'next/og'

export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'center',
          backgroundColor: '#ffffff',
          padding: '72px 96px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Orange top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, backgroundColor: '#f97316' }} />

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 44 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            backgroundColor: '#f97316',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 900 }}>F</div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: '#111827', letterSpacing: '-0.5px' }}>
            FormBharat
          </div>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 62, fontWeight: 800, color: '#111827',
          lineHeight: 1.1, marginBottom: 28, maxWidth: 900,
          letterSpacing: '-1.5px',
        }}>
          {'Create any form '}
          <span style={{ color: '#f97316' }}>in seconds</span>
          {' with AI'}
        </div>

        {/* Sub */}
        <div style={{ fontSize: 24, color: '#6b7280', maxWidth: 680, lineHeight: 1.5, marginBottom: 52 }}>
          Free AI form builder built for Indian businesses.
          WhatsApp-native, UPI-ready, open source.
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 14 }}>
          {['🤖  AI-Powered', '🇮🇳  Made for India', '✅  Free Forever'].map(tag => (
            <div key={tag} style={{
              display: 'flex',
              backgroundColor: '#fff7ed',
              border: '1.5px solid #fed7aa',
              borderRadius: 100,
              padding: '10px 22px',
              fontSize: 18, fontWeight: 600, color: '#ea580c',
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* URL watermark */}
        <div style={{ position: 'absolute', bottom: 36, right: 96, fontSize: 16, color: '#d1d5db' }}>
          formbharat.com
        </div>
      </div>
    ),
    { ...size },
  )
}
