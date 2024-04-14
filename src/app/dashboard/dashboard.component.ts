import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

export interface PeriodicElement {
  FullName: string;
  Gender: number;
  EmailAddress: number;
  BirthDate: string;
  LocationDetails:String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Gender: 1, FullName: 'Hydrogen', EmailAddress: 1.0079, BirthDate: 'H',LocationDetails:'israel'},
  {Gender: 2, FullName: 'Helium', EmailAddress: 4.0026, BirthDate: 'He',LocationDetails:'israel'},
  {Gender: 3, FullName: 'Lithium', EmailAddress: 6.941, BirthDate: 'Li',LocationDetails:'israel'},
  {Gender: 4, FullName: 'Beryllium', EmailAddress: 9.0122, BirthDate: 'Be',LocationDetails:'israel'},
  {Gender: 5, FullName: 'Boron', EmailAddress: 10.811, BirthDate: 'B',LocationDetails:'israel'},
  {Gender: 6, FullName: 'Carbon', EmailAddress: 12.0107, BirthDate: 'C',LocationDetails:'israel'},
  {Gender: 7, FullName: 'Nitrogen', EmailAddress: 14.0067, BirthDate: 'N',LocationDetails:'israel'},
  {Gender: 8, FullName: 'Oxygen', EmailAddress: 15.9994, BirthDate: 'O',LocationDetails:'israel'},
  {Gender: 9, FullName: 'Fluorine', EmailAddress: 18.9984, BirthDate: 'F',LocationDetails:'israel'},
  {Gender: 10, FullName: 'Neon', EmailAddress: 20.1797, BirthDate: 'Ne',LocationDetails:'israel'},
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['Gender', 'FullName', 'EmailAddress', 'BirthDate','LocationDetails'];
  dataSource = ELEMENT_DATA;
  constructor(private localStorage:LocalStorageService){}
  // displayedColumns: string[] = ['Full Name', 'Address', 'Gender', 'Email'];
  // dataSource=this.localStorage.getMyArray();
}
