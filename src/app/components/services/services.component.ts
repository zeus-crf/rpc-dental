import { Component, Input } from '@angular/core';
import { ServicesData, ServiceCard } from './services.models';

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
          <h2 class="font-display font-black text-[46px] md:text-[76px] leading-[0.95] text-brand-dark uppercase">
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
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 auto-rows-auto">
        @for (card of data.cards; track card.title) {
          <a [href]="card.href" (click)="scrollToSection($event, card.href)"
             class="group relative flex flex-col justify-between overflow-hidden rounded-[26px] p-7 no-underline transition-all duration-300 hover:-translate-y-1.5"
             [class]="cardClass(card)">

            @if (card.cta) {
              <span class="pointer-events-none absolute top-0 left-0 h-full w-1/3 -skew-x-12 bg-white/25 blur-md -translate-x-[250%] group-hover:translate-x-[520%] transition-transform duration-700 ease-out"></span>
              <span class="pointer-events-none absolute -right-6 -bottom-8 w-40 h-40 rounded-full bg-white/10"></span>
              <span class="pointer-events-none absolute right-16 bottom-6 w-24 h-24 rounded-full bg-white/10"></span>
            }

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
            <div class="relative z-[1] flex-1 flex items-center justify-center py-6 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
              @switch (card.icon) {
                @case ('implant') {
                  <svg width="230" height="290" viewBox="0 0 80 100" fill="none">
                    <defs>
                      <linearGradient id="imMetal" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stop-color="#f4f4f6"/>
                        <stop offset="0.42" stop-color="#c9cad0"/>
                        <stop offset="0.56" stop-color="#aeb0b8"/>
                        <stop offset="1" stop-color="#e9eaee"/>
                      </linearGradient>
                    </defs>
                    <g transform="rotate(16 40 52)">
                      <rect x="31" y="8" width="18" height="13" rx="4" fill="url(#imMetal)"/>
                      <path d="M28 21 h24 l-3.5 46 a8.5 8.5 0 01-17 0 z" fill="url(#imMetal)"/>
                      <path d="M35 67 l5 18 5-18 a8.5 8.5 0 01-10 0 z" fill="url(#imMetal)"/>
                      <g stroke="#93959c" stroke-width="1.3" opacity="0.75" stroke-linecap="round">
                        <path d="M28.5 27 h23"/><path d="M29 33 h22"/><path d="M29.6 39 h20.8"/>
                        <path d="M30.2 45 h19.6"/><path d="M30.8 51 h18.4"/><path d="M31.4 57 h17.2"/><path d="M32 63 h16"/>
                      </g>
                      <path d="M33 10 v9" stroke="#ffffff" stroke-width="1.4" opacity="0.7" stroke-linecap="round"/>
                    </g>
                  </svg>
                }
                @case ('diamond') {
                  <svg width="120" height="140" viewBox="0 0 80 92" fill="none">
                    <defs>
                      <linearGradient id="gemG" x1="0" y1="0" x2="0.3" y2="1">
                        <stop offset="0" stop-color="#fcdedb"/>
                        <stop offset="0.5" stop-color="#f0a49c"/>
                        <stop offset="1" stop-color="#e07a71"/>
                      </linearGradient>
                    </defs>
                    <path d="M24 18 h32 l12 18 -28 42 -28 -42 z" fill="url(#gemG)"/>
                    <g stroke="#ffffff" stroke-opacity="0.6" stroke-width="1.2" fill="none">
                      <path d="M24 18 l16 18 16 -18"/>
                      <path d="M12 36 h56"/>
                      <path d="M40 36 v42"/>
                      <path d="M24 18 l-12 18 M56 18 l12 18"/>
                    </g>
                  </svg>
                }
                @case ('aligner') {
                  <svg width="150" height="120" viewBox="0 0 104 80" fill="none">
                    <defs>
                      <radialGradient id="algG" cx="0.5" cy="0.32" r="0.75">
                        <stop offset="0" stop-color="#ffffff"/>
                        <stop offset="1" stop-color="#dfe3e8"/>
                      </radialGradient>
                    </defs>
                    <ellipse cx="52" cy="40" rx="42" ry="30" fill="url(#algG)" stroke="#cdd2d8" stroke-width="1.5"/>
                    <ellipse cx="52" cy="44" rx="27" ry="17" fill="#eef1f4"/>
                    <path d="M18 42 a34 22 0 0 1 68 0" fill="none" stroke="#ffffff" stroke-width="9" stroke-dasharray="3 3.4" stroke-linecap="round" opacity="0.95"/>
                    <path d="M26 22 q26 -13 52 0" stroke="#ffffff" stroke-width="4" fill="none" opacity="0.75" stroke-linecap="round"/>
                  </svg>
                }
                @case ('prosthesis') {
                  <svg width="160" height="100" viewBox="0 0 116 62" fill="none">
                    <defs>
                      <linearGradient id="denG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="#ffffff"/>
                        <stop offset="1" stop-color="#efe6dc"/>
                      </linearGradient>
                    </defs>
                    @for (t of [0,1,2,3,4,5,6,7]; track t) {
                      <rect [attr.x]="6 + t * 13.5" y="8" width="11.5" height="42" rx="5.5" fill="url(#denG)" stroke="#e2d6ca" stroke-width="1"/>
                    }
                  </svg>
                }
                @case ('probe') {
                  <svg width="140" height="140" viewBox="0 0 90 90" fill="none">
                    <defs>
                      <linearGradient id="prbG" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stop-color="#eef0f2"/>
                        <stop offset="1" stop-color="#b7bac1"/>
                      </linearGradient>
                    </defs>
                    <path d="M74 14 L44 44" stroke="url(#prbG)" stroke-width="8" stroke-linecap="round"/>
                    <path d="M72 18 L50 40" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
                    <path d="M44 44 L31 61" stroke="#c1c4ca" stroke-width="3.4" stroke-linecap="round"/>
                    <path d="M31 61 q-4 6 3 9" stroke="#adb0b7" stroke-width="2.6" fill="none" stroke-linecap="round"/>
                    <circle cx="35" cy="71" r="3.2" fill="#D62828"/>
                  </svg>
                }
                @case ('canal') {
                  <svg width="120" height="120" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="12" fill="#D62828" opacity="0.12"/>
                    <circle cx="40" cy="40" r="33" stroke="#D62828" stroke-width="1.6" opacity="0.25"/>
                    <circle cx="40" cy="40" r="25" stroke="#D62828" stroke-width="1.6" opacity="0.4" stroke-dasharray="2 4"/>
                    <circle cx="40" cy="40" r="17" stroke="#D62828" stroke-width="1.8" opacity="0.6"/>
                    <circle cx="40" cy="40" r="9" stroke="#D62828" stroke-width="2" opacity="0.8" stroke-dasharray="2 3"/>
                    <circle cx="40" cy="40" r="4" fill="#D62828"/>
                  </svg>
                }
                @case ('mirror') {
                  <svg width="115" height="150" viewBox="0 0 80 104" fill="none">
                    <defs>
                      <radialGradient id="mirG" cx="0.4" cy="0.34" r="0.75">
                        <stop offset="0" stop-color="#ffffff"/>
                        <stop offset="1" stop-color="#d6dae0"/>
                      </radialGradient>
                      <linearGradient id="mirH" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stop-color="#e7e9ec"/>
                        <stop offset="0.5" stop-color="#b9bcc2"/>
                        <stop offset="1" stop-color="#e7e9ec"/>
                      </linearGradient>
                    </defs>
                    <rect x="35" y="42" width="8" height="54" rx="4" fill="url(#mirH)"/>
                    <circle cx="39" cy="28" r="21" fill="url(#mirG)" stroke="#cdd2d8" stroke-width="1.5"/>
                    <ellipse cx="32" cy="21" rx="7.5" ry="4.5" fill="#ffffff" opacity="0.85"/>
                  </svg>
                }
                @case ('whatsapp') {
                  <!-- <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3Z" stroke="#fff" stroke-width="1.4"/>
                    <path d="M9 8.5c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.9 4.5 4 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3l-1.5-.7c-.2-.1-.4-.1-.6.1l-.6.8c-.1.2-.3.2-.5.1-.6-.3-1.4-.6-2.2-1.4-.6-.6-1-1.3-1.2-1.5-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3.2-.5 0-.2 0-.3-.1-.5l-.6-1.5c-.2-.4-.3-.4-.5-.4Z" fill="#fff"/>
                  </svg> -->
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

  cardClass(card: ServiceCard): string {
    const surface = card.cta
      ? 'bg-brand-red shadow-[0_18px_40px_rgba(214,40,40,0.28)] hover:shadow-[0_24px_50px_rgba(214,40,40,0.38)]'
      : card.tone === 'gray'
        ? 'bg-[#E9E6E1] shadow-[0_10px_30px_rgba(26,21,18,0.04)] hover:shadow-[0_20px_44px_rgba(26,21,18,0.09)]'
        : 'bg-white shadow-[0_10px_30px_rgba(26,21,18,0.05)] hover:shadow-[0_20px_44px_rgba(26,21,18,0.1)]';
    return `${card.gridClass} ${surface}`;
  }
}
