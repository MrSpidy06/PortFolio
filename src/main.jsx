import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import './firebase.js';

const portrait = '/images/abin-oliver.jpeg';
const brandLogo = '/images/abin-oliver-logo.png';
const email = 'abinoliver258@gmail.com';
const socialLinks = {
  github: 'https://github.com/MrSpidy06',
  linkedin: 'https://www.linkedin.com/in/abin-oliver/',
};

const sections = {
  about: { label: 'The Pilot', nav: 'About', eyebrow: 'EPISODE 01 · THE PILOT', number: '01' },
  journey: { label: 'The Journey', nav: 'Journey', eyebrow: 'EPISODE 02 · THE JOURNEY', number: '02' },
  work: { label: 'The Originals', nav: 'Work', eyebrow: 'EPISODE 03 · THE ORIGINALS', number: '03' },
  toolkit: { label: 'My Toolkit', nav: 'Toolkit', eyebrow: 'EPISODE 04 · THE TOOLKIT', number: '04' },
  contact: { label: 'The Finale', nav: 'Contact', eyebrow: 'NEXT EPISODE · YOU?', number: '05' },
};

const viewerProfiles = [
  { id: 'recruiter', name: 'Recruiter', glyph: 'R', blurb: 'Projects and skills first', order: ['work', 'toolkit', 'about', 'journey', 'contact'] },
  { id: 'developer', name: 'Developer', glyph: '</>', blurb: 'A builder’s point of view', order: ['work', 'journey', 'toolkit', 'about', 'contact'] },
  { id: 'curious', name: 'Curious mind', glyph: '✦', blurb: 'The story behind the work', order: ['about', 'journey', 'work', 'toolkit', 'contact'] },
];

const projects = [
  {
    id: 'crimelens',
    name: 'CrimeLens AI',
    type: 'AI-ASSISTED DIGITAL FORENSICS',
    description: 'A platform designed to support evidence analysis, case management, and the discovery of connections between related cases.',
    details: ['Evidence analysis', 'Case management', 'Related-case connections'],
    href: 'https://portfolio-b1159-45a7f.web.app',
    action: 'Explore CrimeLens AI',
    mark: 'CL',
  },
  {
    id: 'eduvista',
    name: 'EduVista',
    type: 'A LEARNING EXPERIENCE',
    description: 'An education-focused project exploring how thoughtful digital experiences can support the way people learn.',
    details: ['Education', 'Digital experiences', 'Learning'],
    href: 'https://portfolio-b1159-4507f.web.app',
    action: 'Explore EduVista',
    mark: 'EV',
  },
  {
    id: 'wednesdayclub',
    name: 'Wednesday Club Expeditions',
    type: 'GROUP TRAVEL & TOUR PLANNING',
    description: 'A travel experience site for student groups, corporate teams, and families, featuring destinations, group trips, and custom package enquiries.',
    details: ['Group travel', 'Educational & industrial visits', 'Custom packages'],
    href: 'https://wednesdayclubexpeditions.vercel.app/',
    action: 'Explore Wednesday Club',
    mark: 'WC',
  },
  {
    id: 'medassist',
    name: 'MedAssist AI',
    type: 'HEALTHCARE COMPANION PROTOTYPE',
    description: 'A healthcare companion prototype bringing health records and everyday readings together with a clinician review workspace.',
    details: ['Health records', 'Everyday readings', 'Clinician review'],
    href: 'https://medassist-1bb76.web.app/',
    action: 'Explore MedAssist AI',
    mark: 'MA',
  },
];

