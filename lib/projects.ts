export type ProjectCaseStudy = {
  slug: string;
  title: string;
  role: string;
  domain: string;
  scale: string;
  summary: string;
  contributions: string[];
  impact: string[];
  technologies: string[];
};

export const projects: ProjectCaseStudy[] = [
  {
    slug: "ei-neev-assessments",
    title: "Ei Neev Assessments - National FLN Platform",
    role: "Engineering Lead",
    domain: "EdTech / Government Assessments",
    scale: "100,000+ student assessments",
    summary:
      "Hybrid mobile assessment platform for K-5 Foundational Literacy and Numeracy. Designed for low-connectivity regions with secure offline data sync.",
    contributions: [
      "Led system design and architecture across mobile and backend",
      "Built the mobile application with React Native",
      "Designed backend APIs using Go (Gin)",
      "Implemented secure offline data syncing mechanisms",
      "Directed engineering, QA, and deployment teams",
      "Acted as primary technical contact for stakeholders",
    ],
    impact: [
      "Deployed across Odisha, Uttar Pradesh, and Rajasthan",
      "Enabled large-scale, real-world assessments in remote areas",
      "Recognized under the NIPUN Bharat initiative",
      "Supported national digital education policy execution",
    ],
    technologies: [
      "React Native",
      "Go (Gin)",
      "Node.js",
      "SQLite",
      "Realm",
      "Firebase",
      "Offline-first architecture",
    ],
  },
];
