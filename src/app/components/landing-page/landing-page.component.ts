import { Component } from "@angular/core";
import { FooterComponent } from "../footer/footer.component";
import { FooterData } from "../footer/footer.models";
import { NavbarComponent } from "../navbar/navbar.component";
import { NavbarData } from "../navbar/navbar.models";
import { HeroComponent } from "../hero/hero.component";
import { HeroData } from "../hero/hero.models";
import { ServiceMarqueeComponent } from "../service-marquee/service-marquee.component";
import { ServiceMarqueeData } from "../service-marquee/service-marquee.models";



@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [FooterComponent, NavbarComponent, HeroComponent, ServiceMarqueeComponent],
    template: `
         <app-navbar [data]="navbarData" />
        <main>
        <app-hero [data]="heroData" />
        <app-service-marquee [data]="marqueeData" />
        </main>

        <app-footer [data]="footerData" />
    `,
})

export class LandingPageComponent {
    footerData: FooterData = {
        tagline: 'Odontologia moderna, humana e acessível. Cuidamos do seu sorriso com a excelência que você merece.',
    socialLinks: [
      { icon: 'chat', href: '#', label: 'Fale conosco' },
      { icon: 'instagram', href: '#', label: 'Instagram' },
      { icon: 'facebook', href: '#', label: 'Facebook' },
    ],
    navLinks: [
      { label: 'Início', href: '#inicio' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Sobre', href: '#sobre' },
      { label: 'Depoimentos', href: '#depoimentos' },
      { label: 'Contato', href: '#contato' },
    ],
    contactPhones: ['(21) 98739-6111', '(21) 97658-2002'],
    contactCity: 'Rio de Janeiro — RJ',
    copyright: '© 2026 RPC Dental. Todos os direitos reservados.',
  };

  navbarData: NavbarData = {
  navLinks: [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ],
  ctaLabel: 'Agendar',
  ctaHref: '#contato',
};

heroData: HeroData = {
  kicker: 'Clínica odontológica em Rio de Janeiro',
  titleLines: [
    { text: 'Sorriso', accent: false },
    { text: 'saudável,', accent: true },
    { text: 'confiança', accent: false },
    { text: 'renovada.', accent: true },
  ],
  body: 'Na RPC Dental, unimos tecnologia, conforto e atendimento humano para cuidar do seu sorriso com precisão. Clínica geral, implantes, ortodontia e muito mais.',
  primaryCta: 'Agendar consulta',
  primaryCtaHref: '#contato',
  secondaryCta: 'Ver serviços',
  secondaryCtaHref: '#servicos',
  rating: '4.9',
  reviewsNote: '320+ avaliações',
  certifiedNote: 'Profissionais certificados',
  chips: [
    { label: 'Sem dor', position: 'top-left' },
    { label: 'Tecnologia 3D', position: 'top-right' },
    { label: 'Anestesia digital', position: 'bottom-left' },
    { label: 'Resultado imediato', position: 'bottom-right' },
  ],
};

marqueeData: ServiceMarqueeData = {
  items: [
    'Clínica geral',
    'Tratamento de canal',
    'Aparelhos ortodônticos',
    'Bichectomia',
    'Próteses dentárias',
    'Cirurgia geral',
    'Implantes dentários',
  ],
};
}