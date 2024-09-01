import { Route } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { provideCardsStoreConfiguration } from '@simple-nx/store';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'card-manager',
        loadChildren: () => import('@simple-nx/card-manager'),
        providers: [provideCardsStoreConfiguration()],
      },
      { path: '', pathMatch: 'full', redirectTo: 'card-manager' },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: 'card-manager',
  // },
];
