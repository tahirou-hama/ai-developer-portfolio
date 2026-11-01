import { Link } from 'react-router-dom';
import projects from '../data/projects.js';

export default function ProjectsPage() {
    return (
        <main className="projects-page">

            <section className="projects-hero">
                <div className="container">

                    <p className="section-label">
                        My work
                    </p>

                    <h1>
                        Projects I've built.
                    </h1>

                    <p>
                        A selection of my work across full-stack
                        development, e-commerce, AI and web
                        applications.
                    </p>

                </div>
            </section>

            <section className="section">

                <div className="container">

                    <div className="projects-page-grid">

                        {projects.map((project) => (
                            <article
                                className="project-card"
                                key={project.id}
                            >

                                <div className="project-number">
                                        {String(project.id).padStart(2, '0')}
                                </div>

                                <p className="project-category">
                                        {project.category}
                                </p>

                                <h2>
                                    {project.title}
                                </h2>

                                <p>
                                    {project.description}
                                </p>

                                <div className="project-tech">

                                    {project.technologies.map(
                                        (technology) => (
                                            <span
                                                key={technology}
                                            >
                                                {technology}
                                            </span>
                                        )
                                    )}
                                </div>

                                <Link
                                    to={`/projects/${project.slug}`}
                                    className="project-link"
                                >
                                    View Case Study →
                                </Link>

                            </article>

                        ))}

                    </div>

                </div>

            </section>

        </main>
    );
}