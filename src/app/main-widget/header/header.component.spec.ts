import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { CarNumberPlate } from '../shared/car-number-plate.pipe';
import { ICarNumber } from '../body/car-number';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetService } from '../../widget.service';


describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let carNumber: ICarNumber;
  let carNums: ICarNumber[];

  let existence: boolean;
  let widgetService: WidgetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        CarNumberPlate
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    carNumber = { number: 'car111', owner: 'John1' };
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    existence = false;
    carNums = [
      { number: 'car111', owner: 'John1' },
      { number: 'car112', owner: 'John2' },
      { number: 'car113', owner: 'John3' }
    ];
    widgetService = TestBed.get(WidgetService);
    fixture.detectChanges();
  });
  describe('save car numeber', () => {
    it('should set existance to false', () => {

      component.carNumberForm.setValue({number: 'car111', owner: 'John1'});
      component.carNumbers = carNums;
      fixture.detectChanges();
      component.saveCarNumeber();
      expect(component.existence).toBe(true);
    });
    it('should add  car numeber', () => {
      widgetService.carNumbers.next(carNums);
      component.carNumberForm.setValue({number: 'car121', owner: 'John1'});
      component.carNumbers = carNums;
      fixture.detectChanges();
      component.saveCarNumeber();
      expect(component.carNumbers.length).toBe(4);
      expect(widgetService.carNumbers.value.length).toBe(4);
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
