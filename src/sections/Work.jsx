import SectionLabel from '../components/SectionLabel'
import WorkCard from '../components/WorkCard'
import { projects } from '../data/content'

export default function Work() {
  return (
    <section id="work" className="py-24">
      <div className="px-12 mb-12">
        <SectionLabel>Proyectos seleccionados</SectionLabel>
      </div>

      <div
        className="grid grid-cols-12 gap-px"
        style={{ background: 'var(--border)' }}
      >
        {projects.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
