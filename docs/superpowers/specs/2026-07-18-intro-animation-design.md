# Animação de entrada + textura do hero

**Data:** 2026-07-18
**Branch:** components

## Objetivo

Dar ao site uma entrada com identidade de marca: uma cortina que forma o wordmark
"RPC Dental" letra a letra e se retira para revelar a página, e uma textura sutil
no fundo do hero que acompanha a chegada do texto.

## Escopo

Dentro do escopo:

- Componente de intro (cortina) com formação do wordmark.
- Serviço que decide se a intro roda.
- Camada de textura no fundo do hero (grid de pontos + grão).
- Keyframes e tokens de animação novos em `styles.css`.

Fora do escopo:

- Alterar a logo do navbar ou do hero em si.
- Transições entre rotas.
- Qualquer mudança de conteúdo, copy ou layout.

## Arquitetura

Três peças independentes. O hero não sabe que a intro existe; a intro não sabe o
que há na página. O único acoplamento é temporal, mediado pela `landing-page`.

| Peça | Caminho | Responsabilidade |
|---|---|---|
| `IntroOverlayComponent` | `src/app/components/intro-overlay/intro-overlay.component.ts` | Renderiza a cortina e a animação do wordmark; emite `done` ao terminar |
| `IntroService` | `src/app/services/intro.service.ts` | Decide se a intro deve rodar; marca a sessão como já vista |
| Camada de textura | `src/app/components/hero/hero.component.ts` + `src/styles.css` | Grid de pontos e grão atrás do conteúdo do hero |

### Interfaces

`IntroService`

- `shouldRun(): boolean` — verdadeiro apenas se todas forem verdadeiras:
  estamos no browser (`isPlatformBrowser`), `sessionStorage` não contém a chave
  `rpc-intro`, e `matchMedia('(prefers-reduced-motion: reduce)')` não casa.
  Qualquer exceção ao ler `sessionStorage` (modo privado) é capturada e retorna
  `false`.
- `markSeen(): void` — grava a chave `rpc-intro`. Exceções são engolidas.

`IntroOverlayComponent`

- Sem inputs.
- Output `done: EventEmitter<void>`, emitido quando o overlay termina de sair.
- Aplica `overflow: hidden` no `<body>` enquanto ativo e remove ao sair.

A `landing-page` renderiza `<app-intro-overlay>` sob `@if (introActive())`,
inicializado com `introService.shouldRun()`, e chama `markSeen()` no `done`.

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
| 1.60s | Overlay removido do DOM, `done` emitido |

Cada letra é um `<span class="intro-letter">` gerado por `@for` sobre o texto,
com `animation-delay` calculado a partir do índice. A fonte Plus Jakarta Sans
permanece viva — não há conversão para paths SVG.

### Saída do overlay

A versão a implementar é a **robusta**: o bloco desliza para um destino
aproximado (canto superior esquerdo, alinhado à margem do navbar) enquanto o
overlay faz fade-out, de modo que a costura fica coberta pela opacidade.

A alternativa **FLIP** — medir a posição real da logo do navbar e voar
exatamente até ela — fica registrada como possível refinamento futuro. Não será
implementada nesta rodada; a decisão de subir para ela depende de avaliação
visual no navegador após a versão robusta estar funcionando.

## Textura do hero

Dois elementos absolutos atrás do conteúdo, dentro do `<section>` do hero:

- **Grid de pontos** — `radial-gradient(circle, var(--color-brand-red) 1px,
  transparent 1px)` com `background-size: 22px 22px`, `opacity: 0.07`, e
  `mask-image` radial centrada na coluna do texto (denso no centro, zero nas
  bordas).
- **Grão** — SVG `feTurbulence` inline como data-URI, `opacity: 0.035`,
  `mix-blend-mode: multiply`. Estático.

Ambos entram com `opacity: 0 → 1` e `scale(1.04) → 1` em 900ms, iniciando 80ms
depois do título do hero — a textura acompanha o texto em vez de anunciá-lo.

## Comportamento sem animação

Quando `IntroService.shouldRun()` retorna `false`, a página renderiza direto, sem
overlay e sem flash. O SSR nunca emite o overlay, então o HTML servido já é a
página final.

Os keyframes novos (`intro-*`, `texture-in`) entram no bloco
`@media (prefers-reduced-motion: reduce)` já existente em `styles.css`, junto das
regras atuais.

## Tratamento de erros

A intro é decorativa e nunca pode bloquear o site:

- Falha ao acessar `sessionStorage` → intro não roda.
- `setTimeout` de segurança em 3s remove o overlay e emite `done` caso algum
  `animationend` não dispare.

## Testes

- `IntroService`: as três condições de bloqueio (plataforma servidor, sessão já
  vista, reduced-motion) e o caminho feliz.
- `IntroOverlayComponent`: emite `done`; renderiza um `<span>` por letra do
  wordmark; restaura `overflow` do `<body>` ao sair.
- Verificação visual no navegador, com o dev server, para a timeline e a textura.
