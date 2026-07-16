import { Component } from "@angular/core";
import { FooterComponent } from "../footer/footer.component";
import { FooterData } from "../footer/footer.models";
import { NavbarComponent } from "../navbar/navbar.component";
import { NavbarData } from "../navbar/navbar.models";



@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [FooterComponent, NavbarComponent],
    template: `
         <app-navbar [data]="navbarData" />
        <main>

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
}