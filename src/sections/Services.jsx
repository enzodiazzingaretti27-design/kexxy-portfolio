import { useState } from 'react'
import SectionLabel from '../components/SectionLabel'
import { services } from '../data/content'

export default function Services() {
  const [hovered, setHovered] = useState(null)

  return (
    <section className="px-12 py-24">
      <SectionLabel>Lo que hago</SectionLabel>

      <ul className="list-none">
        {services.map((service, i) => (
          <li
            key={service.num}
            className={`reveal reveal-delay-${i % 3} grid items-center gap-8 py-7 transition-colors duration-300`}
            style={{
              gridTemplateColumns: 'auto 1fr auto',
              borderBottom: '1px solid var(--border)',
              cursor: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border-hover)'
              setHovered(i)
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              setHovered(null)
            }}
          >
            <span
              className="font-mono text-[0.65rem] tracking-widest"
              style={{ color: 'var(--text-dim)' }}
            >
              {service.num}
            </span>

            <span
              className="font-display text-4xl tracking-wide transition-colors duration-300"
              style={{ color: hovered === i ? 'var(--accent)' : 'var(--text-primary)' }}
            >
              {service.name}
            </span>

            <div className="flex gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1"
                  style={{
                    color: 'var(--text-dim)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
