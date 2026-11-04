export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Admin & Creative Lead",
    company: "Chobicode",
    period: "Nov 2024 – Present",
    points: [
      "Led web and media projects from concept to delivery",
      "Collaborated closely with clients on requirements, content and campaign needs",
      "Developed WordPress and Shopify solutions for international clients",
    ],
  },
  {
    role: "Admin",
    company: "Klemton Contracting Services",
    period: "Mar 2023 – Jul 2024",
    points: [
      "Managed workflow accuracy and compliance documentation",
      "Coordinated vendors and supported quality oversight",
      "Maintained organized processes across property preservation operations",
    ],
  },
  {
    role: "Head of Department, Processing",
    company: "NextGen ITS",
    period: "Nov 2021 – Mar 2023",
    points: [
      "Led processing operations with strong quality control standards",
      "Partnered with US-based clients through direct communication",
      "Mentored team members while supporting operational consistency",
    ],
  },
  {
    role: "Executive Manager",
    company: "H-Group",
    period: "Oct 2019 – Nov 2020",
    points: [
      "Managed service delivery across operational teams",
      "Tracked team performance against business goals and KPIs",
    ],
  },
];
