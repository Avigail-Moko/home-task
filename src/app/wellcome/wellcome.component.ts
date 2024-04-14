import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class WellcomeComponent {
  color: string = 'green';
  myForm: FormGroup;
  errorMessage='';


  separatorKeysCodes: number[] = [ENTER, COMMA];
  hobbyCtrl = new FormControl('');
  filteredHobbies: Observable<string[]>;
  hobbies: string[] = [];
  allHobbies: string[] = ['Sport', 'Nature', 'Cooking', 'Music', 'Art'];

  @ViewChild('hobbyInput')
  hobbyInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(private fb:FormBuilder,
    private formBuild: FormBuilder,
    private localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar,
    private router: Router,) {
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
    Address: ['', Validators.required],
    City: ['', Validators.required],
    Country: ['', Validators.required],
  });
  sixthFormGroup = this.formBuild.group({
    Hobbies: ['', Validators.required],
  });
  seventhFormGroup = this.formBuild.group({
    FavoriteColor: ['', Validators.required],
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
  onColorChange(newColor: string) {
    this.color = newColor;
  }

  //reset local storage
  // ngOnInit(){
  //   localStorage.clear();
  // }
  
  saveUserData() {
    const newPersonData = {
      personalDetails: {
        fullName: this.firstFormGroup.value.FullName,
        gender: this.secondFormGroup.value.Gender,
        emailAddress: this.thirdFormGroup.value.EmailAddress,
        birthDate: this.fourthFormGroup.value.BirthDate,
        address: this.fifthFormGroup.value.Address,
        city: this.fifthFormGroup.value.City,
        country: this.fifthFormGroup.value.Country,
        hobbies: this.sixthFormGroup.value.Hobbies,
        favoriteColor: this.color,
        amountOfSeats: this.eighthFormGroup.value.AmountOfSeats,
        motorType: this.ninthFormGroup.value.MotorType,
      }
    };
    this.localStorageService.pushItemToMyArray(newPersonData);

   
    this.clearForm(); 
  }
  
  clearForm() {
    // ניקוי כל שדות הטופס לאחר הוספת הנתונים למערך
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
    this.fourthFormGroup.reset();
    this.fifthFormGroup.reset();
    this.sixthFormGroup.reset();
    this.seventhFormGroup.reset();
    this.eighthFormGroup.reset();
    this.ninthFormGroup.reset();
 
}


openSnackBar(message: string) {
  const snackBarRef = this._snackBar.open(message);
  setTimeout(() => {
    snackBarRef.dismiss();
  }, 7000); 

}




}
