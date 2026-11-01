import { useState } from 'react';

import Navbar from '../components/Navbar.jsx';
import Experience from '../components/Experience';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Home() {
    const [formStatus, setFormStatus] = useState({
    loading: false,
    message: '',
    type: ''
});


const handleContactSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const contactData = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        subject: formData.get('subject').trim(),
        message: formData.get('message').trim()
    };

    setFormStatus({
        loading: true,
        message: '',
        type: ''
    });

    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Unable to send your message.');
        }

        setFormStatus({
            loading: false,
            message: result.message || 'Your message has been received.',
            type: 'success'
        });

        form.reset();
    } catch (error) {
        setFormStatus({
            loading: false,
            message: error.message || 'Unable to send your message. Please try again.',
            type: 'error'
        });
    }
};

    return (
        <>
            <Navbar />

            <main>

                    {/* ======================= HERO ====================== */}
                    <section className="hero" id="home">
                        <div className="container hero-content">

                            <div className="hero-text">

                                <p className="hero-label">
                                    AI-POWERED FULL-STACK WEB DEVELOPER
                                </p>

                                <h1>
                                    Hi, I'm Tahirou Moussa Hama.
                                </h1>

                                <h2>
                                    I build digital products that solve real problems.
                                </h2>

                                <p className="hero-description">
                                I build modern web applications,
                                e-commerce platforms and AI-powered
                                digital experiences using technologies
                                such as React, Node.js, Express and MySQL.
                                </p>

                                <div className="hero-buttons">

                                    <a
                                        href="#projects"
                                        className="primary-button"
                                    >
                                        View My Projects
                                    </a>

                                    <a
                                        href="#contact"
                                        className="secondary-button"
                                    >
                                        Let's Work together
                                    </a>
                                </div>

<div className="social-links">
    <a
        href="https://github.com/tahirou-hama"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        aria-label="Visit my GitHub profile"
    >
        <FaGithub size={20} />
        <span>GitHub</span>
    </a>

    <a
        href="https://www.linkedin.com/in/-hama/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        aria-label="Visit my LinkedIn profile"
    >
        <FaLinkedin size={20} />
        <span>LinkedIn</span>
    </a>
</div>


                            </div>

                            <div className="hero-card">

                                <div className="terminal">

                                    <div className="terminal-header">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>

                                    <div className="terminal-body">

                                        <p>
                                            <span className="code-purple">
                                                const
                                            </span> {''}
                                            developer = {'{'}
                                        </p>

                                        <p className="indent">
                                         name:{''}
                                            <span className="code-green">
                                                "Tahirou Moussa Hama"
                                            </span>,
                                        </p>

                                        <p className="indent">
                                            role:{''}
                                            <span className="code-green">
                                                "Full-Stack Developer"
                                            </span>,
                                        </p>

                                        <p className="indent">
                                            focus:{''}
                                            <span className="code-green">
                                                "AI + Web"
                                            </span>,
                                        </p>

                                        <p className="indent">
                                            location:{''}
                                            <span className="code-green">
                                                "Niger"
                                            </span>
                                        </p>

                                        <p>
                                            {'}'};
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </section>

                    {/* ================= ABOUT ================ */}
                    <section className="section" id="about">
                        <div className="container">

                            <div className="section-heading">
                                <p className="section-label">
                                    ABOUT ME
                                </p>

                                <h2>
                                    Building technology with purpose.
                                </h2>
                            </div>

                            <div className="about-content">

                                <div>
                                    <p>
                                        I'm a full-stack web developer
                                        focused on building useful,
                                        scalable and user-friendly
                                        digital products.
                                    </p>

                                    <p>
                                        My journey combines a background
                                        in Biology and sustainable rural transformation
                                        with modern web development and artificial intelligence.
                                    </p>
                                </div>

                                <div className="about-card">
                                    <h3>
                                        My approach
                                    </h3>

                                    <p>
                                    Understand the problem → Design
                                    the solution → Build the product
                                    → Test → Improve.
                                    </p>
                                </div>

                            </div>

                        </div>
                    </section>

                    {/* ================= SKILLS ================= */}
<section className="section section-alt" id="skills">
    <div className="container">

        <div className="section-heading">
            <p className="section-label">
                MY SKILLS
            </p>

            <h2>
                Technologies I use to build modern products.
            </h2>

            <p className="section-intro">
                My technical profile combines full-stack web
                development, databases, software testing and
                generative AI-assisted development.
            </p>
        </div>


        <div className="skills-grid">

            {/* FRONTEND */}
            <div className="skill-card">

                <div className="skill-icon">
                    FE
                </div>

                <h3>
                    Frontend Development
                </h3>

                <p>
                    Building responsive, interactive and
                    user-friendly web interfaces.
                </p>

                <div className="skill-tags">
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>JavaScript</span>
                    <span>React</span>
                    <span>Tailwind CSS</span>
                    <span>Bootstrap</span>
                    <span>Redux</span>
                </div>

            </div>


            {/* BACKEND */}
            <div className="skill-card">

                <div className="skill-icon">
                    BE
                </div>

                <h3>
                    Backend Development
                </h3>

                <p>
                    Developing server-side applications,
                    REST APIs and application logic.
                </p>

                <div className="skill-tags">
                    <span>Node.js</span>
                    <span>Express.js</span>
                    <span>REST API</span>
                    <span>JSON Server</span>
                </div>

            </div>


            {/* DATABASE */}
            <div className="skill-card">

                <div className="skill-icon">
                    DB
                </div>

                <h3>
                    Databases & SQL
                </h3>

                <p>
                    Working with relational and NoSQL databases
                    to store, manage and retrieve application data.
                </p>

                <div className="skill-tags">
                    <span>MySQL</span>
                    <span>MongoDB</span>
                    <span>SQL</span>
                </div>

            </div>


            {/* TESTING */}
            <div className="skill-card">

                <div className="skill-icon">
                    QA
                </div>

                <h3>
                    Software Testing
                </h3>

                <p>
                    Testing frontend applications and APIs,
                    including AI-assisted software testing
                    workflows.
                </p>

                <div className="skill-tags">
                    <span>Jest</span>
                    <span>Cypress</span>
                    <span>TestRigor</span>
                    <span>API Testing</span>
                    <span>ChatGPT</span>
                    <span>Microsoft Copilot</span>
                </div>

            </div>


            {/* AI */}
            <div className="skill-card">

                <div className="skill-icon">
                    AI
                </div>

                <h3>
                    AI & Generative AI
                </h3>

                <p>
                    Using generative AI to assist with design,
                    code generation, migration, optimization
                    and development workflows.
                </p>

                <div className="skill-tags">
                    <span>ChatGPT</span>
                    <span>GitHub Copilot</span>
                    <span>Microsoft Copilot</span>
                    <span>Amazon Q</span>
                    <span>Uizard</span>
                    <span>Figma</span>
                    <span>Snyk</span>
                </div>

            </div>


            {/* CORE CS */}
            <div className="skill-card">

                <div className="skill-icon">
                    CS
                </div>

                <h3>
                    Computer Science
                </h3>

                <p>
                    Developing fundamental problem-solving and
                    software engineering skills.
                </p>

                <div className="skill-tags">
                    <span>Data Structures</span>
                    <span>Algorithms</span>
                    <span>SQL</span>
                    <span>Code Optimization</span>
                    <span>Software Development</span>
                </div>

            </div>

        </div>

    </div>
</section>

{/* ================== EDUCATION ================== */}
<section className="section" id="education">
    <div className="container">

        <div className="section-heading">

            <p className="section-label">
                EDUCATION & TRAINING
            </p>

            <h2>
                My academic and technical journey.
            </h2>

        </div>


        <div className="education-list">

            {/* ================= SIMPLILEARN ================= */}
            <div className="education-item">

                <div className="education-year">
                    2026–2027
                </div>

                <div className="education-content">

                    <p className="education-type">
                        PROFESSIONAL TRAINING
                    </p>

                    <h3>
                        AI-Powered Full-Stack Developer Program
                    </h3>

                    <h4>
                        Simplilearn
                    </h4>

                    <p>
                        One-year intensive training focused on
                        modern full-stack web development,
                        software testing and generative
                        AI-assisted development.
                    </p>

                    <div className="education-tech">
                        HTML · CSS · Tailwind CSS · Bootstrap ·
                        JavaScript · React · Node.js · Express ·
                        MongoDB · MySQL · SQL · Redux
                    </div>

                    <div className="education-tech">
                        Jest · Cypress · TestRigor · JSON Server ·
                        Data Structures & Algorithms
                    </div>

                    <div className="education-tech">
                        Generative AI · ChatGPT · GitHub Copilot ·
                        Microsoft Copilot · Amazon Q · Uizard ·
                        Figma · Snyk
                    </div>

                </div>

            </div>


            {/* ================= MASTER'S ================= */}
            <div className="education-item">

                <div className="education-year">
                    2022–2024
                </div>

                <div className="education-content">

                    <p className="education-type">
                        MASTER'S STUDIES
                    </p>

                    <h3>
                        Master's in Sustainable Rural Transformation
                    </h3>

                    <h4>
                        Université Abdou Moumouni de Niamey
                    </h4>

                    <p>
                        Graduate studies focused on sustainable
                        development, rural transformation,
                        environmental issues, natural resource
                        management and the relationship between
                        communities and their ecosystems.
                    </p>

                    <p className="education-note">
                        Academic program completed, degree not defended.
                    </p>

                </div>

            </div>


            {/* ================= BACHELOR'S ================= */}
            <div className="education-item">

                <div className="education-year">
                    2018–2021
                </div>

                <div className="education-content">

                    <p className="education-type">
                        BACHELOR'S DEGREE
                    </p>

                    <h3>
                        Bachelor's Degree in Biology
                    </h3>

                    <h4>
                        Université Abdou Moumouni de Niamey
                    </h4>

                    <p>
                        Undergraduate studies in biology,
                        providing a scientific foundation in
                        life sciences, research and analytical
                        methods.
                    </p>

                </div>

            </div>

        </div>

    </div>
</section>

{/*=================== PROJECTS ==================== */}
<section className="section" id="projects">
    <div className="container">

        <div className="section-heading">

            <p className="section-label">
                FEATURED PROJECTS
            </p>

            <h2>
                Things I've built.
            </h2>

        </div>

        <div className="projects-grid">

            <article className="project-card">

                <div className="project-number">
                    01
                </div>

                <h3>
                    Marketplace Niger
                </h3>

                <p>
                    A multi-vendor e-commerce
                    platform designed for the
                    Nigerien market.
                </p>

                <div className="project-tech">
                    React . Node.js . Express .
                    MySQL . JWT
                </div>

                <a href="/projects/marketplace-niger">
                    View Project  →
                </a>
            </article>

            <article className="project-card">

                <div className="project-number">
                    02
                </div>

                <h3>
                    Personal Finance Tracker
                </h3>

                <p>
                    A responsive finance dashboard
                    for tracking income, expenses,
                    and transactions.
                </p>

                <div className="project-tech">
                    HTML . CSS . JavaScript
                </div>

                <a href="/projects/personal-finance-tracker">
                    View Project  →
                </a>

            </article>

            <article className="project-card">

                <div className="project-number">
                    03
                </div>

                <h3>
                    AI CV & Job Assistant
                </h3>

                <p>
                    An AI-powered application designed
                    to help users create and improve
                    professional job applications.
                </p>

                <div className="project-tech">
                    react . Node.js . AI . MongoDB
                </div>

                <a href="/projects/ai-cv-job-assistant">
                    View Project  →
                </a>

            </article>

        </div>

    </div>
</section>

<Experience />
{/* ================= CONTACT ================== */}

<section className="section contact-section" id="contact">

    <div className="container">

        <div className="section-heading">

            <p className="section-label">
                GET IN TOUCH
            </p>

            <h2>
                Let's build something useful.
            </h2>

            <p>
                I'm open to junior full-stack opportunities,
                freelance projects, collaborations and
                interesting web development work.
            </p>

        </div>


        <div className="contact-grid">

            {/* ================= CONTACT INFO ================== */}

            <div className="contact-info">

                <div className="contact-item">

                    <span className="contact-label">
                        EMAIL
                    </span>

                    <a
                        href="mailto:learner22eng@gmail.com"
                    >
                        learner22eng@gmail.com
                    </a>

                </div>


                <div className="contact-item">

                    <span className="contact-label">
                        GITHUB
                    </span>

                    <a
                        href="https://github.com/tahirou-hama"
                        target="_blank"
                        rel="noreferrer"
                    >
                        github.com/tahirou-hama
                    </a>

                </div>


                <div className="contact-item">

                    <span className="contact-label">
                        LOCATION
                    </span>

                    <p>
                        Niamey, Niger
                    </p>

                </div>


                <div className="contact-item">

                    <span className="contact-label">
                        AVAILABILITY
                    </span>

                    <p>
                        Open to remote opportunities
                    </p>

                </div>

            </div>



{/* ================= CONTACT FORM ================== */}

<form
    className="contact-form"
    onSubmit={handleContactSubmit}
>
    <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            maxLength={100}
            required
            disabled={formStatus.loading}
        />
    </div>

    <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            maxLength={254}
            required
            disabled={formStatus.loading}
        />
    </div>

    <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
            type="text"
            id="subject"
            name="subject"
            placeholder="What would you like to discuss?"
            maxLength={150}
            required
            disabled={formStatus.loading}
        />
    </div>

    <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
            id="message"
            name="message"
            rows="6"
            placeholder="Tell me about your project or opportunity..."
            maxLength={5000}
            required
            disabled={formStatus.loading}
        />
    </div>

    {formStatus.message && (
        <p
            className={`contact-feedback ${formStatus.type}`}
            role={formStatus.type === 'error' ? 'alert' : 'status'}
            aria-live="polite"
        >
            {formStatus.message}
        </p>
    )}

    <button
        type="submit"
        className="contact-submit"
        disabled={formStatus.loading}
    >
        {formStatus.loading
            ? 'Sending...'
            : 'Send Message →'}
    </button>
</form>
</div>
</div>
</section>

            </main>
        </>
    );
}