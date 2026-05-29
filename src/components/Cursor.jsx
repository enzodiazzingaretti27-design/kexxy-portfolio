import { useCursor } from '../hooks/useCursor'

export default function Cursor() {
  const { cursorRef, ringRef } = useCursor()

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ background: 'var(--accent)', transition: 'transform 0.1s ease' }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          border: '1px solid rgba(200,242,60,0.5)',
          transition: 'width 0.3s ease, height 0.3s ease',
        }}
      />
    </>
  )
}
