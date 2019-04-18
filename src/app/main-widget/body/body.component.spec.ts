import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyComponent } from './body.component';
import { ICarNumber } from './car-number';
import { of } from 'rxjs/internal/observable/of';
import { CarNumberPlate } from '../shared/car-number-plate.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;
  let carNums: ICarNumber[];
  let carNumber: ICarNumber;
  let mockWidgetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BodyComponent, CarNumberPlate],
      imports: [
        HttpClientTestingModule,
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    carNums = [
      { number: 'car111', owner: 'John1' },
      { number: 'car112', owner: 'John2' },
      { number: 'car113', owner: 'John3' }
    ];
    carNumber = { number: 'car111', owner: 'John1' };
    mockWidgetService = jasmine.createSpyObj(['removeCarNumber', 'deleteCarNumber', 'getCarNumbers', 'carNumbers', 'carNumbersChanged$']);
    fixture = TestBed.createComponent(BodyComponent);
    // component = new BodyComponent(mockWidgetService);
    component = fixture.componentInstance;
    // mockWidgetService.getCarNumbers.and.returnValue(of(carNums));
    // mockWidgetService.removeCarNumber.and.returnValue(of(true));
    fixture.detectChanges();
    // mockWidgetService.carNumbers = carNums;
  });
  it('should get all car numbers', () => {
    component.carNumbers = carNums;
    expect(component.carNumbers.length).toBe(3);
  });
  it('should create one td for each car number', () => {
    component.carNumbers = carNums;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('tr')).length).toBe(4);
  });
  describe('delete Number', () => {
    // it('should remove car number from car number list', () => {
    //   mockWidgetService.deleteCarNumber.and.returnValue(of(true));
    //   mockWidgetService.carNumbers = carNums;
    //   component.carNumbers = carNums;
    //   component.deleteNumber(carNumber.number);
    //   expect(component.carNumbers).toEqual(component.carNumbers.filter(value => value.number !== carNumber.number));
    // });

    // it('should call car removeCarNumber', () => {
      // mockWidgetService.deleteCarNumber.and.returnValue(of(true));
      // mockWidgetService.carNumbersChanged$.and.returnValue(of(carNums));
      // mockWidgetService.getCarNumbers.and.returnValue(of(carNums));

    //   component.carNumbers = carNums;
    //   fixture.detectChanges();

    //   component.deleteNumber(carNumber.number);
    //   expect(mockWidgetService.removeCarNumber).toHaveBeenCalledWith(carNumber.number);
    // });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
