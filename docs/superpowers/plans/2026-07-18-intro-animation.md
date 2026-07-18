# Animação de entrada + textura do hero — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar uma cortina de entrada que forma o wordmark "RPC Dental" letra a letra, e uma textura (grid de pontos + grão) no fundo do hero que entra junto com o texto.

**Architecture:** Três unidades independentes — um `IntroService` que decide se a intro roda, um `IntroOverlayComponent` que renderiza a cortina e emite `done`, e uma camada de textura puramente CSS dentro do hero. O hero não conhece a intro; a `landing-page` é o único ponto que liga as duas.

**Tech Stack:** Angular 20 standalone (signals, control flow `@if`/`@for`), Tailwind CSS v4 (tokens em `@theme`), Vitest via `@angular/build:unit-test`, SSR ativo.

**Spec:** `docs/superpowers/specs/2026-07-18-intro-animation-design.md`

---

## Convenções deste repositório

Leia antes de começar:

- Componentes são **standalone com template inline** (`template:` no decorator), sem `.html` nem `.css` separados. Veja `src/app/components/navbar/navbar.component.ts`.
- **Não existem arquivos `.css` por componente.** Todo CSS customizado (keyframes, classes utilitárias) mora em `src/styles.css`. Tailwind cobre o resto via classes no template.
- Tokens de marca vivem no bloco `@theme` de `src/styles.css`: `--color-brand-red` (`#D62828`), `--color-brand-dark`, `--color-brand-bg` (`#F4F1EC`), `--font-display` (Plus Jakarta Sans), `--font-body` (DM Sans).
- Já existe um bloco `@media (prefers-reduced-motion: reduce)` no fim de `src/styles.css`. Regras novas de acessibilidade vão lá dentro.
- Rodar testes: `npx ng test --no-watch`. Para um arquivo só, use o filtro do Vitest (mostrado em cada tarefa).

**Aviso sobre um teste pré-existente quebrado:** `src/app/app.spec.ts` espera um `<h1>` com "Hello, rpc-dental-website", que não existe mais. Esse teste **já falha antes deste plano começar** e não é responsabilidade sua consertar. Ao rodar a suíte inteira, ignore essa falha; o que importa é que os testes novos passem. Se preferir, rode só os arquivos novos com o filtro de caminho.

---

## Estrutura de arquivos

| Arquivo | Criar/Modificar | Responsabilidade |
|---|---|---|
| `src/app/services/intro.service.ts` | Criar | Decide se a intro roda; marca a sessão |
| `src/app/services/intro.service.spec.ts` | Criar | Testes do serviço |
| `src/app/components/intro-overlay/intro-overlay.component.ts` | Criar | Cortina + animação do wordmark |
| `src/app/components/intro-overlay/intro-overlay.component.spec.ts` | Criar | Testes do componente |
| `src/app/components/landing-page/landing-page.component.ts` | Modificar | Renderiza o overlay condicionalmente |
| `src/app/components/hero/hero.component.ts` | Modificar | Camadas de textura no `<section>` |
| `src/styles.css` | Modificar | Keyframes e classes `.intro-*` e `.hero-texture*` |

---

## Task 1: IntroService

Decide se a animação de entrada deve rodar. Três condições de bloqueio: estamos no servidor (SSR), a sessão já viu a intro, ou o usuário pediu menos movimento.

**Files:**
- Create: `src/app/services/intro.service.ts`
- Test: `src/app/services/intro.service.spec.ts`

- [ ] **Step 1: Write the failing test**

Crie `src/app/services/intro.service.spec.ts`:

```ts
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

describe('IntroService', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
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
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
    } as MediaQueryList);
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
```

Se `vi` não estiver disponível como global, adicione `import { vi } from 'vitest';` no topo.

- [ ] **Step 2: Run test to verify it fails**

```bash
npx ng test --no-watch -- src/app/services/intro.service.spec.ts
```

Esperado: FAIL — não consegue resolver o módulo `./intro.service`.

- [ ] **Step 3: Write minimal implementation**

