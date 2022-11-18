import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto'
import { environment } from 'src/environments/environment.dev';
const quarryApi = environment.quarryApi

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;
  dataList: any;
  barProductName: any = [];
  barProductUnit: any = [];
  donutProductName: any = [];
  donutProductAmt: any = [];

  constructor(private httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.barChartMethod();
    this.doughnutChartMethod();
  }

  barChartMethod() {
    this.httpClient.get(quarryApi+'/admin/chart_values').subscribe(data => {
        this.dataList = data;
        console.log(this.dataList);
        console.log(this.dataList['productLoadUnitChartList']);
        console.log(this.dataList['productTotalAmtChartList']);
        if(this.dataList['productLoadUnitChartList'].length) {
          this.dataList['productLoadUnitChartList'].forEach(element => {
            this.barProductName.push(element['productName']);
            this.barProductUnit.push(element['count']);
          });
        }
        if(this.dataList['productTotalAmtChartList'].length) {
          this.dataList['productTotalAmtChartList'].forEach(element => {
            this.donutProductName.push(element['productName']);
            this.donutProductAmt.push(element['count']);
          });
        }
    }); 
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.barProductName,
        datasets: [{
          label: 'Product load units',
          data: this.barProductUnit,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: {
                beginAtZero: true
            }
        }
    }

    });
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.donutProductName,
        datasets: [{
          label: '# of Votes',
          data: this.donutProductAmt,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      }
    });
  }

}
