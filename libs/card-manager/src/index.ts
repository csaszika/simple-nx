import { Routes } from '@angular/router';

export * from './lib';

export default [
  {
    path: 'list',
    loadComponent: () => import('./lib/card-manager/card-manager.component'),
  },
  {
    path: 'create',
    loadComponent: () => import('./lib/card-creator/card-creator.component'),
  },
  { path: '', pathMatch: 'full', redirectTo: 'list' },
] as Routes;
