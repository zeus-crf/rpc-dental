import { Component, HostListener, Input, signal } from "@angular/core";
import { NavbarData } from "./navbar.models";

@Component({
    selector: 'app-navbar',
    standalone: true,
     template: `
    <header [class]="headerClass()">
      <nav [class]="navClass()">

        <a href="#inicio" class="flex items-center gap-2.5 no-underline">
          <svg width="34" height="34" viewBox="0 0 34 34" class="flex-none transition-all duration-300"
               [class.w-8]="scrolled()" [class.h-8]="scrolled()">
            <circle cx="17" cy="17" r="17" fill="#D62828"/>
            <path d="M17 9 C12 9 9 12 9.6 16.5 C10 19.5 11.5 22 13 24.5 C13.8 25.8 15 26 15.4 24.6 C15.8 23.2 16 21.5 17 21.5 C18 21.5 18.2 23.2 18.6 24.6 C19 26 20.2 25.8 21 24.5 C22.5 22 24 19.5 24.4 16.5 C25 12 22 9 17 9 Z" fill="#fff"/>
          </svg>
          <span class="flex flex-col leading-none">
            <span class="font-display font-bold text-lg text-brand-dark">RPC <span class="text-brand-red">Dental</span></span>
            <span class="font-body font-bold text-[9px] tracking-widest text-brand-red/75 uppercase mt-0.5">Odontologia</span>
          </span>
        </a>

        <!-- links desktop -->
        <ul class="hidden md:flex gap-8 list-none p-0 m-0">
          @for (link of data.navLinks; track link.label) {
            <li>
              <a [href]="link.href"
                 class="relative font-body text-sm text-brand-dark no-underline transition-colors hover:text-brand-red after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:w-0 after:rounded-full after:bg-brand-red after:transition-[width] after:duration-300 hover:after:w-full">
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <!-- CTA desktop -->
        <a [href]="data.ctaHref" class="hidden md:flex items-center gap-2 font-body font-bold text-sm text-white bg-brand-red px-6 py-3.5 rounded-full no-underline animate-pulse-ring hover:bg-brand-red-dark transition-colors">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.7 3.6 4.9 6.3 6.3l2.1-2.1c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C9.9 21.8 2.2 14.1 2.2 4.5c0-.6.4-1 1-1H6.6c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1z" fill="#fff"/></svg>
          {{ data.ctaLabel }}
        </a>

        <!-- toggle mobile -->
        <button
          type="button"
          class="md:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-full"
          [attr.aria-expanded]="isOpen()"
          aria-label="Abrir menu"
          (click)="toggleMenu()">
          <span class="w-5 h-0.5 bg-brand-dark transition-transform" [class.rotate-45]="isOpen()" [class.translate-y-2]="isOpen()"></span>
          <span class="w-5 h-0.5 bg-brand-dark transition-opacity" [class.opacity-0]="isOpen()"></span>
          <span class="w-5 h-0.5 bg-brand-dark transition-transform" [class.-rotate-45]="isOpen()" [class.-translate-y-2]="isOpen()"></span>
        </button>
      </nav>

      <!-- menu mobile -->
      @if (isOpen()) {
        <div class="md:hidden max-w-[1360px] mx-auto bg-white rounded-3xl shadow-[0_8px_24px_rgba(26,21,18,0.08)] mt-3 p-6 flex flex-col gap-4">
          @for (link of data.navLinks; track link.label) {
            <a [href]="link.href" (click)="closeMenu()" class="font-body text-base text-brand-dark no-underline">
              {{ link.label }}
            </a>
          }
          <a [href]="data.ctaHref" (click)="closeMenu()" class="font-body font-bold text-sm text-white bg-brand-red px-6 py-3.5 rounded-full no-underline text-center">
            {{ data.ctaLabel }}
          </a>
        </div>
      }
    </header>
  `,
})

export class NavbarComponent {
    @Input({required: true }) data!: NavbarData;

    isOpen = signal(false);
    scrolled = signal(false);

    @HostListener('window:scroll')
    onScroll(): void {
        this.scrolled.set(window.scrollY > 20);
    }

    headerClass(): string {
        const base = 'sticky top-0 z-50 px-10 md:px-10 transition-all duration-300';
        return `${base} ${this.scrolled() ? 'bg-transparent pt-3 pb-2' : 'bg-brand-bg pt-7'}`;
    }

    navClass(): string {
        const base = 'flex items-center justify-between rounded-full pl-6 pr-3 max-w-[1360px] mx-auto transition-all duration-300';
        const surface = this.scrolled()
            ? 'py-2 bg-white/75 backdrop-blur-md shadow-[0_6px_20px_rgba(26,21,18,0.12)]'
            : 'py-3 bg-white shadow-[0_8px_24px_rgba(26,21,18,0.08)]';
        return `${base} ${surface}`;
    }

    toggleMenu(): void {
        this.isOpen.update(v => !v)
    }

    closeMenu(): void {
        this.isOpen.set(false)
    }
}
