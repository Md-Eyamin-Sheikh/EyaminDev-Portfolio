import { PropsWithChildren } from "react";
import { portfolioData } from "../data/portfolioData";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {portfolioData.person.heroFirstName}
              <br />
              <span>{portfolioData.person.heroLastName}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{portfolioData.person.role}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">React</div>
              <div className="landing-h2-2">Next.js</div>
            </h2>
            <h2>
              <div className="landing-h2-info">TypeScript</div>
              <div className="landing-h2-info-1">Tailwind CSS</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
