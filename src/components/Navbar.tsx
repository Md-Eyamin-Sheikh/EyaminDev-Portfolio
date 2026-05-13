import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import BrandLogo from "./BrandLogo";
import { portfolioData } from "../data/portfolioData";
import { BsThreeDotsVertical } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

type ScrollTarget = string | Element | null;

interface SmootherLike {
  paused: (value: boolean) => void;
  scrollTop: (value: number) => void;
  scrollTo: (target: ScrollTarget, smooth?: boolean) => void;
}

const createSmoother = (): SmootherLike => ({
  paused(value) {
    document.body.style.overflowY = value ? "hidden" : "auto";
  },
  scrollTop(value) {
    window.scrollTo({ top: value, behavior: "auto" });
  },
  scrollTo(target, smooth = true) {
    const section =
      typeof target === "string" ? document.querySelector(target) : target;
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  },
});

export let smoother: SmootherLike = createSmoother();

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    smoother = createSmoother();

    smoother.scrollTop(0);
    smoother.paused(true);

    const handleLinkClick = (e: Event) => {
      setIsMenuOpen(false);

      if (window.innerWidth > 1024) {
        e.preventDefault();
        const elem = e.currentTarget as HTMLAnchorElement;
        const section = elem.getAttribute("data-href");
        smoother.scrollTo(section, true);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
      ScrollTrigger.refresh();
    };

    const links = document.querySelectorAll(".navbar-menu a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", handleLinkClick);
    });

    window.addEventListener("resize", handleResize);

    return () => {
      links.forEach((elem) => {
        const element = elem as HTMLAnchorElement;
        element.removeEventListener("click", handleLinkClick);
      });
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!isMenuOpen) return;

      const target = event.target as Node;
      if (
        navRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target)
      ) {
        return;
      }

      setIsMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "#about", text: "ABOUT" },
    { href: "#journey", text: "JOURNEY" },
    { href: "#work", text: "PROJECTS" },
    { href: "#contact", text: "CONTACT" },
  ];

  return (
    <>
      <div className="header">
        <a
          href="/#"
          className="navbar-title"
          data-cursor="disable"
          aria-label="EyaminDev home"
        >
          <BrandLogo />
        </a>
        <a
          href={`mailto:${portfolioData.person.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {portfolioData.person.email}
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className="navbar-menu-button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          data-cursor="disable"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <BsThreeDotsVertical aria-hidden="true" />
        </button>
        <ul
          id="primary-navigation"
          ref={navRef}
          className={`navbar-menu${isMenuOpen ? " navbar-menu--open" : ""}`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a data-href={link.href} href={link.href}>
                <HoverLinks text={link.text} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
