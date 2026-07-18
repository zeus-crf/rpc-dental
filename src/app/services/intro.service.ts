import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class IntroService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private releaseContent!: () => void;

  /**
   * Promise para quem precisa aguardar imperativamente (o `RevealDirective`,
   * que instala um IntersectionObserver).
   *
   * Resolve quando o conteúdo da página pode começar a se revelar: ao fim da
   * cortina, ou imediatamente se ela não for rodar. Sem isso o conteúdo acima
   * da dobra anima escondido atrás da cortina e aparece pronto quando ela sai.
   */
  readonly contentMayReveal = new Promise<void>((resolve) => {
    this.releaseContent = resolve;
  });

  /**
   * O mesmo estado como signal, para quem precisa reagir dentro de um template.
   * Uma promise resolvida fora da zona do Angular não dispara detecção de
   * mudanças; um signal lido no template dispara.
   */
  readonly contentReleased = signal(false);

  constructor() {
    // No servidor não liberamos nada: o HTML servido precisa casar com o estado
    // inicial do cliente, senão a hidratação descarta o que foi renderizado a
    // mais e o nó nunca volta. Quem decide liberar é sempre o browser.
    if (this.isBrowser && !this.shouldRun()) {
      this.release();
    }
  }

  /** Chamado pela landing page quando a cortina termina de sair. */
  notifyIntroDone(): void {
    this.release();
  }

  private release(): void {
    this.contentReleased.set(true);
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
