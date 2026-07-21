import { Component, Input } from '@angular/core';
import { TestimonialsData } from './testimonials.models';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  template: `
    <section id="depoimentos" class="bg-brand-bg px-6 md:px-10 py-24">
     <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <div class="font-body font-bold text-xs tracking-[0.2em] uppercase text-brand-red mb-5">— {{ data.eyebrow }}</div>
        <h2 class="font-display font-extrabold text-[38px] md:text-[56px] leading-[1.05] text-brand-dark">
          @for (line of data.titleLines; track $index) {
            <span [class.text-brand-red]="line.accent">{{ line.text }}</span><br>
          }
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        @for (t of data.testimonials; track t.name) {
          <div class="group relative overflow-hidden bg-white rounded-[24px] p-8 shadow-[0_10px_30px_rgba(26,21,18,0.05)] transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(26,21,18,0.1)]">
            <svg class="absolute -top-2 left-6 text-brand-red/10" width="72" height="72" viewBox="0 0 24 24" fill="currentColor"><path d="M10 7H6a2 2 0 00-2 2v3a2 2 0 002 2h2v3H5v2h5v-8H7V9h3V7zm9 0h-4a2 2 0 00-2 2v3a2 2 0 002 2h2v3h-3v2h5v-8h-3V9h3V7z"/></svg>

            <div class="relative z-[1] flex gap-0.5 mb-5">
              @for (star of [1,2,3,4,5]; track star) {
                <svg width="16" height="16" viewBox="0 0 24 24"
                     [attr.fill]="star <= t.rating ? '#D62828' : '#E7DED9'">
                  <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z"/>
                </svg>
              }
            </div>

            <p class="relative z-[1] font-body text-[15.5px] leading-[1.7] text-brand-ink/75">“{{ t.quote }}”</p>

            <div class="border-t border-brand-ink/10 mt-6 pt-5 flex items-center gap-3">
              <span class="flex-none w-11 h-11 rounded-full bg-brand-red text-white font-body font-bold text-sm flex items-center justify-center">{{ t.initials }}</span>
              <div>
                <div class="font-body font-bold text-[15px] text-brand-dark">{{ t.name }}</div>
                <div class="font-body text-[12.5px] text-brand-ink/50">{{ t.tenure }}</div>
              </div>
            </div>
          </div>
        }
      </div>
     </div>
    </section>
  `,
})
export class TestimonialsComponent {
  @Input({ required: true }) data!: TestimonialsData;
}
