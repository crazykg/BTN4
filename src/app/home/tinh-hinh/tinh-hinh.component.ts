import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import { Label, SingleDataSet } from "ng2-charts";
import { ChartType } from "chart.js";
import { CountUpOptions } from 'countup.js';

import { FormattedUpdate } from "../../models/countryDetails";
import { GlobalCountries, GlobalDetails } from "../../models/globalDetails";
import { GlobalDataService } from "../../services/global-data.service";

@Component({
  selector: 'app-tinh-hinh',
  templateUrl: './tinh-hinh.component.html',
  styleUrls: ['./tinh-hinh.component.scss']
})
export class TinhHinhComponent implements OnInit {

  keyword = 'name';
  public countries = [];
  private response: any;
  private globalResponse: any;

  public country: string = "vietnam";
  public lastUpdate: string;
  public formattedLastUpdate: string;
  public options: CountUpOptions;

  public _data: FormattedUpdate;
  public _globalData: GlobalDetails;
  public _globalCountries: GlobalCountries;

  confirmedValue: number = 0;
  recoveredValue: number = 0;
  deathsValue: number = 0;

  globalConfirmedValue: number = 0;
  globalRecoveredValue: number = 0;
  globalDeathsValue: number = 0;

  // country chart JS

  public doughnutChartLabels: Label[] = [
    "Số ca nhiễm",
    "Số ca phục hồi",
    "Số ca tử vong"
  ];
  public doughnutChartData: SingleDataSet;
  public doughnutChartType: ChartType = "pie";

  // global Chart JS

  public globalDoughnutChartLabels: Label[] = [
    "Số ca nhiễm",
    "Số ca phục hồi",
    "Số ca tử vong"
  ];
  public globalDoughnutChartData: SingleDataSet;
  public globalDoughnutChartType: ChartType = "pie";

  constructor(
    private _globalService: GlobalDataService,
    // private _eventEmitter: EventEmitter
  ) { }

  ngOnInit() {
    this.getCountry();
    this.showGlobalData();
    this.showdata(this.country);
    this.doughnutChartData = [
      this.confirmedValue,
      this.recoveredValue,
      this.deathsValue
    ];
    this.globalDoughnutChartData = [
        this.globalConfirmedValue,
        this.globalRecoveredValue,
        this.globalDeathsValue
      
    ];
    this.options = {
      duration: 1
    };
  }

  showGlobalData() {
    this._globalService.getGlobalDetails().subscribe(res => {
      this.globalResponse = res;

      this._globalData = this.globalResponse;

      this.globalConfirmedValue = this._globalData.confirmed.value;
      this.globalRecoveredValue = this._globalData.recovered.value;
      this.globalDeathsValue = this._globalData.deaths.value;

    });
  }

  getCountry = () => {
    this._globalService.getCountry().subscribe(res => {
      // this.countries 
      this.globalResponse = res;

      this._globalCountries = this.globalResponse;
      this.countries = this._globalCountries.countries;
    })
  }

  showdata(country: string) {
    this._globalService.getData(country).subscribe(res => {
      this.response = res;
      // this.formattedUpdate.confirmed = this.data.confirmed.value;
      this._data = this.response;
      console.log(this._data)
      this.confirmedValue = this._data.confirmed.value;
      this.recoveredValue = this._data.recovered.value;
      this.deathsValue = this._data.deaths.value;
      this.lastUpdate = this._data.lastUpdate;

      // this._eventEmitter.emit("lastUpdate", this.lastUpdate);

      console.log(this.confirmedValue, this.deathsValue, this.recoveredValue);

      this.doughnutChartData = [
        this.confirmedValue,
        this.recoveredValue,
        this.deathsValue
      ];

      this.globalDoughnutChartData = [
          this.globalConfirmedValue,
          this.globalRecoveredValue,
          this.globalDeathsValue
      ];
    });
  }

  inputCountry: FormGroup = new FormGroup({
    country: new FormControl(null)
  });
  onSubmit() {
    this.country = this.inputCountry.get("country").value;
    this.showdata(this.country);
    this.inputCountry.reset();
    console.log();
  }

  selectEvent = (item: { iso2: string; name:string;}) => {
    this.country = item.name;
    this.showdata(item.iso2)
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }

}
