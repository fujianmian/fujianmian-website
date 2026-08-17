import { projects } from "./projects";
import { resume } from "./resume";
import { timeline } from "./timeline";

const studyHub = projects.find((project) => project.slug === "studyhub");
const devMatch = projects.find((project) => project.slug === "devmatch");
const [razerExperience] = resume.experience;
const ethWorkshop = timeline.find((entry) => entry.id === "eth-uprising-workshop");

export const featuredHomeItems = [
  {
    id: "studyhub",
    title: studyHub.title,
    context: "An innovative learning platform",
    category: "Project",
    image: studyHub.image,
    href: "/projects",
    accent: "#67e8f9",
    objectPosition: "center center",
  },
  {
    id: "devmatch",
    title: devMatch.title,
    context: "Third-place front-end project at DevMatch Hackathon 2024",
    category: "Project",
    image: devMatch.image,
    href: "/projects",
    accent: "#c4b5fd",
    objectPosition: "center center",
  },
  {
    id: "razer-internship",
    title: razerExperience.role,
    context: razerExperience.company,
    category: "Timeline",
    image: razerExperience.image,
    href: "/timeline",
    accent: "#86efac",
    objectPosition: "center 42%",
  },
  {
    id: "eth-uprising-workshop",
    title: ethWorkshop.title,
    context: ethWorkshop.organization,
    category: "Timeline",
    image: ethWorkshop.image,
    href: "/timeline",
    accent: "#fcd34d",
    objectPosition: "center center",
  },
];
