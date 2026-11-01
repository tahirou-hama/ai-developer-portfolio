import { Link, useParams } from "react-router-dom";
import projects from "../data/projects.js";

export default function ProjectDetails() {
  const { slug } = useParams();

  const project = projects.find((project) => project.slug === slug);

  // If the project does not exist
  if (!project) {
    return (
      <main className="project-details-page">
        <div className="container project-not-found">
          <p className="section-label">PROJECT NOT FOUND</p>

          <h1>This project doesn't exist.</h1>

          <p>The project you are looking for could not be found.</p>

          <Link to="/projects" className="project-back-link">
            ← Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="project-details-page">
      {/* ==================== HERO =================== */}

      <section className="project-details-hero">
        <div className="container">
          <Link to="/projects" className="project-back-link">
            ← Back to Projects
          </Link>

          <p className="project-category">{project.category}</p>

          <h1>{project.title}</h1>

          <p className="project-details-description">{project.description}</p>

          <div className="project-meta">
          <div>
              <span>ROLE</span>
              <strong>{project.role}</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong>{project.status}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PROJECT CONTENT =========================== */}

      <section className="section">
        <div className="container">
          <div className="project-details-grid">
            {/* MAIN CONTENT */}

            <div className="project-main-content">
              <section className="case-study-section">
                <p className="section-label">OVERVIEW</p>

                <h2>About the project</h2>

                <p>{project.description}</p>
              </section>

              {/* ================= PROBLEM ================= */}

              {project.problem && (
                <section className="case-study-section">
                  <p className="section-label">THE PROBLEM</p>

                  <h2>What problem does it solve?</h2>

                  <p>{project.problem}</p>
                </section>
              )}

              {/* ================= SOLUTION ================= */}

              {project.solution && (
                <section className="case-study-section">
                  <p className="section-label">THE SOLUTION</p>

                  <h2>How I approached the solution</h2>

                  <p>{project.solution}</p>
                </section>
              )}

              <section className="case-study-section">
                <p className="section-label">FEATURES</p>

                <h2>Key features</h2>

                <div className="feature-list">
                  {project.features.map((feature) => (
                    <div className="feature-item" key={feature}>
                      <span className="feature-number">✓</span>

                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ================= DEVELOPMENT PROGRESS ================= */}

              {project.progress && (
                <section className="case-study-section">

                  <p className="section-label">
                    DEVELOPMENT PROGRESS
                  </p>

                  <h2>
                    Current development status
                  </h2>

                  <div className="progress-list">

                    {project.progress.map(
                          (item) => (
                            <div
                              className={`progress-item ${
                                  item.completed
                                    ? 'completed'
                                    :'in-progress'
                                    }`}
                                    key={item.title}
                            >
                              <span className="progress-icon">
                                {item.completed ? '✓' : 'o'}
                              </span>

                              <div className="progress-content">

                                <h3>
                                  {item.title}
                                </h3>

                                <p>
                                  {item.description}
                                </p>

                              </div>

                            </div>
                          )
                    )}

                  </div>
                </section>
              )}

              {/* ================= TECHNICAL ARCHITECTURE ================= */}

              {project.architecture && (
                <section className="case-study-section">
                  <p className="section-label">TECHNICAL ARCHITECTURE</p>

                  <h2>How the application is structured</h2>

                  <div className="architecture-list">
                    {project.architecture.map((item, index) => (
                      <div className="architecture-item" key={item}>
                        <span className="architecture-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ================= SECURITY ================= */}

              {project.security && (
                <section className="case-study-section">
                  <p className="section-label">SECURITY</p>

                  <h2>Authentication & security</h2>

                  <div className="feature-list">
                    {project.security.map((item) => (
                      <div className="feature-item" key={item}>
                        <span className="feature-number">✓</span>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ================= CHALLENGES ================= */}

              {project.challenges && (
                <section className="case-study-section">
                  <p className="section-label">CHALLENGES</p>

                  <h2>Challenges I am addressing</h2>

                  <div className="feature-list">
                    {project.challenges.map((challenge) => (
                      <div className="feature-item" key={challenge}>
                        <span className="feature-number">→</span>

                        <span>{challenge}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ================= LEARNING ================= */}

              {project.learning && (
                <section className="case-study-section">
                  <p className="section-label">LEARNING</p>

                  <h2>What I am learning from this project</h2>

                  <div className="feature-list">
                    {project.learning.map((item) => (
                      <div className="feature-item" key={item}>
                        <span className="feature-number">✓</span>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* SIDEBAR */}

            <aside className="project-sidebar">
              <div className="sidebar-card">
                <p className="section-label">Technologies</p>

                <div className="project-details-tech">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>

              <div className="side-card">
                <p className="section-label">PROJECT STATUS</p>

                <h3>{project.status}</h3>
              </div>

              <div className="sidebar-card">
                <p className="section-label">ROLE</p>

                <h3>{project.role}</h3>
              </div>

              <div className="sidebar-card project-actions">
                {project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-action-button"
                  >
                    GitHub →
                  </a>
                )}

                {project.demo !== "#" && (
                  <a
                    href={project.demo}
                    targrt="_blank"
                    rel="noreferrer"
                    className="project-action-button secondary"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =================== BOTTOM CTA ==================== */}

      <section className="project-details-cta">
        <div className="container">
          <p className="section-label">More Projects</p>

          <h2>Explore more of my work.</h2>

          <Link to="/projects" className="nav-button">
            View All Projects →
          </Link>
        </div>
      </section>
    </main>
  );
}
