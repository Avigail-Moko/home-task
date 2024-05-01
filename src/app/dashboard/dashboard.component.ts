import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dataSource: MatTableDataSource<PeriodicElement>;
  displayedColumns: string[] = ['emailAddress'];
  columnsFlags: { [key: string]: boolean } = {
    gender: false,
    birthDate: false,
    hobbies: false,
    favoriteColor: false,
    motorType: false,
    fullName: false,
  };
  counter= 0;

  constructor(private aiCarDealership: AiCarDealershipService) {
    this.dataSource = new MatTableDataSource<PeriodicElement>();
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.aiCarDealership.getMyArray().subscribe((data: PeriodicElement[]) => {
      this.dataSource.data = data;
    });
  }

  toggleColumn(column: string) {
    this.columnsFlags[column] = !this.columnsFlags[column];

    if (this.columnsFlags[column]) {
      this.displayedColumns.push(column);
      this.counter++;
    } else {
      const index = this.displayedColumns.indexOf(column);
      if (index !== -1) {
        this.displayedColumns.splice(index, 1);
        this.counter--;
      }
    }
  }
}
