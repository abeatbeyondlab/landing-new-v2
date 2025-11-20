export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface PainPoint {
  id: number;
  title: string;
  problem: string;
  solution: string;
}