import { tickerItems } from '../data/content'

export default function Ticker() {
  const doubled = [...tickerItems, ...tickerItems]

  return (
    <div
      className="overflow-hidden py-4"
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-12 font-display text-base tracking-[0.2em] whitespace-nowrap"
            style={{ color: 'var(--text-dim)' }}
          >
            {item}
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: 'var(--accent)' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
