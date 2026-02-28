import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export const size = {
  width: 64,
  height: 64,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
          background:
            'radial-gradient(circle at 20% 20%, rgba(96,165,250,0.9), rgba(59,130,246,0.7) 38%, rgba(139,92,246,0.95) 100%)',
          color: 'white',
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: '-1px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        EC
      </div>
    ),
    {
      ...size,
    }
  );
}
