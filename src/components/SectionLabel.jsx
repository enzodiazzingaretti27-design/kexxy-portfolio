export default function SectionLabel({ children, className = '' }) {
  return (
    <div
      className={`reveal font-mono text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-12 ${className}`}
      style={{ color: 'var(--accent)' }}
    >
      {children}
      <span className="h-px w-16" style={{ background: 'var(--border-hover)' }} />
    </div>
  )
}
