import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss'],
})
export class DataChartComponent {
  constructor(private localStorageService: LocalStorageService) {}
  myArray: any[] = [];
  maleCount = 0;
  femaleCount = 0;

  ngOnInit() {
    this.countGenders();
  }

  countGenders(): void {
    this.localStorageService.getMyArray().subscribe((data: any[]) => {
      data.forEach((person) => {
        console.log('gender:', person.gender);
        if (person.gender === 'Male') {
          this.maleCount++;
        } else if (person.gender === 'Female') {
          this.femaleCount++;
        }
      });
      this.myArray = data;
      this.updateChartData();
    });
  }

  updateChartData(): void {
    this.columnChartOptions.data[0].dataPoints = [
      { label: 'men', y: this.maleCount },
      { label: 'women', y: this.femaleCount },
    ];
  }

  columnChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Angular Column Chart in Material UI Tabs',
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: 'column',
        // indexLabel:'{label}:{y}',
        dataPoints: [
          { label: 'loading', y: 0 },
        ],
      },
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: 'column',
        // indexLabel:'{label}:{y}',
        dataPoints: [
          // { label: 'men', y: this.maleCount },
          // { label: 'women', y: this.femaleCount },
        ],
      },
    ],
  };

  pieChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Most picked engine type by Gender',
    },
    theme: 'light2', // "light1", "dark1", "dark2"
    showInLegend: true,
    toolTipContent: '{name}: <strong>{y}%</strong>',
    indexLabel: '{name} - {y}%',
    data: [
      {
        type: 'pie',
        dataPoints: [
          { y: 20, label: 'male,electric' },
          { y: 30, label: 'female,fuel' },
          { y: 10, label: 'female, electric' },
        ],
      },
    ],
  };

  lineChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Angular Line Chart in Material UI Tabs',
    },
    theme: 'light2', // "light1", "dark1", "dark2"
    data: [
      {
        type: 'line',
        dataPoints: [
          { label: 'apple', y: 10 },
          { label: 'orange', y: 15 },
          { label: 'banana', y: 25 },
          { label: 'mango', y: 30 },
          { label: 'grape', y: 28 },
        ],
      },
    ],
  };
}
