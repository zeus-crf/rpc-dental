import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ScrollCueComponent } from './scroll-cue.component';
import { IntroService } from '../../services/intro.service';

/** Dublê que deixa o teste controlar quando a cortina "termina". */
class IntroServiceStub {
  readonly contentReleased = signal(false);
  finish(): void {
    this.contentReleased.set(true);
  }
}

function setScrollY(value: number): void {
  Object.defineProperty(window, 'scrollY', { value, configurable: true });
}

describe('ScrollCueComponent', () => {
  let intro: IntroServiceStub;

  beforeEach(async () => {
    intro = new IntroServiceStub();
    setScrollY(0);
    await TestBed.configureTestingModule({
      imports: [ScrollCueComponent],
      providers: [{ provide: IntroService, useValue: intro }],
    }).compileComponents();
  });

  function render() {
    const fixture = TestBed.createComponent(ScrollCueComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('fica escondida enquanto a cortina não termina', () => {
    const fixture = render();
    expect(fixture.nativeElement.querySelector('.scroll-cue')).toBeNull();
  });

  it('aparece no DOM quando a cortina termina', () => {
    const fixture = render();
    intro.finish();
    fixture.detectChanges();

    const cue = fixture.nativeElement.querySelector('.scroll-cue');
    expect(cue).not.toBeNull();
    expect(cue.textContent).toContain('Role para explorar');
  });

  it('some ao rolar e não volta', () => {
    const fixture = render();
    intro.finish();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.scroll-cue')).not.toBeNull();

    setScrollY(200);
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.scroll-cue')).toBeNull();

    setScrollY(0);
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.scroll-cue')).toBeNull();
  });

  it('não aparece se o usuário rolou durante a cortina', () => {
    const fixture = render();

    setScrollY(500);
    window.dispatchEvent(new Event('scroll'));
    intro.finish();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.scroll-cue')).toBeNull();
  });

  it('ignora um scroll pequeno demais', () => {
    const fixture = render();
    intro.finish();
    fixture.detectChanges();

    setScrollY(20);
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.scroll-cue')).not.toBeNull();
  });
});
