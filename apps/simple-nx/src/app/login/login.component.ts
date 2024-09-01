import { Component, inject } from '@angular/core';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '@simple-nx/store';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    ReactiveFormsModule,
    MatHint,
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  store: Store = inject(Store);
  router: Router = inject(Router);

  form: FormGroup = new FormGroup({
    username: new FormControl('user', [
      Validators.required,
      Validators.pattern(/^(user|admin)$/),
    ]),
    password: new FormControl('123', [Validators.required]),
  });

  onLogin(form: FormGroup): void {
    this.store.dispatch(login({ ...form.value }));
    this.router.navigate(['../']);
  }
}