Crie `src/app/services/intro.service.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx ng test --no-watch -- src/app/services/intro.service.spec.ts
```

Esperado: PASS, 6 testes.

- [ ] **Step 5: Commit**

```bash
git add src/app/services/intro.service.ts src/app/services/intro.service.spec.ts
git commit -m "feat: IntroService decide quando a animação de entrada roda"
```

---

## Task 2: CSS da intro

Todos os keyframes e classes da cortina, antes do componente que os usa. Sem isso o componente renderiza sem animação nenhuma.

**Files:**
- Modify: `src/styles.css`

Nada aqui entra no bloco `@theme` — os tokens `--animate-*` de lá existem para virar classes utilitárias do Tailwind (`animate-tooth-bob`, usada em templates). As animações da intro são aplicadas por classes próprias, então vão direto no CSS.

- [ ] **Step 1: Add the intro classes and keyframes**

Ainda em `src/styles.css`, **antes** do bloco `@media (prefers-reduced-motion: reduce)` no fim do arquivo, acrescente:

```css
/* ---------- Intro overlay ---------- */

.intro-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-brand-bg);
  opacity: 1;
}

.intro-overlay--exiting {
  animation: intro-overlay-out 0.35s ease-out both;
}

.intro-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.intro-overlay--exiting .intro-stage {
  animation: intro-stage-out 0.35s cubic-bezier(0.55, 0, 0.55, 0.2) both;
}

.intro-mark__disc {
  transform-origin: center;
  animation: intro-disc 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.intro-mark__tooth {
  animation: intro-tooth 0.5s ease-out 0.25s both;
}

.intro-wordmark {
  display: flex;
  gap: 0.3em;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2.2rem, 8vw, 3.4rem);
  line-height: 1;
  color: var(--color-brand-dark);
}

.intro-word {
  display: flex;
}

.intro-word--accent {
  color: var(--color-brand-red);
}

.intro-letter {
  display: inline-block;
  animation: intro-letter 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.intro-subtitle {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.7rem;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-brand-red) 75%, transparent);
  animation: intro-subtitle 0.6s ease-out 0.95s both;
}

@keyframes intro-disc {
  from { transform: scale(0.6); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes intro-tooth {
  from { stroke-dashoffset: 1; fill-opacity: 0; }
  60% { stroke-dashoffset: 0; fill-opacity: 0; }
  to { stroke-dashoffset: 0; fill-opacity: 1; }
}
@keyframes intro-letter {
  from { opacity: 0; transform: translateY(0.55em); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes intro-subtitle {
  from { opacity: 0; letter-spacing: 0.05em; }
  to { opacity: 1; letter-spacing: 0.3em; }
}
@keyframes intro-stage-out {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(calc(-50vw + 11rem), calc(-50vh + 3.5rem)) scale(0.42); }
}
@keyframes intro-overlay-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

- [ ] **Step 2: Verify the build compiles**

```bash
npx ng build
```

Esperado: build conclui sem erro. (Tailwind v4 processa `src/styles.css`; um erro de sintaxe CSS aparece aqui.)

- [ ] **Step 3: Commit**

```bash
git add src/styles.css
git commit -m "style: keyframes e classes da cortina de entrada"
```

---

## Task 3: IntroOverlayComponent

A cortina. Renderiza a logo, forma o wordmark letra a letra, sai e emite `done`.

**Files:**
- Create: `src/app/components/intro-overlay/intro-overlay.component.ts`
- Test: `src/app/components/intro-overlay/intro-overlay.component.spec.ts`

- [ ] **Step 1: Write the failing test**

Crie `src/app/components/intro-overlay/intro-overlay.component.spec.ts`:

```ts
import { TestBed } from '@angular/core/testing';
import { IntroOverlayComponent } from './intro-overlay.component';

