import { Component, Input } from '@angular/core';
import { ServicesData, ServiceCard, ServiceSize } from './services.models';

const SIZE_CLASSES: Record<ServiceSize, string> = {
  tall: 'lg:row-span-2 min-h-[300px] lg:min-h-[540px]',
  normal: 'min-h-[240px]',
};

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <section id="servicos" class="bg-brand-bg px-6 md:px-10 py-24">
     <div class="max-w-6xl mx-auto">
      <!-- header -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-8 items-end mb-14">
        <div>
          <div class="font-body font-bold text-xs tracking-[0.2em] uppercase text-brand-red mb-6">
            — {{ data.eyebrow }}
          </div>
          <h2 class="font-display font-extrabold text-[46px] md:text-[76px] leading-[0.95] text-brand-dark uppercase">
            @for (line of data.titleLines; track $index) {
              <span [class.text-brand-red]="line.accent">{{ line.text }}</span><br>
            }
          </h2>
        </div>
        <p class="font-body text-base md:text-[17px] leading-[1.7] text-brand-ink/60 lg:pb-4 max-w-[420px]">
          {{ data.body }}
        </p>
      </div>

      <!-- bento grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
        @for (card of data.cards; track card.title) {
          <a [href]="card.href"
             class="group relative flex flex-col justify-between overflow-hidden rounded-[26px] p-7 no-underline transition-all duration-300 hover:-translate-y-1.5"
             [class]="cardClass(card)">

            <!-- kicker + arrow -->
            <div class="flex items-start justify-between relative z-[2]">
              <span class="font-body font-bold text-[11px] tracking-[0.18em] uppercase"
                    [class.text-brand-red]="!card.cta"
                    [class.text-white]="card.cta">
                {{ card.kicker }}
              </span>
              <span class="flex-none w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:rotate-45"
                    [class]="card.cta
                      ? 'bg-white border-white'
                      : 'border-brand-ink/15 bg-transparent group-hover:bg-brand-red group-hover:border-brand-red'">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" class="transition-colors"
                     [attr.stroke]="card.cta ? '#D62828' : 'currentColor'"
                     [class.text-brand-dark]="!card.cta"
                     [class.group-hover:text-white]="!card.cta">
                  <path d="M7 17L17 7M17 7H8M17 7V16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>

            <!-- illustration -->
            <div class="relative z-[1] flex-1 flex items-center justify-center py-6 opacity-90 transition-transform duration-500 group-hover:scale-105">
              @switch (card.icon) {
                @case ('implant') {
                  <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
                    <path d="M32 6v12" stroke="#D62828" stroke-width="3" stroke-linecap="round"/>
                    <g stroke="#D62828" stroke-width="3" stroke-linecap="round">
                      <path d="M24 22h16M25 28h14M26 34h12M27 40h10"/>
                    </g>
                    <path d="M30 46l2 12 2-12" fill="#D62828"/>
                  </svg>
                }
                @case ('diamond') {
                  <svg width="110" height="110" viewBox="0 0 64 64" fill="none">
                    <path d="M20 14h24l10 14-22 24-22-24z" fill="#F6C3BE"/>
                    <path d="M20 14h24l10 14H10zM10 28l22 24M54 28L32 52M32 14v14" stroke="#D62828" stroke-width="1.6"/>
                  </svg>
                }
                @case ('aligner') {
                  <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
                    <ellipse cx="32" cy="34" rx="22" ry="16" stroke="#D62828" stroke-width="2.4"/>
                    <path d="M14 30c8 8 28 8 36 0" stroke="#D62828" stroke-width="1.6" stroke-dasharray="2 3"/>
                  </svg>
                }
                @case ('prosthesis') {
                  <svg width="130" height="90" viewBox="0 0 96 48" fill="none">
                    @for (t of [0,1,2,3,4,5,6]; track t) {
                      <rect [attr.x]="6 + t * 12" y="8" width="10" height="32" rx="5" fill="#F3E9E6" stroke="#D62828" stroke-width="1.4"/>
                    }
                  </svg>
                }
                @case ('syringe') {
                  <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
                    <path d="M14 50l24-24" stroke="#D62828" stroke-width="3" stroke-linecap="round"/>
                    <rect x="34" y="14" width="18" height="10" rx="2" transform="rotate(45 43 19)" fill="#F3E9E6" stroke="#D62828" stroke-width="2"/>
                    <path d="M50 8l6 6M10 54l6-6" stroke="#D62828" stroke-width="3" stroke-linecap="round"/>
                  </svg>
                }
                @case ('canal') {
                  <svg width="110" height="110" viewBox="0 0 64 64" fill="none">
                    @for (r of [22,15,8]; track r) {
                      <circle cx="32" cy="32" [attr.r]="r" stroke="#D62828" stroke-width="2" [attr.opacity]="0.4 + r/60"/>
                    }
                    <circle cx="32" cy="32" r="3" fill="#D62828"/>
                  </svg>
                }
                @case ('mirror') {
                  <svg width="110" height="110" viewBox="0 0 64 64" fill="none">
                    <circle cx="24" cy="24" r="12" fill="#F3E9E6" stroke="#D62828" stroke-width="2.4"/>
                    <path d="M33 33l16 16" stroke="#D62828" stroke-width="3" stroke-linecap="round"/>
                  </svg>
                }
                @case ('whatsapp') {
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3Z" stroke="#fff" stroke-width="1.4"/>
                    <path d="M9 8.5c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.9 4.5 4 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3l-1.5-.7c-.2-.1-.4-.1-.6.1l-.6.8c-.1.2-.3.2-.5.1-.6-.3-1.4-.6-2.2-1.4-.6-.6-1-1.3-1.2-1.5-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3.2-.5 0-.2 0-.3-.1-.5l-.6-1.5c-.2-.4-.3-.4-.5-.4Z" fill="#fff"/>
                  </svg>
                }
              }
            </div>

            <!-- title + description -->
            <div class="relative z-[2]">
              <h3 class="font-display font-extrabold text-[26px] md:text-[30px] leading-tight uppercase"
                  [class.text-brand-dark]="!card.cta"
                  [class.text-white]="card.cta">
                {{ card.title }}
              </h3>
              <p class="font-body text-[13.5px] leading-relaxed mt-1.5"
                 [class]="card.cta ? 'text-white/85' : 'text-brand-ink/55'">
                {{ card.description }}
              </p>
            </div>
          </a>
        }
      </div>
     </div>
    </section>
  `,
})
export class ServicesComponent {
  @Input({ required: true }) data!: ServicesData;

  cardClass(card: ServiceCard): string {
    const base = SIZE_CLASSES[card.size];
    const surface = card.cta
      ? 'bg-brand-red shadow-[0_18px_40px_rgba(214,40,40,0.28)] hover:shadow-[0_24px_50px_rgba(214,40,40,0.38)]'
      : 'bg-white shadow-[0_10px_30px_rgba(26,21,18,0.05)] hover:shadow-[0_20px_44px_rgba(26,21,18,0.1)]';
    return `${base} ${surface}`;
  }
}
