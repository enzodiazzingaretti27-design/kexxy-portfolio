function WaveformVisual() {
  const heights = [40, 70, 55, 85, 45, 90, 60, 75, 50, 65, 80, 35]
  return (
    <div
      className="h-44 mb-6 relative overflow-hidden flex items-end gap-[3px] px-4"
      style={{ background: 'var(--surface)' }}
    >
      {heights.map((h, i) => (
        <div
          key={i}
          className="wv-bar flex-1"
          style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
        />
      ))}
    </div>
  )
}

function GeometryVisual() {
  return (
    <div
      className="h-44 mb-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0e0e0e 0%, #1a1a1a 100%)' }}
    >
      <svg
        viewBox="0 0 200 180"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="100,20 160,140 40,140" fill="none" stroke="rgba(200,242,60,0.4)" strokeWidth="1" />
        <polygon points="100,45 145,130 55,130" fill="none" stroke="rgba(200,242,60,0.2)" strokeWidth="1" />
        <polygon points="100,70 130,120 70,120" fill="none" stroke="rgba(200,242,60,0.1)" strokeWidth="1" />
        <circle cx="100" cy="100" r="3" fill="rgba(200,242,60,0.8)" />
      </svg>
    </div>
  )
}

const visuals = {
  audio: WaveformVisual,
  visual: GeometryVisual,
}

const colSpan = {
  large: 'col-span-7',
  medium: 'col-span-5',
  half: 'col-span-6',
  full: 'col-span-12',
}

export default function WorkCard({ project }) {
  const Visual = visuals[project.type]

  return (
    <div
      className={`work-card ${colSpan[project.size]} relative p-10 transition-colors duration-400 overflow-hidden`}
      style={{ background: 'var(--bg)', cursor: 'none' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}
    >
      <p
        className="font-mono text-[0.6rem] tracking-[0.15em] mb-8"
        style={{ color: 'var(--text-dim)' }}
      >
        {project.id}
      </p>

      {Visual && <Visual />}

      <span
        className="font-mono text-[0.6rem] uppercase tracking-widest px-3 py-1 inline-block mb-5"
        style={{ color: 'var(--accent)', background: 'var(--accent-dim)' }}
      >
        {project.tag}
      </span>

      <h3
        className="font-display text-3xl leading-tight mb-3"
        style={{ letterSpacing: '0.02em' }}
      >
        {project.title}
      </h3>

      <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
        {project.desc}
      </p>

      <div className="work-card-arrow">→</div>
    </div>
  )
}
