import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { portfolioData } from "../data/portfolioData";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        
        <span>
          <a
            href={portfolioData.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
          >
            <FiLinkedin />
          </a>
        </span>
        <span>
          <a
            href={portfolioData.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <FiGithub />
          </a>
        </span>
        <span>
          <a
            href={portfolioData.social.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook profile"
          >
            <FaFacebook />
          </a>
        </span>
        <span>
          <a
            href={portfolioData.social.x}
            target="_blank"
            rel="noreferrer"
            aria-label="X profile"
          >
            <FaXTwitter />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href={portfolioData.person.resumePath}
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
