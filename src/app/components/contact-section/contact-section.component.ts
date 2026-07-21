import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContactSectionData } from './contact-section.models';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  template: `
    <section id="contato" class="bg-brand-bg px-6 md:px-10 py-24">
     <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5">

        <!-- red card -->
        <div class="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-red to-brand-red-dark p-9 md:p-12 flex flex-col justify-between min-h-[420px]">
          <div class="absolute -top-10 -right-10 w-44 h-44 opacity-80">
            <svg viewBox="0 0 100 100" class="w-full h-full animate-seal-spin">
              <defs><path id="contactSeal" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" /></defs>
              <text font-size="7.5" letter-spacing="2.6" fill="rgba(255,255,255,.45)" class="font-body">
                <textPath href="#contactSeal" startOffset="0">{{ data.sealText }}</textPath>
              </text>
            </svg>
          </div>

          <div class="relative z-[1]">
            <span class="font-body font-bold text-[11px] tracking-[0.2em] uppercase text-white/80">— {{ data.eyebrow }}</span>
            <h2 class="font-display font-extrabold text-[34px] md:text-[46px] leading-[1.05] text-white mt-5 max-w-[420px]">{{ data.title }}</h2>
            <p class="font-body text-[15.5px] leading-[1.7] text-white/80 mt-4 max-w-[430px]">{{ data.body }}</p>
          </div>

          <div class="relative z-[1] mt-8">
            <div class="flex flex-wrap gap-3">
              <a [href]="data.whatsappHref" target="_blank" rel="noopener noreferrer"
                 class="flex items-center gap-2 font-body font-bold text-[15px] text-brand-red bg-white px-6 py-3.5 rounded-full no-underline hover:-translate-y-0.5 transition-transform">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#D62828"><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .3-3.4-.7-2.8-1.2-4.6-4.1-4.7-4.3-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.1.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.2.1.4.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l2 .9c.2.1.4.2.4.3.1.2.1.9-.1 1.5Z"/></svg>
                {{ data.whatsappLabel }}
              </a>
              <a [href]="data.callHref"
                 class="flex items-center gap-2 font-body font-bold text-[15px] text-white bg-white/15 px-6 py-3.5 rounded-full no-underline hover:bg-white/25 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M6.6 10.8c1.4 2.7 3.6 4.9 6.3 6.3l2.1-2.1c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C9.9 21.8 2.2 14.1 2.2 4.5c0-.6.4-1 1-1H6.6c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1z"/></svg>
                {{ data.callLabel }}
              </a>
            </div>
            <div class="flex flex-wrap gap-3 mt-4">
              @for (phone of data.phones; track phone) {
                <div class="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <span class="font-body font-bold text-[10px] tracking-[0.14em] uppercase text-white/60">Telefone</span>
                  <span class="font-body font-bold text-[13px] text-white">{{ phone }}</span>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- right stack -->
        <div class="grid grid-rows-[auto_1fr] gap-5">
          <!-- hours -->
          <div class="rounded-[28px] bg-white p-8 shadow-[0_10px_30px_rgba(26,21,18,0.05)]">
            <div class="flex items-center gap-3 mb-5">
              <span class="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#D62828" stroke-width="2"/><path d="M12 7v5l3 2" stroke="#D62828" stroke-width="2" stroke-linecap="round"/></svg>
              </span>
              <h3 class="font-display font-bold text-[20px] text-brand-dark">{{ data.hoursTitle }}</h3>
            </div>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
              @for (h of data.hours; track h.day) {
                <li class="flex items-center justify-between border-b border-brand-ink/8 pb-3 last:border-0 last:pb-0">
                  <span class="font-body text-[14px] text-brand-ink/70">{{ h.day }}</span>
                  <span class="font-body font-bold text-[14px]" [class]="h.closed ? 'text-brand-ink/70' : 'text-brand-dark'">{{ h.hours }}</span>
                </li>
              }
            </ul>
          </div>

          <!-- location -->
          <div class="rounded-[28px] bg-white p-8 shadow-[0_10px_30px_rgba(26,21,18,0.05)]">
            <div class="flex items-center gap-3 mb-4">
              <span class="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12Z" stroke="#D62828" stroke-width="2"/><circle cx="12" cy="10" r="2.5" stroke="#D62828" stroke-width="2"/></svg>
              </span>
              <h3 class="font-display font-bold text-[20px] text-brand-dark">{{ data.locationTitle }}</h3>
            </div>
            <p class="font-body text-[14px] leading-relaxed text-brand-ink/60 mb-4">{{ data.locationBody }}</p>
            <div class="relative h-56 rounded-2xl overflow-hidden">
              <iframe
                [src]="mapSrc"
                title="Mapa da localização da RPC Dental"
                class="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen></iframe>
            </div>
            <a [href]="data.mapLink" target="_blank" rel="noopener noreferrer"
               class="mt-4 inline-flex items-center gap-2 font-body font-bold text-[14px] text-brand-red no-underline hover:gap-3 transition-all">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 22s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12Z" stroke="#D62828" stroke-width="2"/><circle cx="12" cy="10" r="2.5" stroke="#D62828" stroke-width="2"/></svg>
              {{ data.locationLabel }}
            </a>
          </div>
        </div>
      </div>
     </div>
    </section>
  `,
})
export class ContactSectionComponent {
  private sanitizer = inject(DomSanitizer);

  @Input({ required: true }) data!: ContactSectionData;

  /** iframe src precisa ser marcado como confiável, senão o Angular bloqueia. */
  get mapSrc(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.data.mapEmbedUrl);
  }
}
