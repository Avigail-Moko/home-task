import { Component } from '@angular/core';
import { AiCarDealershipService } from '../ai-car-dealership.service';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss'],
})
export class DataChartComponent {
  constructor(private aiCarService: AiCarDealershipService) {}
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

  ngOnInit() {
    sessionStorage.setItem('isadmin', 'isadmin');
    this.loadMyArray();
  }

  loadMyArray(): void {
    this.aiCarService.getMyArray().subscribe((data: any[]) => {
      data.forEach((person) => {
        //gender
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
        //seats
        switch (person.amountOfSeats) {
          case '2':
            this.twoSeatsCounter++;
            break;
          case '5':
            this.fiveSeatsCounter++;
            break;
          case '7':
            this.sevenSeatsCounter++;
            break;
        }
        //hobbies
        person.hobbies.forEach((hobby: string) => {
          switch (hobby) {
            case 'Sport':
              this.sportCounter++;
              break;
            case 'Nature':
              this.natureCounter++;
              break;
            case 'Cooking':
              this.cookingCounter++;
              break;
            case 'Music':
              this.musicCounter++;
              break;
            case 'Art':
              this.artCounter++;
              break;
          }
        });
      });
          this.updateChartData();

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
        dataPoints: [{}],
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
        dataPoints: [{}],
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
        dataPoints: [{ }],
      },
    ],
  };
}