describe('IntroOverlayComponent', () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [IntroOverlayComponent],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.style.overflow = '';
  });

  it('renderiza um span por letra de "RPC" e "Dental"', () => {
    const fixture = TestBed.createComponent(IntroOverlayComponent);
    fixture.detectChanges();
    const letters = fixture.nativeElement.querySelectorAll('.intro-letter');
    expect(letters.length).toBe(9);
    const text = Array.from(letters)
      .map((el) => (el as HTMLElement).textContent)
      .join('');
    expect(text).toBe('RPCDental');
  });

  it('dá a cada letra um animation-delay crescente', () => {
    const fixture = TestBed.createComponent(IntroOverlayComponent);
    fixture.detectChanges();
    const letters = fixture.nativeElement.querySelectorAll(
      '.intro-letter'
    ) as NodeListOf<HTMLElement>;
    expect(letters[0].style.animationDelay).toBe('550ms');
    expect(letters[1].style.animationDelay).toBe('595ms');
    expect(letters[3].style.animationDelay).toBe('750ms');
  });

  it('trava o scroll do body enquanto está ativo', () => {
    const fixture = TestBed.createComponent(IntroOverlayComponent);
    fixture.detectChanges();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('emite done e destrava o scroll ao fim da timeline', () => {
    const fixture = TestBed.createComponent(IntroOverlayComponent);
    const done = vi.fn();
    fixture.componentInstance.done.subscribe(done);
    fixture.detectChanges();

    vi.advanceTimersByTime(1600);
    expect(done).toHaveBeenCalledTimes(1);
    expect(document.body.style.overflow).toBe('');
  });

  it('não emite done duas vezes quando o timer de segurança dispara', () => {
    const fixture = TestBed.createComponent(IntroOverlayComponent);
    const done = vi.fn();
    fixture.componentInstance.done.subscribe(done);
    fixture.detectChanges();

    vi.advanceTimersByTime(3000);
    expect(done).toHaveBeenCalledTimes(1);
  });
});
```

Se `vi` não estiver disponível como global, adicione `import { vi } from 'vitest';` no topo.

- [ ] **Step 2: Run test to verify it fails**

```bash
npx ng test --no-watch -- src/app/components/intro-overlay/intro-overlay.component.spec.ts
```

Esperado: FAIL — não consegue resolver `./intro-overlay.component`.

- [ ] **Step 3: Write minimal implementation**

Crie `src/app/components/intro-overlay/intro-overlay.component.ts`:

```ts
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

/** Uma letra do wordmark com o atraso de entrada já calculado. */
interface IntroLetter {
  char: string;
  delay: number;
}

const PRIMARY_TEXT = 'RPC';
const ACCENT_TEXT = 'Dental';
const LETTER_STAGGER_MS = 45;
const PRIMARY_START_MS = 550;
const ACCENT_START_MS = 750;
/** Quando a cortina começa a sair. */
const EXIT_START_MS = 1250;
/** Quando o overlay sai do DOM. */
const TOTAL_MS = 1600;
/** Rede de segurança: nunca deixar a cortina presa sobre o site. */
const SAFETY_MS = 3000;

function toLetters(text: string, startMs: number): IntroLetter[] {
  return text.split('').map((char, index) => ({
    char,
    delay: startMs + index * LETTER_STAGGER_MS,
  }));
}

@Component({
  selector: 'app-intro-overlay',
  standalone: true,
  template: `
    <div class="intro-overlay" [class.intro-overlay--exiting]="exiting" aria-hidden="true">
      <div class="intro-stage">
        <svg width="72" height="72" viewBox="0 0 34 34">
          <circle class="intro-mark__disc" cx="17" cy="17" r="17" fill="#D62828" />
          <path
            class="intro-mark__tooth"
            pathLength="1"
            stroke="#fff"
            stroke-width="0.8"
            stroke-dasharray="1"
            fill="#fff"
            d="M17 9 C12 9 9 12 9.6 16.5 C10 19.5 11.5 22 13 24.5 C13.8 25.8 15 26 15.4 24.6 C15.8 23.2 16 21.5 17 21.5 C18 21.5 18.2 23.2 18.6 24.6 C19 26 20.2 25.8 21 24.5 C22.5 22 24 19.5 24.4 16.5 C25 12 22 9 17 9 Z" />
        </svg>

        <div class="intro-wordmark">
          <span class="intro-word">
            @for (letter of primaryLetters; track $index) {
              <span class="intro-letter" [style.animation-delay.ms]="letter.delay">{{ letter.char }}</span>
            }
          </span>
          <span class="intro-word intro-word--accent">
            @for (letter of accentLetters; track $index) {
              <span class="intro-letter" [style.animation-delay.ms]="letter.delay">{{ letter.char }}</span>
            }
          </span>
        </div>

        <span class="intro-subtitle">Odontologia</span>
      </div>
    </div>
  `,
})
export class IntroOverlayComponent implements OnInit, OnDestroy {
  @Output() done = new EventEmitter<void>();

