export interface HeroTitleLine {
  text: string;
  accent: boolean;
}

export type HeroChipPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface HeroChip {
  label: string;
  position: HeroChipPosition;
}

export interface HeroData {
  kicker: string;
  titleLines: HeroTitleLine[];
  body: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  rating: string;
  reviewsNote: string;
  certifiedNote: string;
  chips: HeroChip[];
}