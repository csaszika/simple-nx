import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import {
  Component,
  inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import {
  Event as NavigationEvent,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { debounceTime, filter, map, share } from 'rxjs/operators';
import { MenuItem } from '../types/menu-item.interface';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { logout } from '@simple-nx/store';

@Component({
  standalone: true,
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatNavList,
    MatToolbar,
    RouterLink,
    AsyncPipe,
    MatListItem,
    MatIconButton,
    MatButton,
    NgClass,
    RouterOutlet,
    NgForOf,
    NgIf,
    MatIcon,
  ],
})
export class MainNavComponent implements OnInit, OnDestroy {
  store: Store = inject(Store);
  menuItems: InputSignal<MenuItem[]> = input<MenuItem[]>([]);

  @ViewChild(MatSidenav, { static: true }) drawer!: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      debounceTime(1),
      map((result: BreakpointState) => result.matches),
      share()
    );

  navigationEnd$: Observable<NavigationEvent> = this.router.events.pipe(
    filter((event: NavigationEvent) => event instanceof NavigationEnd)
  );

  private readonly subsciptions = new Subscription();

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router
  ) {}

  /* istanbul ignore next */
  ngOnInit(): void {
    this.subsciptions.add(
      combineLatest([this.isHandset$, this.navigationEnd$])
        .pipe(
          map(
            ([isHandset, _]: [boolean, NavigationEvent]): boolean => isHandset
          ),
          filter((isHandset: boolean) => isHandset)
        )
        .subscribe(() => {
          this.drawer.close();
        })
    );
  }

  ngOnDestroy(): void {
    this.subsciptions.unsubscribe();
  }

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['../login']);
  }
}
