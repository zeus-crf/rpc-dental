import { Component, Input } from '@angular/core';
import { PrinciplesData } from './principles.models';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-principles',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="bg-brand-bg px-6 md:px-10 pb-24">
     <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between border-b border-brand-ink/10 pb-4 mb-2">
        <span class="font-body font-bold text-xs tracking-[0.2em] uppercase text-brand-red">— {{ data.eyebrow }}</span>
        <span class="font-body font-bold text-xs tracking-[0.2em] text-brand-ink/40">{{ data.count }}</span>
      </div>

      @for (item of data.principles; track item.number; let idx = $index) {
        <div appReveal [revealDelay]="idx * 110"
             class="group grid grid-cols-[auto_1fr] md:grid-cols-[80px_1.1fr_1fr] gap-x-5 md:gap-x-8 gap-y-3 items-start border-b border-brand-ink/10 py-8 transition-colors hover:bg-white/60 -mx-4 px-4 rounded-2xl">
          <span class="font-body font-bold text-sm text-brand-red pt-1.5">{{ item.number }}</span>
          <h3 class="font-display font-bold text-[26px] md:text-[30px] leading-tight text-brand-dark">{{ item.title }}</h3>
          <p class="col-start-2 md:col-start-3 md:row-start-1 font-body text-[15px] leading-[1.7] text-brand-ink/60 max-w-[440px]">
            {{ item.description }}
          </p>
          <span class="col-start-1 row-start-2 md:row-start-2 w-10 h-10 rounded-full flex items-center justify-center border border-brand-ink/15 transition-all duration-300 group-hover:bg-brand-red group-hover:border-brand-red group-hover:rotate-45">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="text-brand-dark group-hover:text-white transition-colors"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
      }
     </div>
    </section>
  `,
})
export class PrinciplesComponent {
  @Input({ required: true }) data!: PrinciplesData;
}
