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
