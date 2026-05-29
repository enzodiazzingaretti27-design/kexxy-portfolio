import { useEffect, useState } from 'react'

const links = ['Work', 'About', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-6 transition-all duration-400"
      style={{
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <a
        href="#"
        className="font-display text-2xl tracking-widest"
        style={{
          color: 'var(--text-primary)',
          textDecoration: 'none',
          animation: 'fadeUp 0.8s 0.2s both',
        }}
      >
        Kexxy
      </a>

      <ul className="flex gap-10 list-none">
        {links.map((link, i) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="font-mono text-xs uppercase tracking-widest transition-colors duration-300"
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                animation: `fadeUp 0.8s ${0.3 + i * 0.1}s both`,
              }}
              onMouseEnter={e => (e.target.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.target.style.color = 'var(--text-muted)')}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
