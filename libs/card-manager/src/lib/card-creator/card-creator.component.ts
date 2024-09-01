import { Component, inject } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { addNewCard } from '@simple-nx/store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-card-creator',
  standalone: true,
  imports: [MatFormField, MatInput, MatButton, MatLabel, ReactiveFormsModule],
  templateUrl: './card-creator.component.html',
  styleUrl: './card-creator.component.scss',
})
export default class CardCreatorComponent {
  store: Store = inject(Store);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  saveCard(form: FormGroup): void {
    // this time only save into store
    // usually, save into database through api call
    this.store.dispatch(addNewCard({ card: { ...form.value } }));
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