  readonly primaryLetters = toLetters(PRIMARY_TEXT, PRIMARY_START_MS);
  readonly accentLetters = toLetters(ACCENT_TEXT, ACCENT_START_MS);

  exiting = false;

  private timers: ReturnType<typeof setTimeout>[] = [];
  private finished = false;

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';

    this.timers.push(
      setTimeout(() => (this.exiting = true), EXIT_START_MS),
      setTimeout(() => this.finish(), TOTAL_MS),
      setTimeout(() => this.finish(), SAFETY_MS)
    );
  }

  ngOnDestroy(): void {
    this.clearTimers();
    document.body.style.overflow = '';
  }

  private finish(): void {
    if (this.finished) {
      return;
    }
    this.finished = true;
    this.clearTimers();
    document.body.style.overflow = '';
    this.done.emit();
  }

  private clearTimers(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx ng test --no-watch -- src/app/components/intro-overlay/intro-overlay.component.spec.ts
```

Esperado: PASS, 5 testes.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/intro-overlay/
git commit -m "feat: componente da cortina de entrada com wordmark animado"
```

---

## Task 4: Ligar a intro na landing page

**Files:**
- Modify: `src/app/components/landing-page/landing-page.component.ts`

- [ ] **Step 1: Add the imports**

No topo de `src/app/components/landing-page/landing-page.component.ts`, troque a primeira linha:

```ts
import { Component } from "@angular/core";
```

por:

```ts
import { Component, inject, signal } from "@angular/core";
import { IntroOverlayComponent } from "../intro-overlay/intro-overlay.component";
import { IntroService } from "../../services/intro.service";
```

- [ ] **Step 2: Register the component**

No array `imports` do decorator, acrescente `IntroOverlayComponent,` logo após `RevealDirective,`.

- [ ] **Step 3: Render the overlay**

No `template`, acrescente como **primeira linha**, antes de `<app-navbar ...>`:

```html
        @if (introActive()) {
            <app-intro-overlay (done)="onIntroDone()" />
        }
```

- [ ] **Step 4: Add the component state**

Dentro da classe `LandingPageComponent`, logo após a linha `export class LandingPageComponent {`, acrescente:

```ts
    private introService = inject(IntroService);

    introActive = signal(this.introService.shouldRun());

    onIntroDone(): void {
        this.introService.markSeen();
        this.introActive.set(false);
    }
```

- [ ] **Step 5: Verify it builds**

```bash
npx ng build
```

Esperado: build conclui sem erro.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/landing-page/landing-page.component.ts
git commit -m "feat: renderiza a cortina de entrada na landing page"
```

---

## Task 5: Textura do hero

Grid de pontos com máscara radial e grão de papel por cima, entrando 80ms depois do texto.

**Files:**
- Modify: `src/styles.css`
- Modify: `src/app/components/hero/hero.component.ts:15-17`

- [ ] **Step 1: Add the texture CSS**

Em `src/styles.css`, logo abaixo do bloco `/* ---------- Intro overlay ---------- */` que a Task 2 criou (ainda antes do `@media (prefers-reduced-motion: reduce)`), acrescente:

```css
/* ---------- Textura do hero ---------- */

.hero-texture {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-texture--grid {
  background-image: radial-gradient(circle, var(--color-brand-red) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 55% 70% at 28% 45%, #000 0%, transparent 72%);
  mask-image: radial-gradient(ellipse 55% 70% at 28% 45%, #000 0%, transparent 72%);
  animation: texture-grid-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
}

.hero-texture--grain {
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: texture-grain-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
}

@keyframes texture-grid-in {
  from { opacity: 0; transform: scale(1.04); }
  to { opacity: 0.07; transform: scale(1); }
}
@keyframes texture-grain-in {
  from { opacity: 0; transform: scale(1.04); }
  to { opacity: 0.035; transform: scale(1); }
}
```

- [ ] **Step 2: Guard it for reduced motion**

Ainda em `src/styles.css`, dentro do bloco `@media (prefers-reduced-motion: reduce)` existente, acrescente antes do seletor `*, *::before, *::after`:

```css
  .hero-texture--grid {
    animation: none !important;
    opacity: 0.07;
  }
  .hero-texture--grain {
    animation: none !important;
    opacity: 0.035;
  }
```

- [ ] **Step 3: Add the texture layers to the hero**

Em `src/app/components/hero/hero.component.ts`, troque as linhas 15-17, que hoje são:

```html
    <section class="bg-brand-bg px-6 md:px-10 pt-16 pb-[100px]">
     <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
```

por:

```html
    <section class="relative overflow-hidden bg-brand-bg px-6 md:px-10 pt-16 pb-[100px]">
     <div class="hero-texture hero-texture--grid" aria-hidden="true"></div>
     <div class="hero-texture hero-texture--grain" aria-hidden="true"></div>
     <div class="relative z-[1] max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
```

O `</div>` de fechamento na linha 116 já existe e continua correspondendo — não mexa nele.

- [ ] **Step 4: Verify it builds**

```bash
npx ng build
```

Esperado: build conclui sem erro.

- [ ] **Step 5: Commit**

```bash
git add src/styles.css src/app/components/hero/hero.component.ts
git commit -m "feat: textura de grid e grão no fundo do hero"
```

---

## Task 6: Verificação visual no navegador

Nada aqui é testável por unidade. Confirme com os próprios olhos.

**Files:** nenhum (só verificação)

- [ ] **Step 1: Start the dev server**

```bash
npx ng serve
```

Abra `http://localhost:4200`.

- [ ] **Step 2: Check the intro timeline**

Confirme, em ordem: o círculo vermelho aparece com um leve overshoot, o dente branco se desenha e preenche, "RPC" sobe letra a letra, "Dental" sobe em vermelho, "ODONTOLOGIA" abre o espaçamento, e a cortina encolhe em direção ao canto superior esquerdo enquanto desaparece. Duração total próxima de 1,6s.

- [ ] **Step 3: Check the texture**

Com a página já revelada, confirme que o fundo do hero tem pontinhos vermelhos discretos, mais densos atrás do título e sumindo em direção às bordas, com um grão fino por cima. A textura não pode competir com o dente flutuante da direita.

- [ ] **Step 4: Check the session guard**

Recarregue a página (F5). A intro **não** deve rodar de novo. Abra uma aba anônima: a intro roda.

- [ ] **Step 5: Check reduced motion**

No DevTools: `Rendering` → `Emulate CSS prefers-reduced-motion: reduce`. Recarregue com o `sessionStorage` limpo (`sessionStorage.clear()` no console). A intro não deve aparecer, e a textura deve estar visível em seu estado final, sem fade.

- [ ] **Step 6: Check SSR**

```bash
npx ng build && node dist/rpc-dental-website/server/server.mjs
```

Abra a porta indicada e confirme que não há flash de cortina nem salto de layout no primeiro paint.

- [ ] **Step 7: Run the full suite**

```bash
npx ng test --no-watch
```

Esperado: os testes de `intro.service.spec.ts` e `intro-overlay.component.spec.ts` passam. A falha pré-existente em `app.spec.ts` (o `<h1>` "Hello") continua e está fora do escopo deste plano.

---

## Refinamento futuro (não implementar agora)

A saída da cortina usa um destino aproximado (canto superior esquerdo). A alternativa FLIP — medir a posição real da logo do navbar e voar exatamente até ela — está registrada no spec como possível melhoria. Só vale a pena se a versão atual não convencer na verificação visual.
