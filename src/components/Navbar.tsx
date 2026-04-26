import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import BrandLogo from "./BrandLogo";
import { portfolioData } from "../data/portfolioData";

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
  useEffect(() => {
    smoother = createSmoother();

    smoother.scrollTop(0);
    smoother.paused(true);

    const handleLinkClick = (e: Event) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const elem = e.currentTarget as HTMLAnchorElement;
        const section = elem.getAttribute("data-href");
        smoother.scrollTo(section, true);
      }
    };

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    const links = document.querySelectorAll(".header ul a");
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
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#journey" href="#journey">
              <HoverLinks text="JOURNEY" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="PROJECTS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
