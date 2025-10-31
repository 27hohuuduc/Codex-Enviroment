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
        <a class="brand" href="./">My Personal Space</a>
        <nav class="nav-links">
          <ng-container *ngFor="let item of items">
            <div class="nav-item" [class.has-dropdown]="item.pages.length > 1">
              <a class="nav-link" [href]="item.href">{{ item.label }}</a>
              <div class="dropdown" *ngIf="item.pages.length > 1">
                <a *ngFor="let page of item.pages" class="dropdown-item" [href]="'./' + page.slug">{{ page.title }}</a>
              </div>
            </div>
          </ng-container>
        </nav>
        <button class="settings-trigger" type="button" (click)="openSettings()">
          <span class="material-symbol">settings</span>
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
      font-size: 1.3rem;
      cursor: pointer;
      padding: 0.25rem;
    }
    .settings-trigger:hover {
      color: var(--text-strong);
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
