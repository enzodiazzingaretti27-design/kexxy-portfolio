export default function Hero() {
  return (
    <section className="min-h-screen grid grid-cols-2 items-center px-12 pt-32 pb-16 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
          animation: 'fadeIn 1.5s 0.5s both',
        }}
      />

      {/* Left */}
      <div className="relative z-10">
        <p
          className="font-mono text-xs uppercase tracking-[0.2em] mb-6"
          style={{ color: 'var(--accent)', animation: 'fadeUp 0.8s 0.4s both' }}
        >
          — Enzo Diaz Zingaretti
        </p>

        <h1
          className="font-display leading-none"
          style={{
            fontSize: 'clamp(5rem, 12vw, 10rem)',
            letterSpacing: '-0.02em',
            animation: 'fadeUp 1s 0.5s both',
          }}
        >
          Kexxy
          <span
            className="block"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(240,237,232,0.15)',
            }}
          >
            Studio
          </span>
        </h1>

        <p
          className="mt-8 text-sm leading-loose max-w-sm"
          style={{ color: 'var(--text-muted)', animation: 'fadeUp 0.8s 0.7s both' }}
        >
          DJ · Visual Artist · Designer.<br />
          Constructing dark experiences through sound, motion, and image.
          Based in Argentina, operating everywhere.
        </p>

        <div
          className="mt-12 flex gap-4 items-center"
          style={{ animation: 'fadeUp 0.8s 0.9s both' }}
        >
          <button
            className="font-mono text-xs uppercase tracking-widest px-8 py-3 transition-all duration-300"
            style={{ background: 'var(--accent)', color: 'var(--bg)', border: 'none' }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 30px rgba(200,242,60,0.25)'
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
            onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}
          >
            Ver trabajo
          </button>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-widest px-8 py-3 transition-all duration-300"
            style={{
              color: 'var(--text-muted)',
              border: '1px solid var(--border-hover)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.target.style.color = 'var(--text-primary)'
              e.target.style.borderColor = 'var(--text-muted)'
            }}
            onMouseLeave={e => {
              e.target.style.color = 'var(--text-muted)'
              e.target.style.borderColor = 'var(--border-hover)'
            }}
          >
            Contacto
          </a>
        </div>
      </div>

      {/* Right — animated visual */}
      <div
        className="relative z-10 flex justify-end items-center"
        style={{ animation: 'fadeIn 1.2s 0.8s both' }}
      >
        <div className="relative w-80 h-80">
          <div className="visual-ring" />
          <div className="visual-ring" />
          <div className="visual-ring" />

          {/* Core */}
          <div
            className="absolute flex items-center justify-center rounded-full"
            style={{
              inset: '100px',
              background: 'var(--accent-glow)',
              border: '1px solid rgba(200,242,60,0.3)',
            }}
          >
            <div className="visual-dot" />
          </div>

          {/* Tags */}
          <div className="visual-tags">
            {['Hard Techno', 'Motion', 'Hardgroove', '3D'].map((tag, i) => {
              const positions = [
                { top: '10px', left: '50%', transform: 'translateX(-50%)' },
                { right: 0, top: '50%', transform: 'translateY(-50%)' },
                { bottom: '10px', left: '50%', transform: 'translateX(-50%)' },
                { left: 0, top: '50%', transform: 'translateY(-50%)' },
              ]
              return (
                <span
                  key={tag}
                  className="absolute font-mono text-[0.6rem] uppercase tracking-widest whitespace-nowrap"
                  style={{ color: 'var(--text-dim)', ...positions[i] }}
                >
                  {tag}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
