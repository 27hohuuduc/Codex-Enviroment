import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import type { NavGroup } from './types';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="nav-wrapper" [class.nav-scrolled]="scrolled()">
      <div class="nav-inner">
        <a class="brand" [href]="baseHref">My Personal Space</a>
        <nav class="nav-links">
          <ng-container *ngFor="let item of items">
            <div class="nav-item" [class.has-dropdown]="item.pages.length > 1">
              <a class="nav-link" [href]="item.href">{{ item.label }}</a>
              <div class="dropdown" *ngIf="item.pages.length > 1">
                <a *ngFor="let page of item.pages" class="dropdown-item" [href]="page.href">{{ page.title }}</a>
              </div>
            </div>
          </ng-container>
        </nav>
        <button
          class="settings-trigger"
          type="button"
          (click)="openSettings()"
          aria-label="Mở cài đặt"
          title="Cài đặt"
        >
          <span class="sr-only">Cài đặt</span>
          <svg
            class="settings-icon"
            viewBox="0 0 24 24"
            role="presentation"
            aria-hidden="true"
          >
            <path
              d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm9.44 2.19-1.86-.73a7.44 7.44 0 0 0-.35-1.03l.85-1.78a.75.75 0 0 0-.14-.86l-1.52-1.52a.75.75 0 0 0-.86-.14l-1.78.85c-.34-.12-.7-.24-1.03-.35l-.73-1.86A.75.75 0 0 0 13.05 3h-2.1a.75.75 0 0 0-.71.49l-.73 1.86a7.44 7.44 0 0 0-1.03.35l-1.78-.85a.75.75 0 0 0-.86.14L4.32 6.51a.75.75 0 0 0-.14.86l.85 1.78c-.12.34-.24.7-.35 1.03l-1.86.73A.75.75 0 0 0 2 12v2a.75.75 0 0 0 .49.71l1.86.73c.1.35.22.7.35 1.03l-.85 1.78a.75.75 0 0 0 .14.86l1.52 1.52a.75.75 0 0 0 .86.14l1.78-.85c.34.12.7.24 1.03.35l.73 1.86a.75.75 0 0 0 .71.49h2.1a.75.75 0 0 0 .71-.49l.73-1.86c.35-.1.7-.22 1.03-.35l1.78.85a.75.75 0 0 0 .86-.14l1.52-1.52a.75.75 0 0 0 .14-.86l-.85-1.78c.12-.34.24-.7.35-1.03l1.86-.73a.75.75 0 0 0 .49-.71v-2a.75.75 0 0 0-.49-.71ZM20.5 13l-1.66.65a.75.75 0 0 0-.45.45c-.18.51-.36 1.02-.56 1.51a.75.75 0 0 0 .02.6l.76 1.59-.77.77-1.59-.76a.75.75 0 0 0-.6-.02 11.16 11.16 0 0 1-1.51.56.75.75 0 0 0-.45.45L13 20.5h-1.1l-.65-1.66a.75.75 0 0 0-.45-.45 11.16 11.16 0 0 1-1.51-.56.75.75 0 0 0-.6.02l-1.59.76-.77-.77.76-1.59a.75.75 0 0 0 .02-.6 11.16 11.16 0 0 1-.56-1.51.75.75 0 0 0-.45-.45L3.5 13v-1.1l1.66-.65a.75.75 0 0 0 .45-.45c.18-.51.36-1.02.56-1.51a.75.75 0 0 0-.02-.6l-.76-1.59.77-.77 1.59.76a.75.75 0 0 0 .6.02c.49-.2 1-.38 1.51-.56a.75.75 0 0 0 .45-.45L11 3.5h1.1l.65 1.66a.75.75 0 0 0 .45.45c.51.18 1.02.36 1.51.56a.75.75 0 0 0 .6-.02l1.59-.76.77.77-.76 1.59a.75.75 0 0 0-.02.6c.2.49.38 1 .56 1.51a.75.75 0 0 0 .45.45l1.66.65V13Z"
            />
          </svg>
        </button>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: contents;
    }
    .nav-wrapper {
      position: sticky;
      top: 0;
      backdrop-filter: blur(12px);
      background: color-mix(in srgb, var(--surface-color) 75%, transparent);
      border-bottom: 1px solid color-mix(in srgb, var(--border-color) 60%, transparent);
      z-index: 30;
      transition: box-shadow 0.2s ease;
    }
    .nav-wrapper.nav-scrolled {
      box-shadow: 0 2px 16px rgba(0,0,0,0.08);
    }
    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      padding: 0.75rem 2rem;
      max-width: 1200px;
    }
    .brand {
      font-weight: 700;
      color: var(--text-strong);
      text-decoration: none;
      font-size: 1.05rem;
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    .nav-item {
      position: relative;
    }
    .nav-link {
      font-weight: 500;
      color: var(--text-muted);
      text-decoration: none;
      padding: 0.35rem 0;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }
    .nav-link:hover {
      color: var(--text-strong);
    }
    .nav-item.has-dropdown:hover .dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      background: var(--surface-elevated);
      border-radius: 0.75rem;
      padding: 0.75rem;
      box-shadow: 0 12px 32px rgba(15,23,42,0.18);
      display: grid;
      gap: 0.35rem;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.15s ease;
      min-width: 200px;
    }
    .dropdown-item {
      display: block;
      padding: 0.45rem 0.5rem;
      border-radius: 0.5rem;
      text-decoration: none;
      color: var(--text-muted);
    }
    .dropdown-item:hover {
      background: color-mix(in srgb, var(--accent-color) 18%, transparent);
      color: var(--text-strong);
    }
    .settings-trigger {
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0.35rem;
      border-radius: 0.65rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease, background-color 0.2s ease;
    }
    .settings-trigger:hover,
    .settings-trigger:focus-visible {
      color: var(--text-strong);
      background: color-mix(in srgb, var(--accent-color) 12%, transparent);
      outline: none;
    }
    .settings-icon {
      width: 1.5rem;
      height: 1.5rem;
      fill: currentColor;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    @media (max-width: 960px) {
      .nav-links {
        display: none;
      }
    }
  `]
})
export class NavBarComponent {
  @Input({ required: true }) items: NavGroup[] = [];
  @Input() baseHref = '/';

  private scrolledState = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.scrolledState.set(window.scrollY > 12);
      });
    }
  }

  scrolled() {
    return this.scrolledState();
  }

  openSettings() {
    document.dispatchEvent(new CustomEvent('open-settings-dialog'));
  }
}

export default NavBarComponent;
