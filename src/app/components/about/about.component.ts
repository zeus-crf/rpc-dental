import { Component, Input } from '@angular/core';
import { AboutData } from './about.models';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section id="sobre" class="bg-brand-bg px-6 md:px-10 py-24">
     <div class="max-w-6xl mx-auto">
      <!-- header -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-8 items-end mb-14">
        <div>
          <div class="font-body font-bold text-xs tracking-[0.2em] uppercase text-brand-red mb-6">
            — {{ data.eyebrow }}
          </div>
          <h2 class="font-display font-extrabold text-[44px] md:text-[72px] leading-[0.95] text-brand-dark uppercase">
            @for (line of data.titleLines; track $index) {
              <span [class.text-brand-red]="line.accent">{{ line.text }}</span><br>
            }
          </h2>
        </div>
        <p class="font-body text-base md:text-[17px] leading-[1.7] text-brand-ink/60 lg:pb-3 max-w-[420px]">
          {{ data.body }}
        </p>
      </div>

      <!-- cards -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-5">
        <!-- manifesto -->
        <div class="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-red to-brand-red-dark p-9 md:p-12 flex flex-col justify-between min-h-[340px]">
          <div class="flex items-start justify-between">
            <span class="font-body font-bold text-[11px] tracking-[0.2em] uppercase text-white/80">
              {{ data.manifestoLabel }}
            </span>
            <div class="relative w-24 h-24 flex-none opacity-90">
              <svg viewBox="0 0 100 100" class="w-full h-full animate-seal-spin">
                <defs>
                  <path id="sealArc" d="M50 50 m-34 0 a34 34 0 1 1 68 0 a34 34 0 1 1 -68 0" />
                </defs>
                <text class="font-body" font-size="8.5" letter-spacing="2.4" fill="rgba(255,255,255,.75)">
                  <textPath href="#sealArc" startOffset="0">{{ data.sealText }}</textPath>
                </text>
              </svg>
              <span class="absolute inset-0 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,.85)"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z"/></svg>
              </span>
            </div>
          </div>
          <div>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,.35)" class="mb-3"><path d="M10 7H6a2 2 0 00-2 2v3a2 2 0 002 2h2v3H5v2h5v-8H7V9h3V7zm9 0h-4a2 2 0 00-2 2v3a2 2 0 002 2h2v3h-3v2h5v-8h-3V9h3V7z"/></svg>
            <p class="font-display font-semibold text-[24px] md:text-[30px] leading-[1.25] text-white">
              {{ data.manifestoQuote }}
            </p>
            <div class="flex items-center gap-3 mt-7">
              <span class="w-8 h-px bg-white/50"></span>
              <span class="font-body font-bold text-[11px] tracking-[0.16em] uppercase text-white/80">{{ data.manifestoAuthor }}</span>
            </div>
          </div>
        </div>

        <!-- right stack -->
        <div class="grid grid-rows-2 gap-5">
          <!-- years stat -->
          <div class="relative overflow-hidden rounded-[28px] bg-white p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(26,21,18,0.05)]">
            <span class="font-body font-bold text-[11px] tracking-[0.2em] uppercase text-brand-red">{{ data.yearsLabel }}</span>
            <span class="pointer-events-none absolute right-6 -bottom-4 font-display font-extrabold text-[150px] leading-none text-brand-dark/90 select-none">{{ data.yearsBig }}</span>
            <div class="relative z-[1] mt-4">
              <span class="font-display font-extrabold text-[52px] leading-none text-brand-red">{{ data.yearsValue }}</span>
              <p class="font-body text-sm text-brand-ink/60 mt-2 max-w-[180px]">{{ data.yearsNote }}</p>
            </div>
          </div>

          <!-- visit card -->
          <a [href]="data.visitHref"
             class="group relative overflow-hidden rounded-[28px] bg-brand-dark p-8 flex flex-col justify-between no-underline transition-all hover:-translate-y-1">
            <span class="font-body font-bold text-[11px] tracking-[0.2em] uppercase text-brand-red">{{ data.visitLabel }}</span>
            <div class="flex items-end justify-between">
              <div>
                <h3 class="font-display font-bold text-[26px] leading-tight text-white">{{ data.visitTitle }}</h3>
                <p class="font-body text-[13px] text-white/50 mt-1.5">{{ data.visitLocation }}</p>
              </div>
              <span class="flex-none w-11 h-11 rounded-full bg-white/10 group-hover:bg-brand-red flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </div>
          </a>
        </div>
      </div>
     </div>
    </section>
  `,
})
export class AboutComponent {
  @Input({ required: true }) data!: AboutData;
}
