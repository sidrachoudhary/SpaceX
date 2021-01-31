import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallsService } from '../services/http-calls.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  launchData: any;
  launchCount = 0;
  launchYear = [];
  launchYearRequested = [];
  index = 0;
  year = '';
  launchStatus: string = '';
  landstatus: string = '';
  constructor(private http: HttpCallsService, private router: Router) {}

  ngOnInit(): void {
    this.http.getDataOnAppLaunch().subscribe((data) => {
      this.launchData = data;
      this.launchCount = data.length;

      for (let i = 0; i < this.launchData.length; i++) {
        this.launchYear[i] = this.launchData[i].launch_year;
      }
      this.launchYear.sort((x, y) => {
        return x - y;
      });

      for (let i = 0, j = 1; i < this.launchYear.length; i++, j++) {
        if (this.launchYear[i] != this.launchYear[j]) {
          this.launchYearRequested[this.index] = this.launchYear[i];
          this.index++;
        }
      }
    });
  }
  applyYearFilter(year) {
    this.year = year;
    this.http.getYearFilterData(this.year).subscribe((data) => {
      this.router.navigate([""], {
        queryParams: { limit: 100, year: this.year },
      });
      this.launchData = data;
    });
  }
  applyLaunchSuccessFilter(event) {
    this.launchStatus = event.target.textContent.toLowerCase();
    this.router.navigate([""], {
      queryParams: { limit: 100, launch_status: this.launchStatus },
    });
    this.http.getLaunchSuccessData(this.launchStatus).subscribe((data) => {
      this.launchData = data;
      this.launchCount = data.length;
    });
  }

  applyMultipleFilter(event) {
    this.landstatus = event.target.textContent.toLowerCase();
    if (this.launchStatus !== '' && this.landstatus !== '' && this.year == '') {
      this.http
        .getLaunchAndLandData(this.launchStatus, this.landstatus)
        .subscribe((data) => {
          this.router.navigate([""], {
            queryParams: {
              limit: 100,
              launch_status: this.launchStatus,
              land_status: this.landstatus,
            },
          });
          this.launchData = data;
          this.launchCount = data.length;
        });
    } else if (
      this.launchStatus != '' &&
      this.landstatus != '' &&
      this.year != ''
    ) {
      this.http
        .getAllFilterAppliedData(this.year, this.launchStatus, this.landstatus)
        .subscribe((data) => {
          this.router.navigate([""], {
            queryParams: {
              limit: 100,
              launch_status: this.launchStatus,
              land_status: this.landstatus,
              launch_year: this.year,
            },
          });
          this.launchData = data;
          this.launchCount = data.length;
          return 0;
        });
    } else {
      this.http.getLaunchesLandData(this.landstatus).subscribe((data) => {
        this.launchData = data;
        this.launchCount = data.length;
        return 0;
      });
    }
  }
}
