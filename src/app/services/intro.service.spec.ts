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
    sessionStorage.clear();
    vi.restoreAllMocks();
    stubMatchMedia(false);
  });

  it('roda na primeira visita do browser', () => {
    expect(makeService('browser').shouldRun()).toBe(true);
  });

  it('não roda no servidor', () => {
    expect(makeService('server').shouldRun()).toBe(false);
  });

  it('não roda se a sessão já viu a intro', () => {
    const service = makeService('browser');
    service.markSeen();
    expect(service.shouldRun()).toBe(false);
  });

  it('não roda com prefers-reduced-motion', () => {
    stubMatchMedia(true);
    expect(makeService('browser').shouldRun()).toBe(false);
  });

  it('não roda se sessionStorage lançar', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('bloqueado');
    });
    expect(makeService('browser').shouldRun()).toBe(false);
  });

  it('markSeen não propaga erro de sessionStorage', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('bloqueado');
    });
    expect(() => makeService('browser').markSeen()).not.toThrow();
  });
});
