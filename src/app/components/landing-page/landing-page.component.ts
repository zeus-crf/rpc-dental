import { Component } from "@angular/core";
import { FooterComponent } from "../footer/footer.component";
import { FooterData } from "../footer/footer.models";
import { NavbarComponent } from "../navbar/navbar.component";
import { NavbarData } from "../navbar/navbar.models";
import { HeroComponent } from "../hero/hero.component";
import { HeroData } from "../hero/hero.models";
import { ServiceMarqueeComponent } from "../service-marquee/service-marquee.component";
import { ServiceMarqueeData } from "../service-marquee/service-marquee.models";
import { ServicesComponent } from "../services/services.component";
import { ServicesData } from "../services/services.models";
import { AboutComponent } from "../about/about.component";
import { AboutData } from "../about/about.models";
import { PrinciplesComponent } from "../principles/principles.component";
import { PrinciplesData } from "../principles/principles.models";
import { StatsBannerComponent } from "../stats-banner/stats-banner.component";
import { StatsBannerData } from "../stats-banner/stats-banner.models";
import { TestimonialsComponent } from "../testimonials/testimonials.component";
import { TestimonialsData } from "../testimonials/testimonials.models";
import { ContactSectionComponent } from "../contact-section/contact-section.component";
import { ContactSectionData } from "../contact-section/contact-section.models";

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [
        FooterComponent,
        NavbarComponent,
        HeroComponent,
        ServiceMarqueeComponent,
        ServicesComponent,
        AboutComponent,
        PrinciplesComponent,
        StatsBannerComponent,
        TestimonialsComponent,
        ContactSectionComponent,
    ],
    template: `
        <app-navbar [data]="navbarData" />
        <main id="inicio">
            <app-hero [data]="heroData" />
            <app-service-marquee [data]="marqueeData" />
            <app-services [data]="servicesData" />
            <app-about [data]="aboutData" />
            <app-principles [data]="principlesData" />
            <app-stats-banner [data]="statsData" />
            <app-testimonials [data]="testimonialsData" />
            <app-contact-section [data]="contactData" />
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
            { text: 'renovada.', accent: false, underline: true },
        ],
        body: 'Na RPC Dental, unimos tecnologia, conforto e atendimento humano para cuidar do seu sorriso com precisão. Clínica geral, implantes, ortodontia e muito mais.',
        primaryCta: 'Agendar consulta',
        primaryCtaHref: '#contato',
        secondaryCta: 'Ver serviços',
        secondaryCtaHref: '#servicos',
        chips: [
            { label: 'Sem dor', position: 'top-left', icon: 'sparkle-filled' },
            { label: 'Tecnologia 3D', position: 'top-right', icon: 'sparkle-outline' },
            { label: 'Anestesia digital', position: 'bottom-left', icon: 'diamond-outline' },
            { label: 'Resultado imediato', position: 'bottom-right', icon: 'star-filled' },
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

    servicesData: ServicesData = {
        eyebrow: 'Serviços',
        titleLines: [
            { text: 'Precisão', accent: false },
            { text: 'em cada', accent: false },
            { text: 'detalhe.', accent: true },
        ],
        body: 'Cada procedimento é executado com instrumentação de última geração e protocolos internacionais de excelência clínica.',
        cards: [
            { kicker: 'Cirurgia', title: 'Implantes', description: 'Osseointegração de precisão cirúrgica.', href: '#contato', icon: 'implant', tone: 'gray', gridClass: 'lg:col-span-8 lg:row-span-2 min-h-[320px] lg:min-h-[540px]' },
            { kicker: 'Estética', title: 'Bichectomia', description: 'Contorno facial refinado.', href: '#contato', icon: 'diamond', tone: 'white', gridClass: 'lg:col-span-4 min-h-[200px] lg:self-start', iconBehind: true },
            { kicker: 'Alinhamento', title: 'Ortodontia', description: 'Alinhadores invisíveis & aparelhos fixos.', href: '#contato', icon: 'aligner', tone: 'gray', gridClass: 'lg:col-span-4 min-h-[240px]' },
            { kicker: 'Reabilitação', title: 'Próteses', description: 'Reabilitação total com dignidade.', href: '#contato', icon: 'prosthesis', tone: 'white', gridClass: 'lg:col-span-8 min-h-[240px]' },
            { kicker: 'Cirurgia geral', title: 'Cirurgia', description: 'Extrações e sisos com anestesia digital.', href: '#contato', icon: 'probe', tone: 'gray', gridClass: 'lg:col-span-4 min-h-[240px]' },
            { kicker: 'Endodontia', title: 'Canal', description: 'Endodontia moderna e indolor.', href: '#contato', icon: 'canal', tone: 'white', gridClass: 'lg:col-span-4 min-h-[240px]' },
            { kicker: 'Saúde', title: 'Clínica geral', description: 'A saúde que sustenta tudo.', href: '#contato', icon: 'mirror', tone: 'gray', gridClass: 'lg:col-span-4 min-h-[240px]' },
            { kicker: 'Agende', title: 'Fale com um especialista', description: 'Consulta sem compromisso pelo WhatsApp.', href: '#contato', icon: 'whatsapp', tone: 'white', gridClass: 'lg:col-span-4 min-h-[240px]', cta: true },
        ],
    };

    aboutData: AboutData = {
        eyebrow: 'Sobre a RPC Dental',
        titleLines: [
            { text: 'Mais que', accent: false },
            { text: 'uma clínica.', accent: false },
            { text: 'Um', accent: true },
            { text: 'compromisso.', accent: true },
        ],
        body: 'Há mais de uma década transformando sorrisos no Rio de Janeiro com técnica, ética e cuidado — porque o seu bem-estar começa muito além do consultório.',
        manifestoLabel: 'Manifesto',
        manifestoQuote: 'Acreditamos que um sorriso saudável muda a forma como o mundo enxerga você — e a forma como você enxerga o mundo.',
        manifestoAuthor: 'Equipe RPC Dental',
        sealText: 'RPC DENTAL · DESDE 2014 · ',
        yearsLabel: 'Anos',
        yearsValue: '+10',
        yearsBig: '10',
        yearsNote: 'transformando sorrisos no Rio de Janeiro.',
        visitLabel: 'Visite-nos',
        visitTitle: 'Marque uma avaliação',
        visitLocation: 'Rio de Janeiro — RJ',
        visitHref: '#contato',
    };

    principlesData: PrinciplesData = {
        eyebrow: 'Nossos princípios',
        count: '/04',
        principles: [
            { number: '01', title: 'Excelência clínica', description: 'Profissionais especializados, registrados no CRO-RJ, com formação contínua em técnicas de vanguarda.' },
            { number: '02', title: 'Tecnologia moderna', description: 'Radiografia digital, escaneamento intraoral e anestesia computadorizada em todos os procedimentos.' },
            { number: '03', title: 'Cuidado humano', description: 'Escuta ativa, plano de tratamento personalizado e comunicação clara em cada etapa do cuidado.' },
            { number: '04', title: 'Ambiente acolhedor', description: 'Espaço higienizado, climatizado e projetado para transformar sua consulta em uma experiência serena.' },
        ],
    };

    statsData: StatsBannerData = {
        stats: [
            { value: 10, suffix: '+', label: 'Anos de experiência' },
            { value: 5000, suffix: '+', label: 'Sorrisos transformados' },
            { value: 320, suffix: '+', label: 'Avaliações positivas' },
            { value: 98, suffix: '%', label: 'Satisfação dos pacientes' },
        ],
    };

    testimonialsData: TestimonialsData = {
        eyebrow: 'Depoimentos',
        titleLines: [
            { text: 'Quem cuida com a gente', accent: false },
            { text: 'recomenda.', accent: true },
        ],
        testimonials: [
            { quote: 'Tratamento impecável! A equipe é super atenciosa e o resultado do meu implante ficou perfeito. Recomendo demais.', name: 'Mariana S.', tenure: 'Paciente há 3 anos', initials: 'MS', rating: 5 },
            { quote: 'Fiz canal e nem senti nada. Muito profissionais. Ambiente limpo, moderno e atendimento humano.', name: 'Carlos R.', tenure: 'Paciente há 1 ano', initials: 'CR', rating: 5 },
            { quote: 'Coloquei aparelho na RPC e a experiência foi incrível. Explicaram cada passo, muito acolhedores.', name: 'Aline P.', tenure: 'Paciente há 2 anos', initials: 'AP', rating: 5 },
            { quote: 'Melhor clínica que já frequentei. Levo minha família toda. Preço justo e resultado profissional.', name: 'João V.', tenure: 'Paciente há 5 anos', initials: 'JV', rating: 5 },
        ],
    };

    contactData: ContactSectionData = {
        sealText: 'RPC DENTAL · AGENDE JÁ · ',
        eyebrow: 'Fale com a gente',
        title: 'Marque sua consulta agora mesmo.',
        body: 'Atendimento rápido pelo WhatsApp ou telefone. Tire suas dúvidas com um especialista sem compromisso.',
        whatsappLabel: 'Chamar no WhatsApp',
        whatsappHref: '#',
        callLabel: 'Ligar agora',
        callHref: 'tel:+5521987396111',
        phones: ['(21) 98739-6111', '(21) 97658-2002'],
        hoursTitle: 'Horário de funcionamento',
        hours: [
            { day: 'Segunda a Sexta', hours: '08:00 – 19:00' },
            { day: 'Sábado', hours: '08:00 – 14:00' },
            { day: 'Domingo', hours: 'Fechado', closed: true },
        ],
        locationTitle: 'Localização',
        locationBody: 'Estamos localizados no Rio de Janeiro — RJ.',
        locationLabel: 'RPC Dental · Rio de Janeiro',
    };
}
