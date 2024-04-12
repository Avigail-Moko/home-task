import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.scss'],
})
export class WellcomeComponent {
  color: string = 'green';
  myForm: FormGroup;
  errorMessage='';
  

  separatorKeysCodes: number[] = [ENTER, COMMA];
  hobbyCtrl = new FormControl('');
  filteredHobbies: Observable<string[]>;
  hobbies: string[] = ['Reading'];
  allHobbies: string[] = ['Sport', 'Nature', 'Cooking', 'Music', 'Art'];

  @ViewChild('hobbyInput')
  hobbyInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(private fb:FormBuilder,private formBuild: FormBuilder,) {
    this.filteredHobbies = this.hobbyCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allHobbies.slice()
      )
    );
    this.myForm=this.fb.group({
      name: [''],
      subject:[''],
      seniority:[''],
      email: [''],
      password: [''],
    })
  }

  firstFormGroup = this.formBuild.group({
    FullName: ['', Validators.required],
  });
  secondFormGroup = this.formBuild.group({
    Gender: ['', Validators.required],
  });
  thirdFormGroup = this.formBuild.group({
    EmailAddress: ['', Validators.required],
  });
  fourthFormGroup = this.formBuild.group({
    BirthDate: ['', Validators.required],
  });
  fifthFormGroup = this.formBuild.group({
    LocationDetails: ['', Validators.required],
  });
  sixthFormGroup = this.formBuild.group({
    Hobbies: ['', Validators.required],
  });
  seventhFormGroup = this.formBuild.group({
    FavorateColor: ['', Validators.required],
  });
  eighthFormGroup = this.formBuild.group({
    AmountOfSeats: ['', Validators.required],
  });
  ninthFormGroup = this.formBuild.group({
    MotorType: ['', Validators.required],
  });

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.hobbies.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.hobbyCtrl.setValue(null);
  }

  remove(hobby: string): void {
    const index = this.hobbies.indexOf(hobby);

    if (index >= 0) {
      this.hobbies.splice(index, 1);

      this.announcer.announce(`Removed ${hobby}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hobbies.push(event.option.viewValue);
    this.hobbyInput.nativeElement.value = '';
    this.hobbyCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHobbies.filter((hobby) =>
      hobby.toLowerCase().includes(filterValue)
    );
  }
  // validation:
  validationMessages = {
    name: [
      { type: 'required', message: 'שם הוא שדה חובה' },
      { type: 'minlength', message: 'שם צריך להכיל לפחות 2 תווים' }
    ],
    email: [
      { type: 'required', message: 'דוא"ל הוא שדה חובה' },
      { type: 'email', message: 'כתובת דואר אלקטרוני אינה תקינה' },
    ],
    subject:[
      { type: 'required', message: 'תחום לימוד הוא שדה חובה' }
    ],
    seniority:[
      { type: 'required', message: 'שנות נסיון הוא שדה חובה' }
    ],
    password:[
      { type: 'required', message: 'סיסמא הוא שדה חובה' },
      { type: 'minlength', message: 'סיסמא צריכה להכיל לפחות 6 תווים' },
    ]
  };
  
  
  hide = true;
  
 
}