const skillGroups = [
  { name: 'Technical Skills', caption: 'Languages, frameworks & foundations', skills: ['Python', 'Java', 'HTML & CSS', 'JavaScript', 'React.js', 'FastAPI', 'SQL & MySQL', 'Data Structures & Algorithms'] },
  { name: 'Tools & Technologies', caption: 'Tools and platforms I build with', skills: ['Git & GitHub', 'Visual Studio Code', 'Figma', 'Flutter & Dart', 'Android Studio', 'Kotlin', 'Firebase', 'React Native', 'REST API Integration', 'Databases'] },
  { name: 'Core Skills', caption: 'How I approach challenges and teamwork', skills: ['Problem-Solving', 'Critical Thinking', 'Team Collaboration', 'Analytical Thinking'] },
  { name: 'Areas of Interest', caption: 'Fields I’m curious to explore further', skills: ['Web Development', 'Mobile App Development', 'Android App Development', 'Artificial Intelligence', 'UI/UX Design'] },
];

function Arrow({ className = '' }) {
  return <span className={`arrow ${className}`} aria-hidden="true">↗</span>;
}

function SectionLink({ id, children, className = '', onClick }) {
  return <a href={`#${id}`} className={className} onClick={onClick}>{children}</a>;
}

function Header({ order, active, profile, onOpenProfiles, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled || menuOpen ? 'site-header-solid' : ''}`}>
      <div className="header-inner">
        <a className="wordmark" href="#home" aria-label="Abin Oliver, home" onClick={closeMenu}>
          <span className="wordmark-icon"><img src={brandLogo} alt="" /></span><span className="wordmark-copy">ABIN OLIVER<span> ORIGINALS</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <SectionLink id="home" className={active === 'home' ? 'nav-active' : ''}>Home</SectionLink>
          {order.map((id) => (
            <SectionLink key={id} id={id} className={active === id ? 'nav-active' : ''}>{sections[id].nav}</SectionLink>
          ))}
        </nav>
        <div className="header-actions">
          <button className="profile-switch" type="button" onClick={onOpenProfiles} aria-label={`Viewing as ${profile.name}. Change profile`}>
            <span className="profile-avatar-small">{profile.glyph}</span>
            <span className="profile-current">{profile.name}</span>
            <span className="profile-chevron" aria-hidden="true">⌄</span>
          </button>
          <button className={`menu-toggle ${menuOpen ? 'menu-toggle-open' : ''}`} type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span /><span />
          </button>
        </div>
      </div>
      <div className={`mobile-nav ${menuOpen ? 'mobile-nav-open' : ''}`} aria-hidden={!menuOpen}>
        <SectionLink id="home" onClick={closeMenu}>Home</SectionLink>
        {order.map((id) => <SectionLink key={id} id={id} onClick={closeMenu}>{sections[id].nav}</SectionLink>)}
        <a href={`mailto:${email}`} onClick={closeMenu}>Let’s build <Arrow /></a>
      </div>
    </header>
  );
}

function Hero({ onOpenProfiles }) {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-photo" aria-hidden="true">
        <img src={portrait} alt="" fetchPriority="high" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-copy wrap">
        <p className="hero-kicker"><span className="status-dot" /> A PERSONAL BUILD SERIES <span className="kicker-year">· WEB / MOBILE / AI</span></p>
        <h1 id="hero-title"><span>ABIN</span><span className="hero-outline">OLIVER</span></h1>
        <p className="hero-role">FULL-STACK DEVELOPER IN THE MAKING <span>·</span> AI ENTHUSIAST</p>
        <p className="hero-intro">A B.Tech CSE student turning ideas into useful digital experiences across frontend, backend, mobile, and AI.</p>
        <div className="hero-actions">
          <SectionLink id="work" className="button button-primary"><span aria-hidden="true">▶</span> Explore my work</SectionLink>
          <SectionLink id="about" className="button button-quiet">Meet the developer <Arrow /></SectionLink>
          <button className="button button-profile" type="button" onClick={onOpenProfiles}>Choose your view <span aria-hidden="true">＋</span></button>
        </div>
        <div className="hero-meta" aria-label="Profile highlights">
          <span><b>01</b> CSE STUDENT</span>
          <span><b>02</b> PROBLEM SOLVER</span>
          <span><b>03</b> AI ENTHUSIAST</span>
        </div>
      </div>

      <div className="hero-feature" aria-label="Featured original project">
        <span className="hero-feature-mark">CL</span>
        <span><small>FEATURED ORIGINAL</small><strong>CrimeLens AI</strong></span>
        <span className="feature-arrow" aria-hidden="true">↗</span>
      </div>

      <a className="scroll-cue" href="#explore"><span /> SCROLL TO EXPLORE</a>
      <span className="hero-side-label" aria-hidden="true">THINK CREATIVELY · BUILD BEYOND LIMITS</span>
    </section>
  );
}

const exploreCards = [
  { id: 'about', episode: 'EPISODE 01', title: 'The Pilot', note: 'A little about me', tone: 'pilot' },
  { id: 'journey', episode: 'EPISODE 02', title: 'The Journey', note: 'How I like to build', icon: '↗', tone: 'journey' },
  { id: 'work', episode: 'EPISODE 03', title: 'The Originals', note: 'Projects with purpose', icon: '03', tone: 'originals' },
  { id: 'toolkit', episode: 'EPISODE 04', title: 'The Toolkit', note: 'What I’m exploring', icon: '{ }', tone: 'toolkit' },
];

function ContinueExploring({ order }) {
  const orderedCards = order.filter((id) => id !== 'contact').map((id) => exploreCards.find((card) => card.id === id)).filter(Boolean);
  const [activeCard, setActiveCard] = useState(0);

  const scrollRail = (direction) => {
    const rail = document.querySelector('.explore-rail');
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.min(rail.clientWidth * 0.72, 480), behavior: 'smooth' });
    setActiveCard((index) => Math.max(0, Math.min(orderedCards.length - 1, index + direction)));
  };

  return (
    <section className="continue-section" id="explore" aria-labelledby="explore-title">
      <div className="section-wrap">
        <div className="rail-heading" data-reveal>
          <div><p className="section-kicker">PICK UP WHERE YOU LIKE</p><h2 id="explore-title">Continue exploring<span className="red-period">.</span></h2></div>
          <div className="rail-controls">
            <button type="button" onClick={() => scrollRail(-1)} aria-label="Scroll to previous card">←</button>
            <button type="button" onClick={() => scrollRail(1)} aria-label="Scroll to next card">→</button>
          </div>
        </div>
        <div className="explore-rail">
          {orderedCards.map((card, index) => (
            <SectionLink key={card.id} id={card.id} className={`explore-card explore-${card.tone}`}>
              <span className="explore-card-index">{card.episode}</span>
              <span className="explore-card-art" aria-hidden="true">{card.id === 'about' ? <img src={brandLogo} alt="" /> : card.icon}</span>
              <span className="explore-card-play" aria-hidden="true">▶</span>
              <span className="explore-card-copy"><strong>{card.title}</strong><small>{card.note}</small></span>
              <span className="explore-progress" aria-hidden="true"><i style={{ width: `${activeCard === index ? 48 : 22}%` }} /></span>
            </SectionLink>
          ))}
        </div>
        <p className="rail-caption"><span className="red-period">●</span> A few chapters from the story so far</p>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description, number, id }) {
  return (
    <div className="section-heading" data-reveal>
      <div className="section-heading-label"><span>{number}</span><span className="section-rule" /><p>{eyebrow}</p></div>
      <div className="section-heading-main">
        <h2 id={id}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="story-section section-wrap" id="about" aria-labelledby="about-title">
      <SectionHeading
        eyebrow={sections.about.eyebrow}
        number={sections.about.number}
        id="about-title"
        title={<>Curious by nature.<br /><span className="serif-accent">Builder by practice.</span></>}
        description="A quick introduction to the person behind the projects."
      />
      <div className="about-grid">
        <div className="about-stamp" data-reveal>
          <span className="stamp-top">ABIN OLIVER</span>
          <img className="stamp-logo" src={brandLogo} alt="Abin Oliver monogram logo" />
          <span className="stamp-bottom">THINK · BUILD · LEARN</span>
        </div>
        <div className="about-copy" data-reveal>
          <p className="about-lead">Hey, I’m Abin Oliver — a B.Tech Computer Science and Engineering student and aspiring full-stack developer.</p>
          <p>I enjoy building applications, solving real-world problems, and exploring how frontend, backend, and AI can come together to make useful experiences.</p>
          <p>I believe great development goes beyond writing code. It starts with curiosity, asks better questions, and turns ideas into something people can use.</p>
          <div className="about-signoff"><span className="signoff-line" /><span>Think creatively. Code passionately.</span></div>
        </div>
      </div>
    </section>
  );
}

const chapters = [
  { index: '01', title: 'Find the problem', text: 'Start with a real need, then look for the part technology can make clearer or easier.', mark: '01' },
  { index: '02', title: 'Connect the pieces', text: 'Explore how interfaces, application logic, and data fit together across the stack.', mark: '02' },
  { index: '03', title: 'Keep learning', text: 'Try new tools, including AI, and keep refining the solution as the idea takes shape.', mark: '03' },
];

function Journey() {
  return (
    <section className="journey-section section-wrap" id="journey" aria-labelledby="journey-title">
      <SectionHeading
        eyebrow={sections.journey.eyebrow}
        number={sections.journey.number}
        id="journey-title"
        title={<>Every good idea<br /><span className="serif-accent">has a first episode.</span></>}
        description="The approach I bring to learning, problem-solving, and building."
      />
      <div className="chapter-list">
        {chapters.map((chapter) => (
          <article className="chapter" key={chapter.index} data-reveal>
            <span className="chapter-index">CHAPTER {chapter.index}</span>
            <span className="chapter-mark" aria-hidden="true">{chapter.mark}</span>
            <div className="chapter-copy"><h3>{chapter.title}</h3><p>{chapter.text}</p></div>
            <span className="chapter-arrow" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectArt({ project }) {
  if (project.id === 'crimelens') {
    return (
      <div className="project-art crimelens-art" aria-hidden="true">
        <div className="case-orbit orbit-one" /><div className="case-orbit orbit-two" />
        <span className="case-node node-one" /><span className="case-node node-two" /><span className="case-node node-three" />
        <span className="project-monogram">{project.mark}</span>
        <span className="project-art-caption">EVIDENCE / CONNECTION / INSIGHT</span>
        <span className="project-art-index">ORIGINAL Nº 01</span>
      </div>
    );
  }
  if (project.id === 'wednesdayclub') {
    return (
      <div className="project-art wednesday-art" aria-hidden="true">
        <img src="/images/projects/wednesday-club-cover.png" alt="" loading="lazy" />
      </div>
    );
  }
  if (project.id === 'eduvista') {
    return (
      <div className="project-art eduvista-photo" aria-hidden="true">
        <img src="/images/projects/eduvista-cover.jpg" alt="" loading="lazy" />
      </div>
    );
  }
  if (project.id === 'medassist') {
    return (
      <div className="project-art medassist-art" aria-hidden="true">
        <span className="medassist-glow" />
        <div className="medassist-dashboard">
          <div className="medassist-dashboard-top"><span>MY HEALTH OVERVIEW</span><span className="medassist-live-dot" /></div>
          <div className="medassist-dashboard-title"><span className="medassist-cross">+</span><span><strong>Care, connected.</strong><small>Your health at a glance</small></span></div>
          <div className="medassist-metric-row"><span><small>HEART RATE</small><strong>72 <i>BPM</i></strong></span><span><small>STATUS</small><strong className="medassist-good">Looking good</strong></span></div>
          <svg className="medassist-pulse" viewBox="0 0 520 110" focusable="false"><path d="M0 62h92l26-1 24-38 32 72 39-91 38 63 26-5 20 0 21-1 22 0 20 0 22 0 23 0 20 0 22 0 22 0 23 0" /></svg>
          <div className="medassist-dashboard-bottom"><span>RECENT READINGS</span><span>REVIEW WITH CARE ↗</span></div>
        </div>
        <span className="project-art-caption">YOUR HEALTH / IN ONE PLACE</span>
        <span className="project-art-index">ORIGINAL Nº 04</span>
      </div>
    );
  }
  return (
    <div className="project-art eduvista-art" aria-hidden="true">
      <span className="edu-sun" /><span className="edu-page edu-page-left" /><span className="edu-page edu-page-right" />
      <span className="project-monogram">{project.mark}</span>
      <span className="project-art-caption">CURIOSITY OPENS NEW DOORS</span>
      <span className="project-art-index">ORIGINAL Nº 02</span>
    </div>
  );
}

function Work() {
  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="section-wrap">
        <SectionHeading
          eyebrow={sections.work.eyebrow}
          number={sections.work.number}
          id="work-title"
          title={<>Made to solve.<br /><span className="serif-accent">Built to matter.</span></>}
          description="Four builds for different needs: forensic analysis, learning, group travel, and connected healthcare."
        />
      </div>
      <div className="originals-list">
        {projects.map((project, index) => (
          <article className={`original-card original-${project.id}`} key={project.id} data-reveal>
            <a className="original-art-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.action} (opens in a new tab)`}>
              <ProjectArt project={project} />
            </a>
            <div className="original-copy">
              <div className="original-label"><span className="original-brand"><img src={brandLogo} alt="" /> ORIGINAL</span><span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span></div>
              <p className="original-type">{project.type}</p>
              <h3>{project.name}</h3>
              <p className="original-description">{project.description}</p>
              <ul className="project-tags">{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              <a className="original-link" href={project.href} target="_blank" rel="noreferrer">{project.action}<Arrow /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="toolkit-section section-wrap" id="toolkit" aria-labelledby="toolkit-title">
      <SectionHeading
        eyebrow={sections.toolkit.eyebrow}
        number={sections.toolkit.number}
        id="toolkit-title"
        title={<>Skills for the<br /><span className="serif-accent">next idea.</span></>}
        description="A growing mix of technical foundations, tools, and the ways I like to solve problems."
      />
      <div className="toolkit-grid">
        {skillGroups.map((group, index) => (
          <article className="toolkit-card" key={group.name} data-reveal>
            <div className="toolkit-card-top"><span>CATEGORY {String(index + 1).padStart(2, '0')}</span><span className="toolkit-card-icon" aria-hidden="true">{['⌘', '▣', '✳', '↗'][index]}</span></div>
            <h3>{group.name}</h3>
            <p>{group.caption}</p>
            <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </article>
        ))}
      </div>
      <p className="toolkit-note"><span className="status-dot" /> Always learning. Always building.</p>
    </section>
  );
}

