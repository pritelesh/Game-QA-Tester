export interface EducationEntry {
  degree: string;
  institution: string;
  period?: string;
}

export const education: EducationEntry[] = [
  {
    degree: "B.Sc in Computer Science & Engineering",
    institution: "Atish Dipankar University of Science & Technology",
    period: "Feb 2014 – Mar 2018",
  },
  {
    degree: "Higher Secondary Certificate (HSC), Science",
    institution: "Kishoregonj Model College",
    period: "May 2011 – Apr 2013",
  },
  {
    degree: "Secondary School Certificate (SSC), Science",
    institution: "Arjat Atarzan High School",
    period: "Jan 2009 – Apr 2011",
  },
];
