import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CarNumberPlate } from '../shared/car-number-plate.pipe';
import { ICarNumber } from '../body/car-number';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let carNumber: ICarNumber;
  let carNums: ICarNumber[];
  let mockWidgetService;
  let existence: boolean;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        CarNumberPlate
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    carNumber = { number: 'car111', owner: 'John1' };
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    mockWidgetService = jasmine.createSpyObj(['addCarNumber']);
    existence = false;
    carNums = [
      { number: 'car111', owner: 'John1' },
      { number: 'car112', owner: 'John2' },
      { number: 'car113', owner: 'John3' }
    ];
    carNumber = { number: 'car111', owner: 'John1' };
    fixture.detectChanges();
  });
  it('should get all car numbers', () => {
    component.carNumbers = carNums;
    expect(component.carNumbers.length).toBe(3);
  });
  describe('save car numeber', () => {
    it('should set existance to false', () => {
      component.p = carNumber;
      component.carNumbers = carNums;
      component.saveCarNumeber();
      fixture.detectChanges();
      expect(existence).toBe(true);
    });
    it('should add  car numeber', () => {

    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
