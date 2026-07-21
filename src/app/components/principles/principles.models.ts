export interface Principle {
  number: string;
  title: string;
  description: string;
}

export interface PrinciplesData {
  eyebrow: string;
  count: string;
  principles: Principle[];
}
