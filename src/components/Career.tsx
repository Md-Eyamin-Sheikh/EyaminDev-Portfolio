import { portfolioData } from "../data/portfolioData";

const Career = () => {
  return (
    <div className="career-section section-container" id="journey">
      <div className="career-container">
        <h2>
          My journey <span>&</span>
          <br /> education
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {portfolioData.journey.map((item) => (
            <div className="career-info-box" key={`${item.role}-${item.year}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.role}</h4>
                  <h5>{item.organization}</h5>
                </div>
                <h3>{item.year}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
