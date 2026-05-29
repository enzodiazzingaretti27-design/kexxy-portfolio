import SectionLabel from '../components/SectionLabel'
import { stats } from '../data/content'

export default function About() {
  return (
    <section id="about" className="px-12 py-24">
      <SectionLabel>Sobre mí</SectionLabel>

      <div className="grid grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div className="reveal">
          <h2
            className="font-display leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '0.01em' }}
          >
            Arte,
            <br />
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(240,237,232,0.3)',
              }}
            >
              Sonido
            </span>
            <br />
            y Código.
          </h2>

          <div className="grid grid-cols-2 gap-4 mt-10">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal reveal-delay-${i % 2 + 1} p-6 transition-colors duration-300`}
                style={{ border: '1px solid var(--border)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div
                  className="font-display text-4xl leading-none"
                  style={{ color: 'var(--accent)' }}
                >
                  {stat.num}
                </div>
                <div
                  className="font-mono text-[0.65rem] uppercase tracking-widest mt-1"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div
          className="reveal reveal-delay-2 text-sm leading-loose space-y-5"
          style={{ color: 'var(--text-muted)' }}
        >
          <p>
            Soy Enzo Diaz Zingaretti, artista multidisciplinario operando bajo el nombre Kexxy.
            Mi trabajo vive en el cruce entre música electrónica, diseño visual y motion.
          </p>
          <p>
            Produzco desde Argentina, con una estética oscura, minimal y experimental.
            No me interesa lo genérico — cada proyecto es una extensión de la identidad.
          </p>
          <p>
            Trabajo con hardgroove, hard techno y todo lo que se salga del molde. Los visuales
            complementan el sonido: 3D, motion graphics, diseño de identidades para artistas y eventos.
          </p>
        </div>
      </div>
    </section>
  )
}
