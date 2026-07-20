import { Component, Input } from "@angular/core";
import { FooterData } from "./footer.models";

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-brand-dark px-6 md:px-10 pt-16 pb-8">
     <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between gap-12 pb-11">

        <div class="max-w-xs">
          <div class="flex items-center gap-2 mb-4">
            <svg width="28" height="28" viewBox="0 0 34 34"><circle cx="17" cy="17" r="17" fill="#D62828"/><path d="M17 9 C12 9 9 12 9.6 16.5 C10 19.5 11.5 22 13 24.5 C13.8 25.8 15 26 15.4 24.6 C15.8 23.2 16 21.5 17 21.5 C18 21.5 18.2 23.2 18.6 24.6 C19 26 20.2 25.8 21 24.5 C22.5 22 24 19.5 24.4 16.5 C25 12 22 9 17 9 Z" fill="#fff"/></svg>
            <span class="font-display font-bold text-lg text-white">RPC <span class="text-brand-red">Dental</span></span>
          </div>
          <p class="text-white/50 text-sm font-body leading-relaxed mb-5">{{ data.tagline }}</p>
          <div class="flex gap-3">
            @for (social of data.socialLinks; track social.icon) {
              <a [href]="social.href" [attr.aria-label]="social.label" target="_blank" rel="noopener noreferrer"
                 class="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors">
                <!-- ícone por tipo -->
                @switch (social.icon) {
                  @case ('chat') {
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 12c0 4.4-4 8-9 8-1 0-2-.1-2.9-.4L4 21l1.5-4.5C4.6 15.2 4 13.7 4 12c0-4.4 4-8 9-8s8 3.6 8 8Z" stroke="#fff" stroke-width="1.6"/></svg>
                  }
                  @case ('instagram') {
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="#fff" stroke-width="1.6"/><circle cx="17.5" cy="6.5" r="1" fill="#fff"/></svg>
                  }
                  @case ('facebook') {
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2l1-3h-3V9c0-.3.2-.5.5-.5H14V9Z" fill="#fff"/></svg>
                  }
                }
              </a>
            }
          </div>
        </div>

        <div>
          <div class="text-white text-xs font-bold tracking-widest uppercase mb-4 font-body">Navegação</div>
          <ul class="list-none p-0 m-0 flex flex-col gap-3">
            @for (link of data.navLinks; track link.label) {
              <li>
                <a [href]="link.href" (click)="scrollToSection($event, link.href)" class="text-white/60 hover:text-white text-sm font-body no-underline transition-colors">
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
        </div>

        <div>
          <div class="text-white text-xs font-bold tracking-widest uppercase mb-4 font-body">Contato</div>
          <ul class="list-none p-0 m-0 flex flex-col gap-3">
            @for (phone of data.contactPhones; track phone) {
              <li class="text-white/60 text-sm font-body flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.7 3.6 4.9 6.3 6.3l2.1-2.1c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C9.9 21.8 2.2 14.1 2.2 4.5c0-.6.4-1 1-1H6.6c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1z" fill="rgba(255,255,255,.6)"/></svg>
                {{ phone }}
              </li>
            }
            <li class="text-white/60 text-sm font-body">{{ data.contactCity }}</li>
          </ul>
        </div>

      </div>

      <div class="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-3">
        <div class="text-white/65 text-xs font-body">{{ data.copyright }}</div>
      </div>
     </div>
    </footer>
  `,
})
export class FooterComponent {
  @Input({ required: true }) data!: FooterData;

  /** Âncoras internas: rola suave até a seção sem deixar o # na URL. Links
      externos (ex.: WhatsApp) passam direto. */
  scrollToSection(event: Event, href: string): void {
    if (!href?.startsWith('#')) {
      return;
    }
    event.preventDefault();
    const target = document.getElementById(href.slice(1));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}