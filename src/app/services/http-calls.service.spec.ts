import { HttpClient, HttpParams } from '@angular/common/http';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpCallsService } from './http-calls.service';
import { environment } from 'src/environments/environment';
import { env } from 'process';
import { AppRoutingModule } from '../app-routing.module';

describe('HttpCallsService', () => {
  let httpCallsService: HttpCallsService;
  let httpTestingController: HttpTestingController;
  let response: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppRoutingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    httpCallsService = TestBed.get(HttpCallsService);

    httpCallsService.apiURL = environment.baseAPIUrl;
    response = [{
      "flight_number": 1,
      "mission_name": "FalconSat",
      "mission_id": [],
      "upcoming": false,
      "launch_year": "2017",
      "launch_date_unix": 1143239400,
      "launch_date_utc": "2006-03-24T22:30:00.000Z",
      "launch_date_local": "2006-03-25T10:30:00+12:00",
      "is_tentative": false,
      "tentative_max_precision": "hour",
      "tbd": false,
      "launch_window": 0,
      "rocket": {
        "rocket_id": "falcon1",
        "rocket_name": "Falcon 1",
        "rocket_type": "Merlin A",
        "first_stage": {
          "cores": [{
            "core_serial": "Merlin1A",
            "flight": 1,
            "block": null,
            "gridfins": false,
            "legs": false,
            "reused": false,
            "land_success": true,
            "landing_intent": false,
            "landing_type": null,
            "landing_vehicle": null
          }]
        },
        "second_stage": {
          "block": 1,
          "payloads": [{
            "payload_id": "FalconSAT-2",
            "norad_id": [],
            "reused": false,
            "customers": ["DARPA"],
            "nationality": "United States",
            "manufacturer": "SSTL",
            "payload_type": "Satellite",
            "payload_mass_kg": 20,
            "payload_mass_lbs": 43,
            "orbit": "LEO",
            "orbit_params": {
              "reference_system": "geocentric",
              "regime": "low-earth",
              "longitude": null,
              "semi_major_axis_km": null,
              "eccentricity": null,
              "periapsis_km": 400,
              "apoapsis_km": 500,
              "inclination_deg": 39,
              "period_min": null,
              "lifespan_years": null,
              "epoch": null,
              "mean_motion": null,
              "raan": null,
              "arg_of_pericenter": null,
              "mean_anomaly": null
            }
          }]
        },
        "fairings": {
          "reused": false,
          "recovery_attempt": false,
          "recovered": false,
          "ship": null
        }
      },
      "ships": [],
      "telemetry": {
        "flight_club": null
      },
      "launch_site": {
        "site_id": "kwajalein_atoll",
        "site_name": "Kwajalein Atoll",
        "site_name_long": "Kwajalein Atoll Omelek Island"
      },
      "launch_success": true,
      "launch_failure_details": {
        "time": 33,
        "altitude": null,
        "reason": "merlin engine failure"
      },
      "links": {
        "mission_patch": "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
        "mission_patch_small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
        "reddit_campaign": null,
        "reddit_launch": null,
        "reddit_recovery": null,
        "reddit_media": null,
        "presskit": null,
        "article_link": "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
        "wikipedia": "https://en.wikipedia.org/wiki/DemoSat",
        "video_link": "https://www.youtube.com/watch?v=0a_00nJ_Y88",
        "youtube_id": "0a_00nJ_Y88",
        "flickr_images": []
      },
      "details": "Engine failure at 33 seconds and loss of vehicle",
      "static_fire_date_utc": "2006-03-17T00:00:00.000Z",
      "static_fire_date_unix": 1142553600,
      "timeline": {
        "webcast_liftoff": 54
      },
      "crew": null
    }];
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  
  it('should get the data on app launch', () => {
    httpCallsService.getDataOnAppLaunch().subscribe(data => {
      expect(data[0].flight_number).toEqual(1);
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${httpCallsService.apiURL}/launches?limit=100`
    });
    req.flush(response);
  });

  it('should get the data when filter is applied on year', () => {
    httpCallsService.getYearFilterData("2017").subscribe(data => {
      expect(data[0].launch_year).toEqual("2017");
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${httpCallsService.apiURL}/launches?launch_year=2017`
    });
    req.flush(response);
  });

  it('should get the data when launch success is true', () => {
    httpCallsService.getLaunchSuccessData(true).subscribe(data => {
      expect(data[0].launch_success).toEqual(true);
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${httpCallsService.apiURL}/launches?launch_success=true`
    });
    req.flush(response);
  });

  it('should get the data when land success is true', () => {
    httpCallsService.getLaunchesLandData(true).subscribe(data => {
      expect(data[0].rocket.first_stage.cores[0].land_success).toEqual(true);
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${httpCallsService.apiURL}/launches?land_success=true`
    });
    req.flush(response);
  });

  it('should get the data when land and launch success is true', () => {
    httpCallsService.getLaunchAndLandData(true, true).subscribe(data => {
      expect(data[0].rocket.first_stage.cores[0].land_success).toEqual(true);
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${httpCallsService.apiURL}/launches?limit=100&launch_success=true&land_success=true`
    });
    req.flush(response);
  });

  xit('should get the data when land and launch success is true and year filter is applied', () => {
    httpCallsService.getAllFilterAppliedData("2017", true, true).subscribe(data => {
      expect(data[0].launch_year).toEqual("2017");
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${httpCallsService.apiURL}/launch_year==2017&launch_success=true&land_success==true`
    });
    req.flush(response);
  });
});
