import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");
  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  const allElements = [...paras, ...titles];
  allElements.forEach((element) => {
    element.anim?.progress(1).kill();
    gsap.set(element, { clearProps: "all" });
  });

  if (window.innerWidth < 900) return;

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    para.anim = gsap.fromTo(
      para,
      { autoAlpha: 0, y: 60, filter: "blur(6px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: para.parentElement?.parentElement ?? para,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    title.anim = gsap.fromTo(
      title,
      { autoAlpha: 0, y: 80, rotate: 4, filter: "blur(6px)" },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title.parentElement?.parentElement ?? title,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
      }
    );
  });
}
