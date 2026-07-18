# Animação de entrada + textura do hero

**Data:** 2026-07-18
**Branch:** components

## Objetivo

Dar ao site uma entrada com identidade de marca: uma cortina que forma o wordmark
"RPC Dental" letra a letra e se retira para revelar a página, e uma textura sutil
no fundo do hero que acompanha a chegada do texto. Ao sair, a cortina entrega a
página para as animações de scroll já existentes, sem salto entre as duas.

## Escopo

Dentro do escopo:

- Componente de intro (cortina) com formação do wordmark.
- Serviço que decide se a cortina roda e quando o conteúdo pode se revelar.
- Coordenação com o `RevealDirective` existente, para o conteúdo não animar
  escondido atrás da cortina.
- Camada de textura no fundo do hero (grid de pontos + grão).
- Keyframes novos em `styles.css`.

Fora do escopo:

- Alterar a logo do navbar ou do hero em si.
- Transições entre rotas.
- Qualquer mudança de conteúdo, copy ou layout.
- Reescrever o mecanismo de reveal por scroll — ele já existia e só ganhou a
  espera pelo sinal da cortina.

## Arquitetura

Quatro peças. O hero não sabe que a intro existe; a intro não sabe o que há na
página. O acoplamento é temporal e passa inteiro pelo `IntroService`.

| Peça | Caminho | Responsabilidade |
|---|---|---|
| `IntroOverlayComponent` | `src/app/components/intro-overlay/intro-overlay.component.ts` | Renderiza a cortina e a animação do wordmark; emite `done` ao terminar |
| `IntroService` | `src/app/services/intro.service.ts` | Decide se a cortina roda e sinaliza quando o conteúdo pode se revelar |
| `RevealDirective` | `src/app/directives/reveal.directive.ts` | Revela seções conforme o scroll, aguardando o sinal do `IntroService` |
| Camada de textura | `src/app/components/hero/hero.component.ts` + `src/styles.css` | Grid de pontos e grão atrás do conteúdo do hero |

### Interfaces

`IntroService`

- `shouldRun(): boolean` — verdadeiro se estamos no browser
  (`isPlatformBrowser`) e `matchMedia('(prefers-reduced-motion: reduce)')` não
  casa. A cortina roda em toda carga de página.
- `contentMayReveal: Promise<void>` — resolve quando o conteúdo pode começar a
  se revelar: ao fim da cortina, ou já no construtor se `shouldRun()` for falso.
- `notifyIntroDone(): void` — resolve `contentMayReveal`.

`IntroOverlayComponent`

- Sem inputs.
- Output `done: EventEmitter<void>`, emitido quando o overlay termina de sair.
- Aplica `overflow: hidden` no `<body>` enquanto ativo e remove ao sair.

`RevealDirective`

- Input opcional `revealDelay` (ms) para escalonar seções vizinhas.
- Aguarda `contentMayReveal` antes de instalar o `IntersectionObserver`.

A `landing-page` renderiza `<app-intro-overlay>` sob `@if (introActive())`,
inicializado com `introService.shouldRun()`, e no `done` desliga o sinal e chama
`notifyIntroDone()`.

### Por que o conteúdo espera a cortina

O `IntersectionObserver` dispara na montagem da página, e a cortina é
`position: fixed`, que não altera o cálculo de interseção. Sem coordenação, hero,
marquee e services gastavam sua animação de entrada escondidos atrás da cortina e
apareciam prontos quando ela saía — o conteúdo surgia "do nada".

Por isso o `RevealDirective` aguarda `contentMayReveal`. Quando a cortina não vai
rodar (servidor ou `prefers-reduced-motion`), a promise já nasce resolvida e o
comportamento é idêntico ao de antes da intro existir.

## Timeline da intro

Overlay `fixed inset-0`, fundo `--color-brand-bg`, `z-[100]`.

| Tempo | Evento |
|---|---|
| 0.00s | Círculo vermelho da logo escala de 0.6 a 1 com overshoot |
| 0.25s | Dente branco se desenha via `stroke-dashoffset` e preenche |
| 0.55s | Letras de "RPC " sobem uma a uma, 45ms de intervalo |
| 0.75s | Letras de "Dental" sobem, em `brand-red` |
| 0.95s | "ODONTOLOGIA" entra com fade e `letter-spacing` abrindo |
| 1.25s | Bloco encolhe para ~0.45 e desliza em direção ao navbar; overlay faz fade-out |
| 1.60s | Overlay removido do DOM, `done` emitido, conteúdo liberado para revelar |

