import {
  Code2,
  Gauge,
  Palette,
  Shapes,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "Mduduzi O. Mpofu",
  shortName: "Mduduzi",
  role: "Aspiring Software Developer",
  tagline:
    "I build digital solutions that make a difference, from the interface down to the database.",
  location: "Lupane West, Gwayi, Zimbabwe",
  email: "mduduzim39@gmail.com",
  
  cvUrl: "/Mduduzi-Mpofu-CV.pdf",
 
  socials: [
    { label: "GitHub", href: "https://github.com/your-username" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-username" },
  ],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const aboutParagraphs = [
  "Hello! I'm Mduduzi O. Mpofu, an aspiring Software Developer passionate about technology, problem-solving and building digital solutions that make a difference.",
  "My journey in technology has allowed me to explore software development, product design and the creative side of building digital experiences. I enjoy transforming ideas into functional, user-friendly applications while continuously learning and improving my technical skills.",
  "I work with technologies such as JavaScript, TypeScript, React, Next.js, Python, Django and Tailwind CSS. I'm also familiar with tools such as Git, GitHub and VS Code.",
  "I believe in continuous learning, creativity and collaboration. My goal is to grow into a skilled software developer, contribute to meaningful projects and use technology to solve real-world problems.",
];

export const aboutClosing =
  "I don't just write code; I build solutions, explore ideas and create possibilities through technology.";

export const skills: Record<string, string[]> = {
  Frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
  ],
  Backend: ["Python", "Django", "MongoDB", "PostgreSQL", "REST APIs"],
  Tools: ["Git", "GitHub", "VS Code", "Figma", "Canva"],
};

export const services: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Code2,
    title: "Web Development",
    text: "Custom websites and web apps built with modern technologies.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    text: "Clean, user-focused interfaces designed in Figma and built to match.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    text: "Mobile-first layouts that look great on every screen size.",
  },
  {
    icon: Gauge,
    title: "Performance",
    text: "Fast load times and solid SEO foundations.",
  },
];

export type Project = {
  title: string;
  image?: string; 
  description: string;
  tech: string[];
  
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Scientific Calculator",
    image: "/projects/scientific-calculator.png",
    description: "Scientific calculator with mathematical operations.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Nechilibi High School",
    image: "/projects/nechilibi-high-school.png",
    description: "A modern school website.",
    tech: ["React", "Tailwind CSS"],
  },
  {
    title: "ELANDS",
    image: "/projects/elands.png",
    description: "E-commerce clothing website.",
    tech: ["Django", "HTML", "CSS"],
  },
  {
    title: "Rapid Rescue",
    image: "/projects/rapid-rescue.png",
    description: "Emergency service marketplace concept.",
    tech: ["Figma", "UI/UX"],
    links: [
      {
        label: "View design",
        href: "https://www.figma.com/design/mMTi4vLAxtpzaXFFjAMbHF/Untitled?t=9AnGyILv0S6iO3sX-0",
      },
    ],
  },
  {
    title: "Nyamatusi Camp",
    image: "/projects/nyamatusi-camp.png",
    description: "Website for Nyamatusi Camp.",
    tech: ["React"],
  },
  {
    title: "QuizApp",
    image: "/projects/quizapp.png",
    description: "An interactive quiz application.",
    tech: [], 
  },
  {
    title: "Netflix UI/UX",
    image: "/projects/netflix-ui-ux.png",
    description: "UI/UX design of a Netflix interface, created in Figma.",
    tech: ["Figma", "UI/UX"],
    links: [
      {
        label: "View design",
        href: "https://www.figma.com/design/lF9zYm7i8mcCKcm7VSttp7/Untitled?node-id=0-1&t=hhltXk0C0DTuvqRC-0",
      },
    ],
  },
  {
    title: "Digital Marketing Crash Course",
    image: "/projects/digital-marketing.png",
    description:
      "Social media reel for Cimas Medical Aid Zimbabwe, plus posters and a marketing strategy, all designed in Canva.",
    tech: ["Canva", "Posters", "Reels", "Marketing Strategy"],
    links: [
      {
        label: "Watch reel",
        href: "https://www.canva.com/design/DAHUDa0-nKQ/BQ6UcuVx9nvRpCv0jg2OzA/view",
      },
      {
        label: "Marketing strategy",
        href: "https://www.canva.com/design/DAHSu3kkCAI/E_JUzWsoDGoVksloYrnriA/view",
      },
    ],
  },
];

export type Certification = {
  title: string;
  issuer: string; 
  platform?: string; 
  link?: string; 
};

export const certifications: Certification[] = [
  {
    title: "Product Design",
    issuer: "Uxcel",
  },
  {
    title: "Foundations of Digital Marketing and E-commerce",
    issuer: "Google",
    platform: "Coursera",
  },
  {
    title: "Introduction to Software Engineering",
    issuer: "IBM",
    platform: "Coursera",
  },
];

export type Experience = {
  icon: LucideIcon;
  role: string;
  description: string;
 
  links?: { label: string; href: string }[];
};

export const experiences: Experience[] = [
  {
    icon: Wrench,
    role: "Auto Mechanic",
    description:
      "Hands-on vehicle diagnostics, servicing and repairs, which built my patience, attention to detail and problem-solving skills.",
      links: [{ label: "View my work on Facebook", href: "https://www.facebook.com/profile.php?id=61595346498012" }],
   
  },
  {
    icon: Shapes,
    role: "Sculptor (Pottery)",
    description:
      "Handcrafting pottery and sculptural pieces, which fuels the creativity and sense of form I bring into design.",
      links: [{ label: "View my work on Facebook", href: "https://www.facebook.com/profile.php?id=100068801413728" }],
    
  },
];