function Contact() {
  const contactMethods = [
    { label: 'WhatsApp', detail: '+91 73561 84379', href: 'https://wa.me/917356184379', icon: 'W' },
    { label: 'Email', detail: email, href: `mailto:${email}`, icon: '@' },
    { label: 'GitHub', detail: 'github.com/MrSpidy06', href: socialLinks.github, icon: 'GH', external: true },
    { label: 'LinkedIn', detail: 'in/abin-oliver', href: socialLinks.linkedin, icon: 'in', external: true },
  ];

  return (
    <section className="finale-section section-wrap" id="contact" aria-labelledby="contact-title">
      <div className="finale-backdrop" aria-hidden="true" />
      <div className="finale-content" data-reveal>
        <p className="section-kicker">{sections.contact.eyebrow}</p>
        <h2 id="contact-title">Let’s build<br /><span className="serif-accent">what comes next.</span></h2>
        <p className="finale-description">Have an idea, a project, or a problem worth solving? I’d love to hear about it.</p>
        <a className="button button-primary finale-button" href={`mailto:${email}?subject=Let%E2%80%99s%20build%20something`}>Start a conversation <Arrow /></a>
      </div>
      <aside className="contact-panel" aria-label="Contact Abin Oliver" data-reveal>
        <div className="contact-panel-heading"><span>OPEN CHANNELS</span><h3>Find me<br />around the web.</h3></div>
        <div className="contact-methods">
          {contactMethods.map((method) => (
            <a className="contact-method" key={method.label} href={method.href} target={method.external ? '_blank' : undefined} rel={method.external ? 'noreferrer' : undefined}>
              <span className="contact-method-icon" aria-hidden="true">{method.icon}</span>
              <span className="contact-method-copy"><strong>{method.label}</strong><small>{method.detail}</small></span>
              <Arrow className="contact-method-arrow" />
            </a>
          ))}
        </div>
      </aside>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top section-wrap">
        <a className="footer-wordmark" href="#home" aria-label="Abin Oliver, back to top"><img src={brandLogo} alt="" /></a>
        <p>Think creatively. Code passionately.</p>
        <a href="#home" className="back-top">Back to top ↑</a>
      </div>
      <div className="footer-socials section-wrap">
        <a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
        <a href={`mailto:${email}`}>Email <Arrow /></a>
      </div>
      <p className="footer-name" aria-label="Abin Oliver">ABIN OLIVER</p>
      <div className="footer-bottom section-wrap"><span>© {new Date().getFullYear()} Abin Oliver</span><span>INDEPENDENTLY BUILT · WITH CURIOSITY</span></div>
    </footer>
  );
}

