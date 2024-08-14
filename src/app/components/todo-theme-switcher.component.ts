import { Component, PLATFORM_ID, afterNextRender, effect, inject, signal, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-todo-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="header-theme-btn" (click)="toggleTheme()">
      <img
        [src]="
          '../../assets/images/icon-' +
          (theme() === 'light-mode' ? 'moon' : 'sun') +
          '.svg'
        "
        alt="Icon image to switch theme"
      />
    </button>
  `,
  styles: `
    .header-theme-btn {
      border: none;
      outline: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s;
    }

    .header-theme-btn:hover, .header-theme-btn:focus {
      scale: 1.25;
    }

    .header-theme-btn img {
      display: block;
    }

    @media (max-width: 40em) {
      .header-theme-btn img {
        width: 40px;
      }
    }
  `,
})
export class TodoThemeSwitcherComponent {
  // Find out if you are in the browser or not
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private getItem(key: string) {
    // return (localStorage.getItem(key) as Theme) || 'light-mode';
    // Check localstorage only if you are in the browser
    return this.isBrowser ? localStorage.getItem(key) as Theme : 'light-mode';
  }

  private setItem(key: string, value: any) {
    // localStorage.setItem(key, value);
    // Set in localstorage only if you are in the browser
    if (this.isBrowser) localStorage.setItem(key, value);
  }

  // why tho
  // afterNextRender() {
  //   theme.set(signal<Theme>(this.getItem('theme')));

  // }

  theme = signal<Theme>(this.getItem('theme'));

  constructor(@Inject(DOCUMENT) private document: Document) {
    effect(() => {
      if (this.theme() === 'light-mode') {
        this.document.documentElement.classList.add('light-mode');
        this.document.documentElement.classList.remove('dark-mode');
      }

      if (this.theme() === 'dark-mode') {
        this.document.documentElement.classList.remove('light-mode');
        this.document.documentElement.classList.add('dark-mode');
      }

      this.setItem('theme', this.theme());
    });
    // after render is a thing
    // afterRender(() => { console.log('theme ', localStorage.getItem('theme')) });
  }

  toggleTheme() {
    this.theme.update((theme) =>
      theme === 'dark-mode' ? 'light-mode' : 'dark-mode'
    );
  }
}

type Theme = 'light-mode' | 'dark-mode';
