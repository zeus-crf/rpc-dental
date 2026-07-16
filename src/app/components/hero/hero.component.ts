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
    <section class="bg-brand-bg px-6 md:px-10 pt-16 pb-[100px]">
     <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">

      <div>
        <!-- <div class="inline-flex items-center gap-2 bg-white rounded-full px-4.5 py-2.5 shadow-[0_4px_14px_rgba(26,21,18,0.06)]">
          <svg width="13" height="13" viewBox="0 0 24 24" class="animate-sparkle-spin">
            <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="#D62828"/>
          </svg>
          <span class="font-body font-bold text-[11.5px] text-brand-red tracking-wide uppercase">{{ data.kicker }}</span>
        </div> -->

        <h1 class="font-display font-extrabold [-webkit-text-stroke:0.7px_currentColor] text-[42px] md:text-[60px] leading-[1.08] text-brand-dark mt-6">
          @for (line of data.titleLines; track $index) {
            @if (line.underline) {
              <span class="relative inline-block" [class.text-brand-red]="line.accent">{{ line.text }}
                <svg class="absolute left-0 -bottom-1.5 w-[102%] h-[0.28em]  overflow-visible" viewBox="0 0 300 16" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M4 10 C 55 4, 110 13, 165 8 S 255 5, 296 11" stroke="#D62828" stroke-width="5" stroke-linecap="round"/>
                </svg>
              </span><br>
            } @else {
              <span [class.text-brand-red]="line.accent">{{ line.text }}</span><br>
            }
          }
        </h1>

        <p class="font-body text-base md:text-[17px] leading-[1.75] text-brand-ink/70 mt-6 max-w-[460px]">
          {{ data.body }}
        </p>

        <div class="flex flex-wrap gap-4 mt-8">
          <a [href]="data.primaryCtaHref"
             class="group relative overflow-hidden flex items-center gap-2 font-body font-bold text-[15px] text-white bg-brand-red px-7 py-4 rounded-full no-underline shadow-[0_6px_18px_rgba(214,40,40,0.25)] hover:bg-brand-red-dark hover:-translate-y-0.5 transition-all">
            <span class="pointer-events-none absolute top-0 left-0 h-full w-1/3 -skew-x-12 bg-white/30 blur-md -translate-x-[250%] group-hover:translate-x-[420%] transition-transform duration-700 ease-out"></span>
            <span class="relative z-10">{{ data.primaryCta }}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" class="relative z-10 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <!-- <a [href]="data.secondaryCtaHref"
             class="font-body font-bold text-[15px] text-brand-dark bg-white px-7 py-4 rounded-full no-underline hover:bg-brand-ink/[0.06] hover:-translate-y-0.5 transition-all">
            {{ data.secondaryCta }}
          </a> -->
        </div>

        <div class="flex flex-wrap items-center gap-5 mt-8">
          <div class="flex items-center gap-2">
            <!-- <div class="flex gap-0.5">
              @for (star of [1,2,3,4,5]; track star) {
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#D62828"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z"/></svg>
              }
            </div> -->
            <!-- <span class="font-body font-bold text-sm text-brand-dark">{{ data.rating }}</span>
            <span class="font-body text-[13px] text-brand-ink/55">· {{ data.reviewsNote }}</span> -->
          </div>
          <!-- <div class="flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 5-3.4 8.6-7 10-3.6-1.4-7-5-7-10V5z" fill="#D62828"/><path d="M9 12l2 2 4-4" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="font-body text-[13px] text-brand-ink/60">{{ data.certifiedNote }}</span>
          </div> -->
        </div>
      </div>

      <div class="relative h-[380px] md:h-[460px] flex items-center justify-center">
        <!-- soft glow -->
        <div class="absolute w-[420px] h-[420px] rounded-full" style="background: radial-gradient(circle, rgba(214,40,40,.13) 0%, rgba(214,40,40,0) 62%)"></div>
        <!-- outer dashed ring -->
        <div class="absolute w-[430px] h-[430px] rounded-full border border-dashed border-brand-red/25 animate-ring-spin"></div>
        <!-- inner solid ring -->
        <div class="absolute w-[320px] h-[320px] rounded-full border border-brand-red/20"></div>

        <svg width="195" height="210" viewBox="0 0 200 216" class="relative z-[2] animate-tooth-bob drop-shadow-[0_22px_30px_rgba(214,40,40,0.22)]">
          <defs>
            <linearGradient id="toothFill" x1="100" y1="34" x2="100" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#FFFFFF"/>
              <stop offset="0.55" stop-color="#FDE4E1"/>
              <stop offset="1" stop-color="#F6C9C5"/>
            </linearGradient>
          </defs>
          <path d="M50 40 C60 31 78 35 100 35 C122 35 140 31 150 40 C168 52 172 78 168 104 C164 131 156 159 146 182 C141 194 128 196 123 183 C118 168 114 152 100 152 C86 152 82 168 77 183 C72 196 59 194 54 182 C44 159 36 131 32 104 C28 78 32 52 50 40 Z"
                fill="url(#toothFill)" stroke="#D62828" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
          <path d="M66 78 C74 69 87 67 96 71" stroke="rgba(214,40,40,.4)" stroke-width="5" stroke-linecap="round" fill="none"/>
        </svg>

        @for (chip of data.chips; track chip.label) {
          <div class="absolute flex items-center gap-1.5 bg-white rounded-full px-4 py-2.5 shadow-[0_8px_20px_rgba(26,21,18,0.1)]"
               [class]="chipPositionClass(chip.position)">
            @switch (chip.icon) {
              @case ('sparkle-filled') {
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#D62828"><path d="M12 2l1.9 8.1L22 12l-8.1 1.9L12 22l-1.9-8.1L2 12l8.1-1.9z"/></svg>
              }
              @case ('sparkle-outline') {
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 3l1.6 7.4L21 12l-7.4 1.6L12 21l-1.6-7.4L3 12l7.4-1.6z" stroke="#D62828" stroke-width="1.5" stroke-linejoin="round"/></svg>
              }
              @case ('diamond-outline') {
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2.5L20.5 12 12 21.5 3.5 12z" stroke="#D62828" stroke-width="1.6" stroke-linejoin="round"/></svg>
              }
              @case ('star-filled') {
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#D62828"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z"/></svg>
              }
            }
            <span class="font-body font-bold text-[13px] text-brand-dark">{{ chip.label }}</span>
          </div>
        }
      </div>
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