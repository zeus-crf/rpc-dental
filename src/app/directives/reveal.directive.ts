import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  afterNextRender,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective {
  /** Optional stagger delay in milliseconds. */
  @Input() revealDelay = 0;

  private host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  @HostBinding('class.reveal-init') readonly init = true;

  constructor() {
    afterNextRender(() => {
      // Inline hosts (bare component elements) ignore transform — promote them
      // to block so the slide works, without disturbing grid/flex/block elements.
      if (getComputedStyle(this.host).display === 'inline') {
        this.host.style.display = 'block';
      }

      const delay = Number(this.revealDelay) || 0;
      if (delay) {
        this.host.style.animationDelay = `${delay}ms`;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            this.host.classList.add('reveal-in');
            observer.disconnect();
          }
        },
        { threshold: 0, rootMargin: '0px 0px -80px 0px' }
      );
      observer.observe(this.host);
    });
  }
}
