import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { portfolioData } from "../data/portfolioData";

const Contact = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="section-container mx-auto mt-12 pb-0 md:mt-24" id="contact">
      <div className="w-full">
        <h3 className="m-0 text-4xl font-normal uppercase md:text-5xl xl:text-6xl">
          Contact
        </h3>
        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-3 md:gap-8 xl:gap-12">
          <div className="flex flex-col">
            <h4 className="m-0 font-medium opacity-60">Email</h4>
            <p className="mb-5 mt-2.5 md:mt-1">
              <a
                href={`mailto:${portfolioData.person.email}`}
                data-cursor="disable"
                className="transition-colors hover:text-[var(--accentColor)]"
              >
                {portfolioData.person.email}
              </a>
            </p>
            <h4 className="m-0 font-medium opacity-60">Phone</h4>
            <p className="mb-5 mt-2.5 md:mt-1">
              <a href={`tel:${portfolioData.person.phone}`} data-cursor="disable">
                {portfolioData.person.phone}
              </a>
            </p>
            <h4 className="m-0 font-medium opacity-60">Location</h4>
            <p className="mb-0 mt-2.5 md:mt-1">{portfolioData.person.location}</p>
          </div>
          <div className="flex flex-col">
            <h4 className="m-0 font-medium opacity-60">Resume</h4>
            <a
              href={portfolioData.person.resumePath}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="mb-5 mt-2 inline-flex w-fit items-center gap-1 border-b border-white/70 text-xl transition-colors hover:text-[var(--accentColor)] md:text-[22px] xl:text-[25px]"
            >
              View Resume <MdArrowOutward />
            </a>
            <h4 className="m-0 font-medium opacity-60">Languages</h4>
            <p className="mb-5 mt-2.5 md:mt-1">
              {portfolioData.languages.join(" · ")}
            </p>
            <h4 className="m-0 font-medium opacity-60">Core Skills</h4>
            <p className="mb-0 mt-2.5 md:mt-1">
              {portfolioData.skillGroups[0].items.slice(0, 4).join(" · ")}
            </p>
          </div>
          <div className="flex flex-col">
            <h2 className="m-0 text-xl font-normal md:text-lg xl:text-[23px]">
              Designed and Developed <br /> by{" "}
              <span className="text-[var(--accentColor)]">
                {portfolioData.person.name}
              </span>
            </h2>
            <p className="mt-5 max-w-80 text-sm leading-7 text-[#adacac] md:text-[15px]">
              Front-end focused and building MERN applications with modern,
              responsive user experiences.
            </p>
            <h5 className="mb-0 mt-6 flex items-center gap-2.5 text-lg font-medium leading-5 opacity-50 md:text-xl">
              <MdCopyright /> {currentYear}
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
