import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MenuItem } from './types/menu-item.interface';
import { MainNavComponent } from './main-nav/main-nav.component';

@Component({
  standalone: true,
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  imports: [MainNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  menuItems: MenuItem[] = [{ url: `/card-manager/list`, text: 'Card Manager' }];
}
