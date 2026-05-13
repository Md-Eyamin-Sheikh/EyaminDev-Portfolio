import { MdCopyright } from "react-icons/md";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { portfolioData } from "../data/portfolioData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto mt-12 w-full pb-8 pt-4 text-center md:mt-24">
      <div className="mb-4 flex items-center justify-center gap-5">
        <a
          href={portfolioData.social.facebook}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook profile"
          className="text-xl opacity-50 transition-opacity hover:opacity-100"
        >
          <FaFacebook />
        </a>
        <a
          href={portfolioData.social.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
          className="text-xl opacity-50 transition-opacity hover:opacity-100"
        >
          <FiGithub />
        </a>
        <a
          href={portfolioData.social.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
          className="text-xl opacity-50 transition-opacity hover:opacity-100"
        >
          <FiLinkedin />
        </a>
        <a
          href={portfolioData.social.x}
          target="_blank"
          rel="noreferrer"
          aria-label="X profile"
          className="text-xl opacity-50 transition-opacity hover:opacity-100"
        >
          <FaXTwitter />
        </a>
      </div>
      <p className="flex items-center justify-center gap-1 text-sm opacity-50">
        <MdCopyright /> {currentYear} {portfolioData.person.name}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