Cada letra é um `<span class="intro-letter">` gerado por `@for` sobre o texto,
com `animation-delay` calculado a partir do índice. A fonte Plus Jakarta Sans
permanece viva — não há conversão para paths SVG.

A partir de 1.60s o conteúdo entra: hero sobe primeiro, `service-marquee` 120ms
depois, e as demais seções revelam conforme o scroll.

### Saída do overlay

A versão implementada é a **robusta**: o bloco desliza para um destino
aproximado (canto superior esquerdo, alinhado à margem do navbar) enquanto o
overlay faz fade-out, de modo que a costura fica coberta pela opacidade.

A alternativa **FLIP** — medir a posição real da logo do navbar e voar
exatamente até ela — fica registrada como possível refinamento futuro.

## Textura do hero

Dois elementos absolutos atrás do conteúdo, dentro do `<section>` do hero:

- **Grid de pontos** — `radial-gradient(circle, var(--color-brand-red) 1px,
  transparent 1px)` com `background-size: 22px 22px`, `opacity: 0.12`, e
  `mask-image` radial centrada na coluna do texto (denso no centro, zero nas
  bordas). A opacidade subiu de 0.07 para 0.12 na verificação visual: a 0.07 a
  textura era imperceptível sobre o bege.
- **Grão** — SVG `feTurbulence` inline como data-URI, `opacity: 0.035`,
  `mix-blend-mode: multiply`. Estático.

Ambos entram com `opacity: 0 → 1` e `scale(1.04) → 1` em 900ms, iniciando 80ms
depois do título do hero — a textura acompanha o texto em vez de anunciá-lo.

## Comportamento sem animação

Quando `IntroService.shouldRun()` retorna `false`, a página renderiza direto, sem
overlay e sem flash, e `contentMayReveal` já nasce resolvida — os reveals de
scroll funcionam normalmente. O SSR nunca emite o overlay, então o HTML servido
já é a página final.

Os keyframes novos (`intro-*`, `texture-grid-in`, `texture-grain-in`) entram no
bloco `@media (prefers-reduced-motion: reduce)` já existente em `styles.css`,
junto das regras atuais.

## Tratamento de erros

A intro é decorativa e nunca pode bloquear o site: um `setTimeout` de segurança
em 3s remove o overlay e emite `done` caso algum `animationend` não dispare.
Como `done` também libera `contentMayReveal`, essa rede de segurança impede que
uma falha na cortina deixe a página inteira invisível.

## Testes

- `IntroService`: plataforma servidor, reduced-motion e o caminho feliz; mais o
  ciclo de `contentMayReveal` (segura enquanto a cortina roda, libera no
  `notifyIntroDone`, libera de imediato quando a cortina não vai rodar).
- `IntroOverlayComponent`: emite `done`; renderiza um `<span>` por letra do
  wordmark; restaura `overflow` do `<body>` ao sair.
- Verificação visual no navegador, com o dev server, para a timeline e a textura.

**Nota sobre o ambiente de teste:** o jsdom do runner não implementa
`window.matchMedia`. Os specs fornecem o stub; o serviço não carrega guarda
defensiva para isso, já que navegadores reais sempre têm a API.

## Histórico de revisões

**2026-07-18 — cortina roda em toda carga.** A versão original rodava a cortina
uma vez por sessão, via uma chave `rpc-intro` no `sessionStorage`. Na prática
isso inviabilizou o desenvolvimento (depois da primeira carga nenhum reload
mostrava a animação) e o comportamento desejado passou a ser rodar sempre. O
guard de sessão e o `markSeen()` foram removidos. O bloqueio por
`prefers-reduced-motion` permanece: é acessibilidade, não preferência estética.

**2026-07-18 — coordenação com o reveal de scroll.** Descoberto em uso que o
conteúdo acima da dobra animava atrás da cortina. Adicionado
`contentMayReveal`, e `appReveal` no `app-principles`, que era a única seção
sem reveal.
