import { getBio } from '../lib/markdown';

export default async function Home() {
  const bio = await getBio();
  console.log('Bio data:', bio); // Log the bio data for debugging

  return (
    <main className="main">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1 className="header__name">{bio.name}</h1>
          <p className="header__title">{bio.title}</p>
          <p className="header__location">{bio.location}</p>
        </header>

        {/* About */}
        <section className="section">
          <h2 className="section__title">About</h2>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: bio.html || '' }}
          />
        </section>

        {/* Skills */}
        <section className="section">
          <h2 className="section__title">Skills</h2>
          <div className="skills">
            {bio.skills.map((skill) => (
              <span key={skill} className="skill">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="section">
          <h2 className="section__title">Projects</h2>
          <div className="projects">
            {bio.projects.map((project) => (
              <article key={project.name} className="project">
                <h3 className="project__name">{project.name}</h3>
                <p className="project__description">{project.description}</p>
                <div className="project__tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="project__tech-item">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project__link"
                >
                  View Project →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <footer className="footer">
          <h2 className="footer__title">Contact</h2>
          <div className="footer__links">
            <a href={`mailto:${bio.email}`} className="footer__link">
              Email
            </a>
            <a href={bio.github} target="_blank" rel="noopener noreferrer" className="footer__link">
              GitHub
            </a>
            <a href={bio.linkedin} target="_blank" rel="noopener noreferrer" className="footer__link">
              LinkedIn
            </a>
            <a href={bio.twitter} target="_blank" rel="noopener noreferrer" className="footer__link">
              Twitter
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}