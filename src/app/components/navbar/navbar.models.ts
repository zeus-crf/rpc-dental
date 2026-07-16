export interface NavLink {
    label: string;
    href: string;
}

export interface NavbarData {
    navLinks: NavLink[];
    ctaLabel: string;
    ctaHref: string;
}