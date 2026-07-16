import { Component, Input } from '@angular/core';
import { ServiceMarqueeData } from './service-marquee.models';

@Component({
  selector: 'app-service-marquee',
  standalone: true,
  template: `
    <div class="overflow-x-clip py-10 my-4">
      <div class="-rotate-2 w-[108%] -ml-[4%] bg-brand-red py-4 group overflow-hidden shadow-[0_12px_30px_rgba(214,40,40,0.18)]">
        <div class="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          @for (set of [1, 2]; track set) {
            <div class="flex items-center" [attr.aria-hidden]="set === 2 ? 'true' : null">
              @for (item of data.items; track item) {
                <div class="flex items-center">
                  <span class="font-display font-extrabold text-[27px] text-white uppercase whitespace-nowrap px-5">
                    {{ item }}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" class="flex-none">
                    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z"/>
                  </svg>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ServiceMarqueeComponent {
  @Input({ required: true }) data!: ServiceMarqueeData;
}