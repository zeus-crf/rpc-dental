import { Component, Input } from '@angular/core';
import { HeroData, HeroChipPosition } from './hero.models';

const CHIP_POSITION_CLASSES: Record<HeroChipPosition, string> = {
  'top-left': 'top-1.5 left-1.5 animate-float-chip-1',
  'top-right': 'top-6 -right-1 animate-float-chip-2',
  'bottom-left': 'bottom-14 -left-3 animate-float-chip-2 [animation-delay:0.3s]',
  'bottom-right': 'bottom-5 right-2 animate-float-chip-1 [animation-delay:0.5s]',
};

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="bg-brand-bg px-10 md:px-14 pt-16 pb-0 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">

      <div>
        <div class="inline-flex items-center gap-2 bg-white rounded-full px-4.5 py-2.5 shadow-[0_4px_14px_rgba(26,21,18,0.06)]">
          <svg width="13" height="13" viewBox="0 0 24 24" class="animate-sparkle-spin">
            <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="#E2453B"/>
          </svg>
          <span class="font-body font-bold text-[11.5px] text-brand-red tracking-wide uppercase">{{ data.kicker }}</span>
        </div>

        <h1 class="font-display font-extrabold text-[42px] md:text-[60px] leading-[1.08] text-brand-dark mt-6">
          @for (line of data.titleLines; track $index) {
            <span [class.text-brand-red]="line.accent">{{ line.text }}</span><br>
          }
        </h1>

        <p class="font-body text-base md:text-[17px] leading-[1.75] text-brand-ink-68 mt-6 max-w-[460px]">
          {{ data.body }}
        </p>

        <div class="flex flex-wrap gap-4 mt-8">
          <a [href]="data.primaryCtaHref"
             class="flex items-center gap-2 font-body font-bold text-[15px] text-white bg-brand-red px-7 py-4 rounded-full no-underline shadow-[0_6px_18px_rgba(226,69,59,0.25)] hover:bg-brand-red-dark hover:-translate-y-0.5 transition-all">
            {{ data.primaryCta }}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a [href]="data.secondaryCtaHref"
             class="font-body font-bold text-[15px] text-brand-dark bg-white px-7 py-4 rounded-full no-underline hover:bg-brand-ink-08 hover:-translate-y-0.5 transition-all">
            {{ data.secondaryCta }}
          </a>
        </div>

        <div class="flex flex-wrap items-center gap-5 mt-8">
          <div class="flex items-center gap-2">
            <div class="flex gap-0.5">
              @for (star of [1,2,3,4,5]; track star) {
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#E2453B"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z"/></svg>
              }
            </div>
            <span class="font-body font-bold text-sm text-brand-dark">{{ data.rating }}</span>
            <span class="font-body text-[13px] text-brand-ink-55">· {{ data.reviewsNote }}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 5-3.4 8.6-7 10-3.6-1.4-7-5-7-10V5z" fill="#E2453B"/><path d="M9 12l2 2 4-4" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="font-body text-[13px] text-brand-ink-60">{{ data.certifiedNote }}</span>
          </div>
        </div>
      </div>

      <div class="relative h-[380px] md:h-[460px] flex items-center justify-center">
        <div class="absolute w-[340px] h-[340px] rounded-full" style="background: radial-gradient(circle, rgba(226,69,59,.14) 0%, rgba(226,69,59,0) 70%)"></div>
        <div class="absolute w-[300px] h-[300px] rounded-full border-2 border-dashed border-brand-red/30 animate-ring-spin"></div>
        <div class="absolute w-[240px] h-[240px] rounded-full border border-dashed border-brand-red/25 animate-ring-spin-rev"></div>

        <svg width="160" height="190" viewBox="0 0 240 280" class="relative z-[2] animate-tooth-bob drop-shadow-[0_20px_26px_rgba(226,69,59,0.25)]">
          <path d="M120 34 C74 34 46 66 50 104 C53 132 64 156 75 180 C82 196 92 200 97 184 C102 168 106 152 120 152 C134 152 138 168 143 184 C148 200 158 196 165 180 C176 156 187 132 190 104 C194 66 166 34 120 34 Z" fill="#FBF8F6" stroke="#E2453B" stroke-width="2.5"/>
          <path d="M96 66 C104 58 116 55 126 58" stroke="rgba(226,69,59,.35)" stroke-width="3" stroke-linecap="round" fill="none"/>
        </svg>

        @for (chip of data.chips; track chip.label) {
          <div class="absolute flex items-center gap-1.5 bg-white rounded-full px-4 py-2.5 shadow-[0_8px_20px_rgba(26,21,18,0.1)]"
               [class]="chipPositionClass(chip.position)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#E2453B"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z"/></svg>
            <span class="font-body font-bold text-[13px] text-brand-dark">{{ chip.label }}</span>
          </div>
        }
      </div>
    </section>
  `,
})
export class HeroComponent {
  @Input({ required: true }) data!: HeroData;

  chipPositionClass(position: HeroData['chips'][number]['position']): string {
    return CHIP_POSITION_CLASSES[position];
  }
}