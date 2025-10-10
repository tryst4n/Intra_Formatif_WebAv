import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, FormGroup, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AppComponent {
  title = 'reactive.form';
  formGroup: FormGroup;
  formData?: Data;
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group(
      {
        nom: ['', [Validators.required]],
        numRue: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
        postalcode: ['', [Validators.pattern("^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$")]],
        commentaire: ['']
      },
      { validators: commentaireValidator() }
    );

    this.formGroup.valueChanges.subscribe((v) => (this.formData = v));
  }
}

interface Data {
  courriel?: string | null;
  nom?: string | null;
}

export function commentaireValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const commentaire = control.get('commentaire');
    const nom = control.get('nom');
    // On regarde si le champ est rempli avant de faire la validation
    if (!commentaire?.value || !nom?.value) {
      return null;
    }

    const commentaireValue = commentaire.value.toLowerCase();
    const nomValue = nom.value.toLowerCase();

    const wordCount = commentaireValue.split(' ').filter((word: string) => word !== '').length;
    //check if commentaire is more than 10 words
    const isWordCountValid = wordCount >= 10;
    // Check commentaire does NOT include nom
    const doesNotIncludeNom = !commentaireValue.includes(nomValue);

    console.log('commentaire:', commentaire?.value);
    console.log('nom:', nom?.value);
    console.log('wordCount:', wordCount);
    console.log('iswordcountValid', isWordCountValid);
    console.log('doesNotIncludeNom:', doesNotIncludeNom);
    if (!isWordCountValid) {
      commentaire.setErrors({ ...commentaire.errors, tooShort: true })
    };
    if (!doesNotIncludeNom) {
      commentaire.setErrors({ ...commentaire.errors, includesName: true })
    };

    return isWordCountValid && doesNotIncludeNom ? null : { commentaireInvalid: true };
  }
};


