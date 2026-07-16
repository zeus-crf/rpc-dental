import { Component, ElementRef, Input, afterNextRender, signal, viewChild } from '@angular/core';
import { StatsBannerData } from './stats-banner.models';

@Component({
  selector: 'app-stats-banner',
  standalone: true,
  template: `
    <section class="bg-brand-bg px-6 md:px-14 py-6">
      <div #banner class="max-w-6xl mx-auto rounded-[28px] bg-gradient-to-br from-[#FCEBE9] to-[#F9DEDA] px-6 md:px-10 py-10">
        <div class="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-brand-red/15">
          @for (stat of data.stats; track stat.label; let i = $index) {
            <div class="flex flex-col items-center text-center px-4 py-5 lg:py-0">
              <span class="font-display font-extrabold text-[44px] md:text-[58px] leading-none text-brand-red">
                {{ stat.prefix }}{{ display()[i] }}{{ stat.suffix }}
              </span>
              <span class="font-body font-bold text-[11px] md:text-[12px] tracking-[0.14em] uppercase text-brand-ink/55 mt-3">
                {{ stat.label }}
              </span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class StatsBannerComponent {
  @Input({ required: true }) data!: StatsBannerData;

  private banner = viewChild<ElementRef<HTMLElement>>('banner');
  display = signal<string[]>([]);

  constructor() {
    afterNextRender(() => {
      this.display.set(this.data.stats.map(() => '0'));
      const el = this.banner()?.nativeElement;
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.disconnect();
            this.data.stats.forEach((s, i) => this.animate(i, s.value));
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
    });
  }

  private animate(index: number, target: number): void {
    const duration = 1400;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      this.setValue(index, current.toLocaleString('pt-BR'));
      if (progress < 1) requestAnimationFrame(step);
      else this.setValue(index, target.toLocaleString('pt-BR'));
    };
    requestAnimationFrame(step);
    setTimeout(() => this.setValue(index, target.toLocaleString('pt-BR')), duration + 120);
  }

  private setValue(index: number, value: string): void {
    this.display.update((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }
}
