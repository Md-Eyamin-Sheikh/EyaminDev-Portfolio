import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { portfolioData } from "../data/portfolioData";

const Contact = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a
                href={`mailto:${portfolioData.person.email}`}
                data-cursor="disable"
              >
                {portfolioData.person.email}
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href={`tel:${portfolioData.person.phone}`} data-cursor="disable">
                {portfolioData.person.phone}
              </a>
            </p>
            <h4>Location</h4>
            <p>{portfolioData.person.location}</p>
          </div>
          <div className="contact-box">
            <h4>Resume</h4>
            <a
              href={portfolioData.person.resumePath}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              View Resume <MdArrowOutward />
            </a>
            <h4>Languages</h4>
            <p>{portfolioData.languages.join(" · ")}</p>
            <h4>Core Skills</h4>
            <p>{portfolioData.skillGroups[0].items.slice(0, 4).join(" · ")}</p>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by{" "}
              <span>{portfolioData.person.name}</span>
            </h2>
            <p className="contact-note">
              Front-end focused and building MERN applications with modern,
              responsive user experiences.
            </p>
            <h5>
              <MdCopyright /> {currentYear}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
