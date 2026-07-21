export interface HeroTitleLine {
  text: string;
  accent: boolean;
  underline?: boolean;
}

export type HeroChipPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type HeroChipIcon = 'sparkle-filled' | 'sparkle-outline' | 'diamond-outline' | 'star-filled';

export interface HeroChip {
  label: string;
  position: HeroChipPosition;
  icon: HeroChipIcon;
}

export interface HeroData {
  kicker: string;
  titleLines: HeroTitleLine[];
  body: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  rating?: string;
  reviewsNote?: string;
  certifiedNote?: string;
  chips: HeroChip[];
}