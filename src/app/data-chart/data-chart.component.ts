import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss']
})
export class DataChartComponent {

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(){
    this.localStorageService.getMyArray().subscribe((data)=>{
      const processedDataY =this.processedDataY(data)
      const processedDatalabel =this.processedDatalabel(data)
    })
  }
  processedDataY(data: any[]):any {
      const processedDataY = data.map(item => ({
        y: item.personalDetails.amountOfSeats, // לפי כמות המושבים
      }));
      // החזרת הנתונים המוכנים לשימוש בגרף
      return processedDataY;
    
    
  }
  processedDatalabel(data: any[]):any {
    const processedDataLabel = data.map(item => ({
      label: item.personalDetails.motorType // לפי סוג המנוע
    }));
    // החזרת הנתונים המוכנים לשימוש בגרף
    return processedDataLabel;
  
  
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

  pieChartOptions = {
      animationEnabled: true,
      title: {
      text: 'Most picked engine type by Gender',
      },
      theme: 'light2', // "light1", "dark1", "dark2"
      showInLegend: true,
        toolTipContent: "{name}: <strong>{y}%</strong>",
        indexLabel: "{name} - {y}%",
      data: [
      {
          type: 'pie',
          dataPoints: 
          [
            { y: this.processedDataY, label: this.processedDatalabel, },
            { y: 20, label: "male,electric" },
            { y: 30, label: "female,fuel" },
            { y: 10, label: "female, electric" }
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