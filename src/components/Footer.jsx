const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'SoundCloud', href: 'https://soundcloud.com' },
  { label: 'Behance', href: 'https://behance.net' },
]

export default function Footer() {
  return (
    <footer
      className="px-12 py-8 flex justify-between items-center"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <p
        className="font-mono text-[0.65rem] uppercase tracking-widest"
        style={{ color: 'var(--text-dim)' }}
      >
        © 2025 Kexxy — Enzo Diaz Zingaretti
      </p>

      <ul className="flex gap-8 list-none">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.65rem] uppercase tracking-widest transition-colors duration-300"
              style={{ color: 'var(--text-dim)', textDecoration: 'none' }}
              onMouseEnter={e => (e.target.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.target.style.color = 'var(--text-dim)')}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
