import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Chave de sessão que marca que a intro já rodou nesta aba. */
const INTRO_SESSION_KEY = 'rpc-intro';

@Injectable({ providedIn: 'root' })
export class IntroService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Verdadeiro apenas na primeira visita da sessão, no browser, sem reduced-motion. */
  shouldRun(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    try {
      return sessionStorage.getItem(INTRO_SESSION_KEY) === null;
    } catch {
      // Modo privado em alguns navegadores: a intro é decorativa, então desistimos.
      return false;
    }
  }

  markSeen(): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      // Sem persistência a intro roda de novo no próximo reload — aceitável.
    }
  }
}
