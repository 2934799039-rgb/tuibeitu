export type SchoolId = "bazi" | "zhouyi";

export interface School {
  id: SchoolId;
  premium: boolean;
  category: "core" | "divination";
}

export const schools: School[] = [
  { id: "bazi", premium: false, category: "core" },
  { id: "zhouyi", premium: false, category: "divination" },
];

export const schoolCategories = {
  core: "Core Arts",
  divination: "Divination",
} as const;
