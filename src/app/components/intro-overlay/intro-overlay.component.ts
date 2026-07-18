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
