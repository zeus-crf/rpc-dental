export interface ServicesTitleLine {
  text: string;
  accent: boolean;
}

export type ServiceIcon =
  | 'implant'
  | 'diamond'
  | 'aligner'
  | 'prosthesis'
  | 'syringe'
  | 'canal'
  | 'mirror'
  | 'whatsapp';

export type ServiceSize = 'tall' | 'normal';

export interface ServiceCard {
  kicker: string;
  title: string;
  description: string;
  href: string;
  icon: ServiceIcon;
  size: ServiceSize;
  cta?: boolean;
}

export interface ServicesData {
  eyebrow: string;
  titleLines: ServicesTitleLine[];
  body: string;
  cards: ServiceCard[];
}
