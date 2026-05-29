import SectionLabel from '../components/SectionLabel'

export default function Contact() {
  return (
    <section id="contact" className="px-12 py-24">
      <div className="max-w-2xl">
        <SectionLabel>Contacto</SectionLabel>

        <h2
          className="reveal font-display leading-none mb-8"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '0.01em' }}
        >
          Hablemos
          <br />
          de tu{' '}
          <span style={{ color: 'var(--accent)' }}>proyecto</span>
        </h2>

        <p
          className="reveal reveal-delay-1 text-sm leading-loose mb-12 max-w-md"
          style={{ color: 'var(--text-muted)' }}
        >
          Disponible para proyectos de diseño, identidad visual, motion y consultoría creativa.
          También para bookings y colaboraciones.
        </p>

        <a
          href="mailto:hola@kexxy.com"
          className="reveal reveal-delay-2 font-mono text-lg inline-flex items-center gap-3 pb-2 transition-all duration-300"
          style={{
            color: 'var(--text-primary)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--border-hover)',
          }}
          onMouseEnter={e => {
            e.target.style.color = 'var(--accent)'
            e.target.style.borderColor = 'var(--accent)'
          }}
          onMouseLeave={e => {
            e.target.style.color = 'var(--text-primary)'
            e.target.style.borderColor = 'var(--border-hover)'
          }}
        >
          hola@kexxy.com →
        </a>
      </div>
    </section>
  )
}
