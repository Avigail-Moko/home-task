import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { AiCarDealershipService } from '../ai-car-dealership.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class WellcomeComponent {
  maxDate = new Date();
  color: string = '';
  flag: boolean = false;
  errorMessage = '';
  visitorsCounter = 0;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hobbyCtrl = new FormControl('');
  filteredHobbies: Observable<string[]>;
  hobbies: string[] = [];
  allHobbies: string[] = ['Sport', 'Nature', 'Cooking', 'Music', 'Art'];

  @ViewChild('hobbyInput')
  hobbyInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(
    private formBuild: FormBuilder,
    private aiCarService: AiCarDealershipService,
    private _snackBar: MatSnackBar,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.filteredHobbies = this.hobbyCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allHobbies.slice()
      )
    );
  }

  firstFormGroup = this.formBuild.group({
    FullName: ['', Validators.required],
  });
  secondFormGroup = this.formBuild.group({
    Gender: ['', Validators.required],
  });
  thirdFormGroup = this.formBuild.group({
    EmailAddress: ['', Validators.email],
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
    Hobbies: [this.formBuild.array([], Validators.required)],
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

  remove(hobby: string): void {
    const index = this.hobbies.indexOf(hobby);

    if (index >= 0) {
      this.hobbies.splice(index, 1);

      this.announcer.announce(`Removed ${hobby}`);
      this.sixthFormGroup.get('Hobbies')?.setValue(this.hobbies);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hobbies.push(event.option.viewValue);
    this.hobbyInput.nativeElement.value = '';
    this.hobbyCtrl.setValue(null);
    this.sixthFormGroup.get('Hobbies')?.setValue(this.hobbies);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHobbies.filter((hobby) =>
      hobby.toLowerCase().includes(filterValue)
    );
  }
  onColorChange(color: string) {
    this.seventhFormGroup.get('FavoriteColor')?.setValue(color);
    this.renderer.setStyle(
      this.el.nativeElement.querySelector('.car__body'),
      'fill',
      color
    );
  }
  formatDate(date: any): string {
    return date.toLocaleDateString();
  }
  saveUserData() {
    const newPersonData = {
      fullName: this.firstFormGroup.value.FullName,
      gender: this.secondFormGroup.value.Gender,
      emailAddress: this.thirdFormGroup.value.EmailAddress,
      birthDate: this.formatDate(this.fourthFormGroup.value.BirthDate),
      address: this.fifthFormGroup.value.Address,
      city: this.fifthFormGroup.value.City,
      country: this.fifthFormGroup.value.Country,
      hobbies: this.sixthFormGroup.value.Hobbies,
      favoriteColor: this.seventhFormGroup.value.FavoriteColor,
      amountOfSeats: this.eighthFormGroup.value.AmountOfSeats,
      motorType: this.ninthFormGroup.value.MotorType,
    };
    this.aiCarService.pushItemToMyArray(newPersonData);
    sessionStorage.setItem('reload', 'reload');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      window.location.reload();
    }, 600);
  }

  ngOnInit() {
    sessionStorage.removeItem('isadmin');
    if ('reload' in sessionStorage) {
      const snackBarRef = this._snackBar.open(
        'Thank you very much! Your request has been submitted, and an email with the perfect match will be sent to you shortly.'
      );
      setTimeout(() => {
        snackBarRef.dismiss();
      }, 7000);
      sessionStorage.removeItem('reload');
    }
  }

  motorSelect() {
    this.flag = true;
  }
}
