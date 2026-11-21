import gsap from "gsap";

/**
 * Path B: Stub for legacy references to avoid unused file compilation errors
 */
export function setCharTimeline(..._args: any[]) {}

export function setHeroTimeline() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set([".landing-container", ".about-me", ".about-section", ".whatIDO"], {
      opacity: 1,
      y: 0,
      clearProps: "transform",
    });
    return;
  }

  // Path B: Plain ScrollTrigger fade-up and parallax transitions without 3D models
  const tlLanding = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  tlLanding
    .to(".landing-container", {
      opacity: 0,
      y: 80,
      ease: "none",
    })
    .fromTo(
      ".about-me",
      { opacity: 0.4, y: 40 },
      { opacity: 1, y: 0, ease: "none" },
      0
    );

  const tlAbout = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  tlAbout.to(".about-section", {
    opacity: 0.15,
    y: 40,
    ease: "none",
  });

  const tlWhat = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top 80%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  tlWhat.fromTo(
    ".whatIDO",
    { y: 30 },
    { y: 0, ease: "none" }
  );
}

export function setAllTimeline() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set([".career-timeline", ".career-info-box"], {
      opacity: 1,
      maxHeight: "100%",
    });
    return;
  }

  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )
    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}

