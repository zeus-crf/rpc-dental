import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ScrollStateService } from './scroll-state.service';

function setScrollY(value: number): void {
  Object.defineProperty(window, 'scrollY', { value, configurable: true });
}

function makeService(platformId: string = 'browser'): ScrollStateService {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [ScrollStateService, { provide: PLATFORM_ID, useValue: platformId }],
  });
  return TestBed.inject(ScrollStateService);
}

/** Resolve a corrida entre a promise e um tick, sem depender de timers. */
async function resolvido(p: Promise<void>): Promise<boolean> {
  const pendente = Symbol('pendente');
  const vencedor = await Promise.race([p.then(() => 'ok' as const), Promise.resolve(pendente)]);
  return vencedor === 'ok';
}

describe('ScrollStateService', () => {
  beforeEach(() => setScrollY(0));

  it('começa sem scroll', () => {
    expect(makeService().scrolled()).toBe(false);
  });

  it('registra o scroll do usuário', () => {
    const service = makeService();
    setScrollY(200);
    window.dispatchEvent(new Event('scroll'));
    expect(service.scrolled()).toBe(true);
  });

  it('ignora um scroll pequeno demais', () => {
    const service = makeService();
    setScrollY(10);
    window.dispatchEvent(new Event('scroll'));
    expect(service.scrolled()).toBe(false);
  });

  it('não desfaz o estado ao voltar para o topo', () => {
    const service = makeService();
    setScrollY(200);
    window.dispatchEvent(new Event('scroll'));
    setScrollY(0);
    window.dispatchEvent(new Event('scroll'));
    expect(service.scrolled()).toBe(true);
  });

  it('detecta a página que nasce rolada', () => {
    setScrollY(500);
    expect(makeService().scrolled()).toBe(true);
  });

  it('nunca marca scroll no servidor', () => {
    setScrollY(500);
    expect(makeService('server').scrolled()).toBe(false);
  });

  describe('whenScrolled', () => {
    it('fica pendente enquanto não há scroll', async () => {
      expect(await resolvido(makeService().whenScrolled)).toBe(false);
    });

    it('resolve no primeiro scroll', async () => {
      const service = makeService();
      setScrollY(200);
      window.dispatchEvent(new Event('scroll'));
      await expect(service.whenScrolled).resolves.toBeUndefined();
    });
  });
});
