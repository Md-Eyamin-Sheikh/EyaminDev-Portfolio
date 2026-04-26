import { portfolioData } from "../data/portfolioData";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          {portfolioData.summary} {portfolioData.achievements}
        </p>
        <p className="about-meta">
          {portfolioData.person.location} · {portfolioData.languages.join(" · ")}
        </p>
      </div>
    </div>
  );
};

export default About;
