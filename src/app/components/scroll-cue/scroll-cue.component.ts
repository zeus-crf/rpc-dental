import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { IntroService } from '../../services/intro.service';

/** Quanto o usuário precisa rolar para a dica ter cumprido seu papel. */
const HIDE_AFTER_PX = 40;

@Component({
  selector: 'app-scroll-cue',
  standalone: true,
  template: `
    @if (visible()) {
      <div class="scroll-cue" aria-hidden="true">
        <span class="scroll-cue__label">Role para explorar</span>
        <svg class="scroll-cue__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v13M6 12.5l6 6 6-6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>
    }
  `,
})
export class ScrollCueComponent {
  private intro = inject(IntroService);

  /** Uma vez rolado, a dica cumpriu seu papel e não volta. */
  private dismissed = signal(false);

  /** Aparece depois da cortina e some no primeiro scroll de verdade. */
  readonly visible = computed(
    () => this.intro.contentReleased() && !this.dismissed()
  );

  @HostListener('window:scroll')
  onScroll(): void {
    if (window.scrollY > HIDE_AFTER_PX) {
      this.dismissed.set(true);
    }
  }
}
