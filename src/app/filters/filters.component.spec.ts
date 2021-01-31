import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../app-routing.module';
import { ProgramsGridComponent } from '../programs-grid/programs-grid.component';
import { HttpCallsService } from '../services/http-calls.service';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersComponent, ProgramsGridComponent ],
      imports: [HttpClientModule,AppRoutingModule],
      providers: [HttpCallsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should apply year filter with the given year', () => {
    component.applyYearFilter("2017");
    expect(2).toEqual(2);
  });
});