function ProfileDialog({ onClose, onSelect, selected }) {
  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <div className="profile-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="profile-dialog" role="dialog" aria-modal="true" aria-labelledby="profile-title">
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close profile selector">×</button>
        <p className="section-kicker">ABIN OLIVER ORIGINALS</p>
        <h2 id="profile-title">Who’s watching?</h2>
        <p className="profile-dialog-note">Choose what you’d like to see first. The story stays the same.</p>
        <div className="profile-options">
          {viewerProfiles.map((profile) => (
            <button key={profile.id} type="button" className={`profile-option ${selected === profile.id ? 'profile-option-selected' : ''}`} onClick={() => onSelect(profile.id)}>
              <span className={`profile-avatar profile-${profile.id}`}>{profile.glyph}</span>
              <strong>{profile.name}</strong>
              <small>{profile.blurb}</small>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function Portfolio() {
  const [profileId, setProfileId] = useState(() => {
    try {
      const stored = sessionStorage.getItem('abin-portfolio-profile');
      return viewerProfiles.some((profile) => profile.id === stored) ? stored : 'developer';
    } catch { return 'developer'; }
  });
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const profile = viewerProfiles.find((option) => option.id === profileId) ?? viewerProfiles[1];
  const order = profile.order;

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [profileId]);

  useEffect(() => {
    const ids = ['home', 'explore', ...order];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-42% 0px -50% 0px' });
    ids.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, [order]);

  const selectProfile = (id) => {
    setProfileId(id);
    setProfileOpen(false);
    try { sessionStorage.setItem('abin-portfolio-profile', id); } catch { /* session storage is optional */ }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageSections = {
    about: <About key="about" />,
    journey: <Journey key="journey" />,
    work: <Work key="work" />,
    toolkit: <Toolkit key="toolkit" />,
    contact: <Contact key="contact" />,
  };

  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <Header order={order} active={active} profile={profile} onOpenProfiles={() => setProfileOpen(true)} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero onOpenProfiles={() => setProfileOpen(true)} />
        <ContinueExploring order={order} />
        {order.map((id) => pageSections[id])}
      </main>
      <Footer />
      {profileOpen && <ProfileDialog onClose={() => setProfileOpen(false)} onSelect={selectProfile} selected={profileId} />}
    </>
  );
}

createRoot(document.getElementById('root')).render(<Portfolio />);
