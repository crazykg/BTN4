import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { CovidService } from '../../services/covid.service';
import { Config } from '../../config';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {
  private config = Config;
  
  public homeData = {
    'global' : {
      "NewConfirmed": 281656, // ca nhiem moi
      "TotalConfirmed": 26027891, // tong ca nhiem
      "NewDeaths": 6014, // moi chet
      "TotalDeaths": 862983, //tong chet
      "NewRecovered": 218521, // moi chua khoi
      "TotalRecovered": 17289966 // tong ca chua khoi
    },
    'vietnam' : {
      "NewConfirmed": 2,
      "TotalConfirmed": 1046,
      "NewDeaths": 0,
      "TotalDeaths": 34,
      "NewRecovered": 11,
      "TotalRecovered": 746,
    }
  };

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Việt Nam' },
    { data: [], label: 'Thế giới' },
  ];

  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.1)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // green
      backgroundColor: 'rgba(40, 167, 69, 0.1)',
      borderColor: 'rgba(40, 167, 69, 1)',
      pointBackgroundColor: 'rgba(40, 167, 69, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(40, 167, 69, 1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.1)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  // public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(
    private covidService: CovidService,
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.getByBetweenTime();
  }

  getAll() {
    var result: any;
    var url: string = this.config.COVID_API.URL + '/summary';
    this.covidService.get(url).subscribe(
      (res) => {
        result = res;
      }, err => {
        console.log(err);
      }, () => {
        var vietnam:any = result.Countries.filter((item:any) => item.CountryCode == 'VN')[0]; 
        this.homeData = {
          'global': result.Global,
          'vietnam' : vietnam
        }
      }
    )
  }

  getByBetweenTime() {
    // {{baseUrl}}/country/{{country}}?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
    var dateOffset = (24*60*60*1000) * 30;
    var date = new Date();
    date.setTime(date.getTime() - dateOffset);

    var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
    var d2 = new Date();
    var endDate = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).toISOString();

    var url: string = this.config.COVID_API.URL + '/country/' + this.config.COVID_API.COUNTRY + '?from=' + startDate + '&to=' + endDate;

    var result: any;
    var lineLabels = [];
    var dataConfirmed = [];
    var dataDeaths = [];
    var dataRecovered = [];
    this.covidService.get(url).subscribe(
      (res) => {
        result = res;
      }, err => {
        console.log(err);
      }, () => {
        result.forEach(function (value: any, key: any) {
          date = new Date(value.Date);
          let month = date.getMonth() + 1;
          let dt = date.getDate();
          lineLabels.push(dt + '/' + month);

          dataConfirmed.push(value.Confirmed);
          dataDeaths.push(value.Deaths);
          dataRecovered.push(value.Recovered);
        });
        this.lineChartLabels = lineLabels;
        // this.lineChartData.shift();
        this.lineChartData = [
          { data: dataConfirmed, label: 'Nhiễm bệnh' },
          { data: dataRecovered, label: 'Đã khỏi' },
          { data: dataDeaths, label: 'Tử Vong' }
        ];
      }
    )
  }
  
  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

}
