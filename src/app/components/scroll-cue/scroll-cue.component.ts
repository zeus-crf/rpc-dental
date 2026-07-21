import { Component, computed, inject } from '@angular/core';
import { IntroService } from '../../services/intro.service';
import { ScrollStateService } from '../../services/scroll-state.service';

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
  private scroll = inject(ScrollStateService);

  /** Aparece depois da cortina e some no primeiro scroll, para não voltar. */
  readonly visible = computed(
    () => this.intro.contentReleased() && !this.scroll.scrolled()
  );
}
