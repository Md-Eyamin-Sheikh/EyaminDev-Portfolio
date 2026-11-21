import { lazy, Suspense, useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Footer from "./Footer";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { setHeroTimeline, setAllTimeline } from "./utils/GsapScroll";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = () => {
  useEffect(() => {
    setHeroTimeline();
    setAllTimeline();
    setSplitText();

    const resizeHandler = () => {
      setSplitText();
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Suspense fallback={<div>Loading....</div>}>
              <TechStack />
            </Suspense>
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
