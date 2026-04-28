import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useCallback } from "react";
import { portfolioData } from "../data/portfolioData";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Badge color map ─── */
const badgeColors: Record<string, { bg: string; text: string; glow: string }> = {
  LIVE: {
    bg: "rgba(52, 211, 153, 0.15)",
    text: "#34d399",
    glow: "0 0 12px rgba(52,211,153,0.3)",
  },
  "OPEN SOURCE": {
    bg: "rgba(96, 165, 250, 0.15)",
    text: "#60a5fa",
    glow: "0 0 12px rgba(96,165,250,0.3)",
  },
  "CLIENT PROJECT": {
    bg: "rgba(251, 191, 36, 0.15)",
    text: "#fbbf24",
    glow: "0 0 12px rgba(251,191,36,0.3)",
  },
};

/* ═══════════════════════════════════════════════
   PROJECT CARD COMPONENT
   ═══════════════════════════════════════════════ */
interface ProjectCardProps {
  project: (typeof portfolioData.projects)[number];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const badge = badgeColors[project.badge] ?? badgeColors["LIVE"];

  /* Mouse glow follow effect */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--glow-x", `${x}px`);
      card.style.setProperty("--glow-y", `${y}px`);
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.08,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="work-card"
      data-index={index}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "50%",
        } as React.CSSProperties
      }
    >
      {/* ── Mouse-follow glow ── */}
      <div className="work-card__glow" />

      {/* ── Badge ── */}
      <span
        className="work-card__badge"
        style={{
          background: badge.bg,
          color: badge.text,
          boxShadow: badge.glow,
        }}
      >
        <span className="work-card__badge-dot" style={{ background: badge.text }} />
        {project.badge}
      </span>

      {/* ── Image area ── */}
      <div className="work-card__image-wrap">
        <img
          ref={imageRef}
          src={project.image}
          alt={project.imageAlt}
          className="work-card__image"
          loading="lazy"
        />
      </div>

      {/* ── Default info (visible when not hovered) ── */}
      <div className={`work-card__info ${isHovered ? "work-card__info--hidden" : ""}`}>
        <div className="work-card__meta">
          <span className="work-card__number">{project.number}</span>
          <span className="work-card__year">{project.year}</span>
        </div>
        <h3 className="work-card__name">{project.name}</h3>
        <p className="work-card__category">{project.category}</p>
      </div>

      {/* ── Hover overlay ── */}
      <div className={`work-card__overlay ${isHovered ? "work-card__overlay--active" : ""}`}>
        <div className="work-card__overlay-content">
          {/* Header */}
          <div className="work-card__overlay-header">
            <h3 className="work-card__overlay-name">{project.name}</h3>
            <span className="work-card__overlay-role">{project.role}</span>
          </div>

          {/* Overview */}
          <div className="work-card__overlay-section">
            <h4 className="work-card__overlay-label">Overview</h4>
            <p className="work-card__overlay-summary">{project.summary}</p>
          </div>

          {/* Highlights */}
          <div className="work-card__overlay-section">
            <h4 className="work-card__overlay-label">Key Features</h4>
            <ul className="work-card__overlay-highlights">
              {project.highlights.map((h, i) => (
                <li key={i}>
                  <span className="work-card__highlight-bullet">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Chips */}
          <div className="work-card__overlay-section">
            <h4 className="work-card__overlay-label">Tech Stack</h4>
            <div className="work-card__stack-chips">
              {project.stack.map((tech) => (
                <span key={tech} className="work-card__chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="work-card__overlay-actions">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="work-card__btn work-card__btn--secondary"
              >
                <FiGithub />
                <span>Source Code</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="work-card__btn work-card__btn--primary"
              >
                <FiExternalLink />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Corner arrow ── */}
      <div className={`work-card__arrow ${isHovered ? "work-card__arrow--active" : ""}`}>
        <FiArrowUpRight />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN WORK SECTION
   ═══════════════════════════════════════════════ */
const Work = () => {
  const [isPinnedLayout, setIsPinnedLayout] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    /* ── Desktop: horizontal scroll ── */
    mm.add("(min-width: 1026px)", () => {
      const container = containerRef.current;
      const workFlex = flexRef.current;

      if (!container || !workFlex) return;

      gsap.set(workFlex, { x: 0 });

      const boxes = Array.from(
        workFlex.querySelectorAll(".work-card")
      ) as HTMLElement[];

      if (boxes.length === 0) {
        setIsPinnedLayout(false);
        return;
      }

      const firstBox = boxes[0];
      const lastBox = boxes[boxes.length - 1];
      const contentWidth =
        lastBox.offsetLeft + lastBox.offsetWidth - firstBox.offsetLeft;
      const translateX = Math.max(0, contentWidth - container.clientWidth + 80);

      if (translateX === 0) {
        setIsPinnedLayout(false);
        return;
      }

      setIsPinnedLayout(true);

      /* Card reveal stagger */
      boxes.forEach((box, i) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${translateX}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work",
        },
      });

      timeline.to(workFlex, {
        x: -translateX,
        ease: "none",
      });

      return () => {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
        gsap.set(workFlex, { clearProps: "transform" });
      };
    });

    /* ── Mobile: vertical fade-up ── */
    mm.add("(max-width: 1025px)", () => {
      setIsPinnedLayout(false);

      const cards = document.querySelectorAll(".work-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`work-section ${!isPinnedLayout ? "work-section-static" : ""}`}
      id="work"
    >
      {/* ── Gradient glow blobs ── */}
      <div className="work-section__blob work-section__blob--1" />
      <div className="work-section__blob work-section__blob--2" />

      <div ref={containerRef} className="work-container section-container">
        {/* ── Section header ── */}
        <div className="work-section__header">
          <span className="work-section__kicker">Portfolio</span>
          <h2 className="work-section__title">
            Selected <span>Projects</span>
          </h2>
          <p className="work-section__subtitle">
            A curated selection of production-ready applications built with modern
            technologies and best practices.
          </p>
        </div>

        {/* ── Cards track ── */}
        <div ref={flexRef} className="work-flex">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
