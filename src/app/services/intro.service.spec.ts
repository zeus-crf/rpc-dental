import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { IntroService } from './intro.service';

function makeService(platformId: object | string = 'browser'): IntroService {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [IntroService, { provide: PLATFORM_ID, useValue: platformId }],
  });
  return TestBed.inject(IntroService);
}

/**
 * O jsdom usado pelo runner não implementa matchMedia, então o próprio teste
 * fornece o stub. Navegadores reais sempre têm a API.
 */
function stubMatchMedia(matches: boolean): void {
  window.matchMedia = vi.fn().mockReturnValue({ matches }) as unknown as typeof window.matchMedia;
}

describe('IntroService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    stubMatchMedia(false);
  });

  it('roda no browser', () => {
    expect(makeService('browser').shouldRun()).toBe(true);
  });

  it('roda de novo em cargas seguintes da mesma sessão', () => {
    expect(makeService('browser').shouldRun()).toBe(true);
    expect(makeService('browser').shouldRun()).toBe(true);
  });

  it('não roda no servidor', () => {
    expect(makeService('server').shouldRun()).toBe(false);
  });

  it('não roda com prefers-reduced-motion', () => {
    stubMatchMedia(true);
    expect(makeService('browser').shouldRun()).toBe(false);
  });

  describe('contentMayReveal', () => {
    /** Resolve a corrida entre a promise e um tick, sem depender de timers. */
    async function resolvido(p: Promise<void>): Promise<boolean> {
      const sentinela = Symbol('pendente');
      const vencedor = await Promise.race([
        p.then(() => 'ok' as const),
        Promise.resolve(sentinela),
      ]);
      return vencedor === 'ok';
    }

    it('segura o conteúdo enquanto a cortina não termina', async () => {
      const service = makeService('browser');
      expect(await resolvido(service.contentMayReveal)).toBe(false);
    });

    it('libera o conteúdo quando a cortina termina', async () => {
      const service = makeService('browser');
      service.notifyIntroDone();
      await expect(service.contentMayReveal).resolves.toBeUndefined();
    });

    it('libera imediatamente quando a cortina não vai rodar', async () => {
      stubMatchMedia(true);
      const service = makeService('browser');
      await expect(service.contentMayReveal).resolves.toBeUndefined();
    });

    it('libera imediatamente no servidor', async () => {
      const service = makeService('server');
      await expect(service.contentMayReveal).resolves.toBeUndefined();
    });
  });
});
