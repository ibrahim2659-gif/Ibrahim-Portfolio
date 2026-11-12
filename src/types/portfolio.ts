export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  statusBadge: string;
  statusType: 'concept' | 'learning' | 'in-development';
  description: string;
  features: string[];
  technologies: string[];
  plannedFeatures?: string[];
  architectureNotes?: string;
  githubPlaceholderText: string;
  themeColor: string;
  iconName: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  specialization?: string;
  period: string;
  status: string;
  type: 'academic' | 'training';
  description: string;
  highlights: string[];
  location?: string;
}

export interface SkillItem {
  name: string;
  category: 'Python' | 'Artificial Intelligence' | 'Web Development';
  focusAreas: string[];
  toolsAndLibraries: string[];
  learningStatus: string;
  highlightText: string;
  color: string;
  icon: string;
}
