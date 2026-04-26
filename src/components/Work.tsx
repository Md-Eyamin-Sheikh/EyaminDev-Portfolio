import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { portfolioData } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Work = () => {
  const [isPinnedLayout, setIsPinnedLayout] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1026px)", () => {
      const container = document.querySelector(".work-container") as HTMLElement | null;
      const workFlex = document.querySelector(".work-flex") as HTMLElement | null;

      if (!container || !workFlex) return;

      gsap.set(workFlex, { x: 0 });

      const boxes = Array.from(
        workFlex.querySelectorAll(".work-box")
      ) as HTMLElement[];

      if (boxes.length === 0) {
        setIsPinnedLayout(false);
        return;
      }

      const firstBox = boxes[0];
      const lastBox = boxes[boxes.length - 1];
      const contentWidth =
        lastBox.offsetLeft + lastBox.offsetWidth - firstBox.offsetLeft;
      const translateX = Math.max(0, contentWidth - container.clientWidth);

      if (translateX === 0) {
        setIsPinnedLayout(false);
        return;
      }

      setIsPinnedLayout(true);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: true,
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

    mm.add("(max-width: 1025px)", () => {
      setIsPinnedLayout(false);
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div
      className={`work-section ${!isPinnedLayout ? "work-section-static" : ""}`}
      id="work"
    >
      <div className="work-container section-container">
        <h2>
          Selected <span>Projects</span>
        </h2>
        <div className="work-flex">
          {portfolioData.projects.map((project) => (
            <div className="work-box" key={project.name}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Overview</h4>
                <p>{project.summary}</p>
                <h4>Highlights</h4>
                <ul className="work-highlights">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <h4>Stack</h4>
                <p>{project.stack.join(", ")}</p>
              </div>
              <WorkImage image={project.image} alt={project.imageAlt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
