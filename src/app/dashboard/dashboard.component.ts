import { Component } from '@angular/core';
import { AiCarDealershipService } from '../ai-car-dealership.service';

export interface PeriodicElement {
  fullName: string;
  emailAddress: string;
  gender: string;
  birthDate: Date;
  hobbies: any;
  favoriteColor: any;
  motorType: any;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements PeriodicElement {
  fullName!: any;
  emailAddress!: any;
  gender!: any;
  birthDate!: any;
  hobbies!: any;
  favoriteColor!: any;
  motorType!: any;
  genderFlag: boolean = false;
  birthDateFlag: boolean = false;
  hobbiesFlag: boolean = false;
  favoriteColorFlag: boolean = false;
  motorTypeFlag: boolean = false;
  fullNameFlag: boolean = false;
  counter = 0;
  isDisabled: boolean = true;

  constructor(private aiCarDealership: AiCarDealershipService) {}

  ngOnInit() {
    this.aiCarDealership.getMyArray().subscribe((data: any[]) => {
      data.forEach((person) => {
        ELEMENT_DATA.push(person);
      });
    });
  }

  displayedColumns: string[] = ['emailAddress'];
  dataSource = ELEMENT_DATA;

  genderTo() {
    this.genderFlag = !this.genderFlag;
    if (this.genderFlag) {
      this.displayedColumns.push('gender');
      this.counter++;
    } else {
      const index = this.displayedColumns.indexOf('gender');
      if (index !== -1) {
        this.displayedColumns.splice(index, 1);
        this.counter--;
      }
    }
  }
  birthDateTo() {
    this.birthDateFlag = !this.birthDateFlag;
    if (this.birthDateFlag) {
      this.counter++;
      this.displayedColumns.push('birthDate');
    } else {
      const index = this.displayedColumns.indexOf('birthDate');
      if (index !== -1) {
        this.displayedColumns.splice(index, 1);
        this.counter--;
      }
    }
  }
  hobbiesTo() {
    this.hobbiesFlag = !this.hobbiesFlag;
    if (this.hobbiesFlag) {
      this.counter++;
      this.displayedColumns.push('hobbies');
    } else {
      const index = this.displayedColumns.indexOf('hobbies');
      if (index !== -1) {
        this.displayedColumns.splice(index, 1);
        this.counter--;
      }
    }
  }
  favoriteColorTo() {
    this.favoriteColorFlag = !this.favoriteColorFlag;
    if (this.favoriteColorFlag) {
      this.displayedColumns.push('favoriteColor');
      this.counter++;
    } else {
      const index = this.displayedColumns.indexOf('favoriteColor');
      if (index !== -1) {
        this.displayedColumns.splice(index, 1);
        this.counter--;
      }
    }
  }
  motorTypeTo() {
    this.motorTypeFlag = !this.motorTypeFlag;
    if (this.motorTypeFlag) {
      this.displayedColumns.push('motorType');
      this.counter++;
    } else {
      const index = this.displayedColumns.indexOf('motorType');
      if (index !== -1) {
        this.displayedColumns.splice(index, 1);
        this.counter--;
      }
    }
  }
  fullNameTo() {
    this.fullNameFlag = !this.fullNameFlag;
    if (this.fullNameFlag) {
      this.displayedColumns.push('fullName');
      this.counter++;
    } else {
      const index = this.displayedColumns.indexOf('fullName');
      if (index !== -1) {
        this.displayedColumns.splice(index, 1);
        this.counter--;
      }
    }
  }
}
