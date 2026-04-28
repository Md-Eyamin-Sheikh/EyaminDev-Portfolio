export const portfolioData = {
  person: {
    name: "Md. Eyamin Sheikh",
    heroFirstName: "MD EYAMIN",
    heroLastName: "SHEIKH",
    initials: "MES",
    role: "Front-End Web Developer",
    secondaryRole: "MERN Stack Developer",
    location: "Bogura, Bangladesh",
    phone: "+8801775012014",
    email: "mdeyaminshekh0@gmail.com",
    resumePath: "/Md_Eyamin_Shekh_Resume%20(1).pdf",
  },
  summary:
    "Results-driven front-end developer with hands-on experience building full-stack MERN applications. Proficient in React, Next.js, TypeScript, and Tailwind CSS, with a strong focus on responsive UI, clean code architecture, and seamless user experience.",
  achievements:
    "Completed multiple production-level projects featuring real-time data, payment integration, and AI-powered features.",
  languages: ["Bangla (Native)", "English (Professional)"],
  skillGroups: [
    {
      label: "Languages",
      items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"],
    },
    {
      label: "Frameworks",
      items: ["React.js", "Next.js", "React Router", "Tailwind CSS"],
    },
    {
      label: "Back-End",
      items: ["Node.js", "Express.js", "MongoDB", "Firebase", "REST API"],
    },
    {
      label: "Tools",
      items: ["Git", "GitHub", "Vercel", "Netlify", "Stripe"],
    },
  ],
  services: [
    {
      title: "FRONTEND",
      kicker: "Responsive React and Next.js interfaces",
      description:
        "I build clean, responsive user interfaces with reusable components, strong type safety, and a smooth experience across desktop and mobile.",
      tools: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React Router",
        "JavaScript",
        "HTML5",
        "CSS3",
      ],
    },
    {
      title: "MERN STACK",
      kicker: "Full-stack product features",
      description:
        "I ship end-to-end product flows with authentication, dashboards, REST APIs, MongoDB data models, Firebase services, and Stripe payment integration.",
      tools: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Firebase",
        "REST API",
        "Stripe",
        "GitHub",
        "Vercel",
      ],
    },
  ],
  journey: [
    {
      role: "Front-End Web Developer",
      organization: "MERN Stack Project Builder",
      year: "NOW",
      description:
        "Building production-level portfolio projects with real-time features, role-based access, payment workflows, and AI-assisted interactions.",
    },
    {
      role: "Diploma in Engineering",
      organization: "Institute of Information Technology, Bogura",
      year: "2023-27",
      description:
        "Ongoing Computer Science & Technology studies with focus areas including Data Structures, Algorithms, OOP, and Networking.",
    },
    {
      role: "Complete Web Development Course",
      organization: "Programming Hero",
      year: "2024",
      description:
        "Completed practical training across HTML, CSS, Tailwind, JavaScript, React, Firebase, Node.js, Express.js, and MongoDB.",
    },
  ],
  projects: [
    {
      number: "01",
      name: "StudyHub",
      category: "Collaborative study platform",
      badge: "LIVE",
      summary:
        "A MERN-stack educational platform connecting students and tutors for real-time collaborative sessions with secure payment and content management.",
      highlights: [
        "Built multi-role authentication for students, tutors, and admins.",
        "Integrated Stripe for secure session booking and payments.",
        "Developed an admin dashboard for approvals, materials, and user oversight.",
      ],
      stack: [
        "React",
        "Firebase",
        "Express.js",
        "MongoDB",
        "Stripe",
        "Tailwind CSS",
      ],
      image: "/images/studyhub-project.svg",
      imageAlt: "StudyHub project preview",
      github: "https://github.com/eyamin/studyhub",
      live: "https://studyhub-live.vercel.app",
      role: "Fullstack Developer",
      year: "2024",
    },
    {
      number: "02",
      name: "SportZone",
      category: "Athletic events platform",
      badge: "OPEN SOURCE",
      summary:
        "A full-stack sports event management app for discovering, booking, and managing athletic events with an AI-powered assistant and personalized dashboards.",
      highlights: [
        "Integrated an AI assistant with voice and image chat capabilities.",
        "Implemented event booking with real-time status updates and dashboards.",
        "Applied Firebase authentication with role-based access and responsive UI design.",
      ],
      stack: [
        "React",
        "Firebase",
        "Express.js",
        "MongoDB",
        "Stripe",
        "Tailwind CSS",
      ],
      image: "/images/sportzone-project.svg",
      imageAlt: "SportZone project preview",
      github: "https://github.com/eyamin/sportzone",
      live: "https://sportzone-live.vercel.app",
      role: "Fullstack Developer",
      year: "2024",
    },
  ],
} as const;
