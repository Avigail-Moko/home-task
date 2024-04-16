import { Component } from '@angular/core';
import { AiCarDealershipService } from '../ai-car-dealership.service';
import { MatTableDataSource } from '@angular/material/table';
import { toArray } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  displayedColumns: string[] = [
    'fullName',
    'gender',
    'emailAddress',
    'birthDate',
    'hobbies',
    'favoriteColor',
    'motorType'
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private aiCarService: AiCarDealershipService,
    // private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Load user data from service
    // this.dataSource.data = this.aiCarService.getMyArray();
      this.aiCarService.getMyArray().pipe(
      toArray()
    ).subscribe(data => {
      this.dataSource.data = data;
    });
  }
  // ngOnInit(){
  //   // this.dataSource.data = this.aiCarDealership.getMyArray();

    // this.aiCarDealership.getMyArray().subscribe(data => {
    //   this.dataSource.data = data as any [];
    //   console.log(this.dataSource.data)
    // });
  //   this.aiCarDealership.getMyArray().pipe(
  //     toArray()
  //   ).subscribe(data => {
  //     this.dataSource.data = data;
    // });
  

  // }

  
}
