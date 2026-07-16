export interface ServicesTitleLine {
  text: string;
  accent: boolean;
}

export type ServiceIcon =
  | 'implant'
  | 'diamond'
  | 'aligner'
  | 'prosthesis'
  | 'probe'
  | 'canal'
  | 'mirror'
  | 'whatsapp';

export type ServiceTone = 'gray' | 'white';

export interface ServiceCard {
  kicker: string;
  title: string;
  description: string;
  href: string;
  icon: ServiceIcon;
  tone: ServiceTone;
  gridClass: string;
  iconBehind?: boolean;
  cta?: boolean;
}

export interface ServicesData {
  eyebrow: string;
  titleLines: ServicesTitleLine[];
  body: string;
  cards: ServiceCard[];
}
