import { portfolioData } from "../data/portfolioData";

const Landing = () => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>{portfolioData.landing.greeting}</h2>
            <h1>
              {portfolioData.person.heroFirstName}
              <br />
              <span>{portfolioData.person.heroLastName}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{portfolioData.person.role}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{portfolioData.landing.cycleFrameworksA}</div>
              <div className="landing-h2-2">{portfolioData.landing.cycleFrameworksB}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{portfolioData.landing.cycleTechA}</div>
              <div className="landing-h2-info-1">{portfolioData.landing.cycleTechB}</div>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
