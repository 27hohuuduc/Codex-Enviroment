import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

type ThemeOption = 'system' | 'light' | 'dark';

@Component({
  selector: 'settings-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dialog class="settings-dialog" [open]="opened()" (close)="handleClose()">
      <form method="dialog" class="dialog-content" (submit)="$event.preventDefault()">
        <header>
          <h2>Thiết lập hiển thị</h2>
          <button type="button" class="close" (click)="setOpened(false)">×</button>
        </header>
        <section>
          <h3>Giao diện</h3>
          <div class="theme-options">
            <label *ngFor="let option of themeOptions">
              <input type="radio" name="theme" [value]="option" [checked]="theme() === option" (change)="changeTheme(option)" />
              <span>{{ getThemeLabel(option) }}</span>
            </label>
          </div>
        </section>
      </form>
    </dialog>
  `,
  styles: [`
    :host {
      display: contents;
    }
    .settings-dialog::backdrop {
      background: rgba(15, 23, 42, 0.35);
    }
    .settings-dialog {
      border: none;
      border-radius: 1rem;
      padding: 0;
      width: min(420px, calc(100vw - 2rem));
      background: var(--surface-elevated);
      color: var(--text-strong);
      box-shadow: 0 20px 60px rgba(15, 23, 42, 0.35);
    }
    .dialog-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header h2 {
      margin: 0;
      font-size: 1.2rem;
    }
    .close {
      border: none;
      background: transparent;
      font-size: 1.8rem;
      line-height: 1;
      cursor: pointer;
      color: var(--text-muted);
    }
    section h3 {
      margin-bottom: 0.75rem;
    }
    .theme-options {
      display: grid;
      gap: 0.75rem;
    }
    label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.6rem 0.75rem;
      border-radius: 0.75rem;
      background: color-mix(in srgb, var(--surface-color) 80%, transparent);
      border: 1px solid color-mix(in srgb, var(--border-color) 60%, transparent);
      cursor: pointer;
    }
    input[type='radio'] {
      accent-color: var(--accent-color);
    }
  `]
})
export class SettingsDialogComponent {
  readonly themeOptions: ThemeOption[] = ['system', 'light', 'dark'];
  private readonly storageKey = 'personal-blog-theme';
  opened = signal(false);
  theme = signal<ThemeOption>('system');

  constructor() {
    if (typeof document !== 'undefined') {
      document.addEventListener('open-settings-dialog', () => this.setOpened(true));
    }

    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(this.storageKey) as ThemeOption | null;
      if (saved && this.themeOptions.includes(saved)) {
        this.theme.set(saved);
      }
      this.applyTheme(this.theme());
    }

    effect(() => {
      const current = this.theme();
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(this.storageKey, current);
      }
      this.applyTheme(current);
    });
  }

  setOpened(value: boolean) {
    this.opened.set(value);
  }

  handleClose() {
    this.setOpened(false);
  }

  changeTheme(option: ThemeOption) {
    this.theme.set(option);
  }

  getThemeLabel(option: ThemeOption) {
    switch (option) {
      case 'system':
        return 'Tự động (theo hệ thống)';
      case 'light':
        return 'Sáng';
      case 'dark':
        return 'Tối';
    }
  }

  private applyTheme(option: ThemeOption) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    const theme = option === 'system' ? (prefersDark ? 'dark' : 'light') : option;
    root.dataset.theme = theme;
  }
}

export default SettingsDialogComponent;
