import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ScrollCueComponent } from './scroll-cue.component';
import { IntroService } from '../../services/intro.service';
import { ScrollStateService } from '../../services/scroll-state.service';

class IntroServiceStub {
  readonly contentReleased = signal(false);
  finish(): void {
    this.contentReleased.set(true);
  }
}

class ScrollStateStub {
  readonly scrolled = signal(false);
  scroll(): void {
    this.scrolled.set(true);
  }
}

describe('ScrollCueComponent', () => {
  let intro: IntroServiceStub;
  let scroll: ScrollStateStub;

  beforeEach(async () => {
    intro = new IntroServiceStub();
    scroll = new ScrollStateStub();
    await TestBed.configureTestingModule({
      imports: [ScrollCueComponent],
      providers: [
        { provide: IntroService, useValue: intro },
        { provide: ScrollStateService, useValue: scroll },
      ],
    }).compileComponents();
  });

  function render() {
    const fixture = TestBed.createComponent(ScrollCueComponent);
    fixture.detectChanges();
    return fixture;
  }

  function cue(fixture: ReturnType<typeof render>): HTMLElement | null {
    return fixture.nativeElement.querySelector('.scroll-cue');
  }

  it('fica escondida enquanto a cortina não termina', () => {
    expect(cue(render())).toBeNull();
  });

  it('aparece quando a cortina termina', () => {
    const fixture = render();
    intro.finish();
    fixture.detectChanges();

    expect(cue(fixture)).not.toBeNull();
    expect(cue(fixture)!.textContent).toContain('Role para explorar');
  });

  it('some quando o usuário rola', () => {
    const fixture = render();
    intro.finish();
    fixture.detectChanges();
    expect(cue(fixture)).not.toBeNull();

    scroll.scroll();
    fixture.detectChanges();
    expect(cue(fixture)).toBeNull();
  });

  it('não aparece se o usuário rolou durante a cortina', () => {
    const fixture = render();
    scroll.scroll();
    intro.finish();
    fixture.detectChanges();

    expect(cue(fixture)).toBeNull();
  });
});
