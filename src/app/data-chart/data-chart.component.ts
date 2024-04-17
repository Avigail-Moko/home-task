import { Component } from '@angular/core';
import { AiCarDealershipService } from '../ai-car-dealership.service';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss'],
})
export class DataChartComponent {
  constructor(private aiCarService: AiCarDealershipService) {}
  myArray: any[] = [];
  menFuelCounter = 0;
  womenFuelCounter = 0;
  menElectricCounter = 0;
  womenElectricCounter = 0;
  twoSeatsCounter = 0;
  fiveSeatsCounter = 0;
  sevenSeatsCounter = 0;
  sportCounter = 0;
  natureCounter = 0;
  cookingCounter = 0;
  musicCounter = 0;
  artCounter = 0;
  hobbiesArray = ['sport', 'nature', 'cooking', 'music', 'art'];

  ngOnInit() {
    this.countGenders();
    this.seatsDistribution();
    this.commonHobby();
  }

  countGenders(): void {
    this.aiCarService.getMyArray().subscribe((data: any[]) => {
      data.forEach((person) => {
        if (person.gender === 'Male') {
          if (person.motorType === 'Fuel') {
            this.menFuelCounter++;
          } else {
            this.menElectricCounter++;
          }
        } else {
          if (person.motorType === 'Fuel') {
            this.womenFuelCounter++;
          } else {
            this.womenElectricCounter++;
          }
        }
        this.myArray = data;

        this.updateChartData();
      });
    });
  }

  updateChartData(): void {
    this.columnChartOptions.data[0].dataPoints = [
      { label: 'fuel', y: this.menFuelCounter },
      { label: 'electric', y: this.menElectricCounter },
    ];
    this.columnChartOptions.data[1].dataPoints = [
      { label: 'fuel', y: this.womenFuelCounter },
      { label: 'electric', y: this.womenElectricCounter },
    ];
    this.pieChartOptions.data[0].dataPoints = [
      { label: '2 seats', y: this.twoSeatsCounter },
      { label: '5 seats', y: this.fiveSeatsCounter },
      { label: '7 seats', y: this.sevenSeatsCounter },
    ];
    this.lineChartOptions.data[0].dataPoints = [
      { label: 'Sport', y: this.sportCounter },
      { label: 'Nature', y: this.natureCounter },
      { label: 'Cooking', y: this.cookingCounter },
      { label: 'Music', y: this.musicCounter },
      { label: 'Art', y: this.artCounter },
    ];
  }
  seatsDistribution() {
    this.aiCarService.getMyArray().subscribe((data: any[]) => {
      data.forEach((person) => {
        if (person.amountOfSeats == 2) {
          this.twoSeatsCounter++;
        } else if (person.amountOfSeats == 5) {
          this.fiveSeatsCounter++;
        } else if (person.amountOfSeats == 7) {
          this.sevenSeatsCounter++;
        }
      });
    });
    this.updateChartData();
  }
  commonHobby() {
    this.aiCarService.getMyArray().subscribe((data: any[]) => {
      data.forEach((person) => {
        for (let index = 0; index < person.hobbies.length; index++) {
          if (person.hobbies[index] === 'Sport') {
            this.sportCounter++;
          }
          if (person.hobbies[index] === 'Nature') {
            this.natureCounter++;
          }
          if (person.hobbies[index] === 'Cooking') {
            this.cookingCounter++;
          }
          if (person.hobbies[index] === 'Music') {
            this.musicCounter++;
          }
          if (person.hobbies[index] === 'Art') {
            this.artCounter++;
          }
        }
      });
    });
    this.updateChartData();
  }

  columnChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Fuel Vs. Electric motor per men/women',
    },
    axisX: {
      labelAngle: -90,
    },
    axisY: {
      title: 'men',
    },
    axisY2: {
      title: 'women',
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      itemclick: function (e: any) {
        if (
          typeof e.dataSeries.visible === 'undefined' ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
    data: [
      {
        type: 'column',
        name: 'men',
        legendText: 'men',
        showInLegend: true,
        dataPoints: [{ label: 'loading...', y: 0 }],
      },
      {
        type: 'column',
        name: 'women',
        axisYType: 'secondary',
        legendText: 'women',
        showInLegend: true,
        dataPoints: [{ label: 'loading...', y: 0 }],
      },
    ],
  };

  pieChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Seats Amount Distribution',
    },
    theme: 'light2',


    data: [
      {
        type: 'pie',
        indexLabel: '{label} : {y}',
        dataPoints: [
          { y: 10, label: '2 seats' },
          { y: 40, label: '5 seats' },
          { y: 50, label: '7 seats' },
        ],
      },
    ],
  };

  lineChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Most Common Hobby amongst Visitors',
    },
    theme: 'light2',
    data: [
      {
        type: 'line',
        dataPoints: [{ label: 'loading...', y: 0 }],
      },
    ],
  };
}
