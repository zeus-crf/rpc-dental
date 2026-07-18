import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class IntroService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private releaseContent!: () => void;

  /**
   * Resolve quando o conteúdo da página pode começar a se revelar: ao fim da
   * cortina, ou imediatamente se ela não for rodar. Sem isso o conteúdo acima
   * da dobra anima escondido atrás da cortina e aparece pronto quando ela sai.
   */
  readonly contentMayReveal = new Promise<void>((resolve) => {
    this.releaseContent = resolve;
  });

  constructor() {
    if (!this.shouldRun()) {
      this.releaseContent();
    }
  }

  /** Chamado pela landing page quando a cortina termina de sair. */
  notifyIntroDone(): void {
    this.releaseContent();
  }

  /**
   * A cortina roda em toda carga de página no browser. A única condição que a
   * bloqueia é o usuário ter pedido menos movimento — isso é acessibilidade,
   * não preferência estética, então não abrimos exceção.
   */
  shouldRun(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
