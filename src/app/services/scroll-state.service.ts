import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Quanto conta como rolar de verdade, e não um tremor de trackpad. */
const SCROLL_THRESHOLD_PX = 24;

/**
 * Guarda o fato de o usuário já ter rolado a página. Usado para segurar as
 * animações de entrada até haver scroll de fato: sem isso, em telas altas as
 * seções abaixo do hero já estão no viewport ao carregar e revelam sozinhas.
 *
 * O estado é irreversível — uma vez rolado, rolado.
 */
@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly _scrolled = signal(false);

  /** Para templates. */
  readonly scrolled = this._scrolled.asReadonly();

  private releaseScrolled!: () => void;

  /** Para quem precisa esperar imperativamente. */
  readonly whenScrolled = new Promise<void>((resolve) => {
    this.releaseScrolled = resolve;
  });

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    const onScroll = () => {
      if (window.scrollY <= SCROLL_THRESHOLD_PX) {
        return;
      }
      this._scrolled.set(true);
      this.releaseScrolled();
      window.removeEventListener('scroll', onScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // A página pode nascer rolada (F5 no meio dela, âncora na URL).
    onScroll();
  }
}
