export interface FooterNavLink {
  label: string;
  href: string;
}

export type FooterSocialIcon = 'chat' | 'instagram' | 'facebook';

export interface FooterSocialLink {
  icon: FooterSocialIcon;
  href: string;
  label: string; // aria-label
}

export interface FooterData {
  tagline: string;
  socialLinks: FooterSocialLink[];
  navLinks: FooterNavLink[];
  contactPhones: string[];
  contactCity: string;
  copyright: string;
}