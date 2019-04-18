import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { WidgetService } from './widget.service';
import { ICarNumber } from './main-widget/body/car-number';

describe('WidgetService', () => {
  let widgetService: WidgetService;
  let httpTestingController: HttpTestingController;
  let carNumbers: ICarNumber[];
  let carNumber: ICarNumber;
  beforeEach(() => {
    carNumbers = [
      { number: 'car111', owner: 'John1' },
      { number: 'car112', owner: 'John2' },
      { number: 'car112', owner: 'John3' }
    ];
    carNumber = { number: 'car111', owner: 'John1' };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    widgetService = TestBed.get(WidgetService);
    httpTestingController = TestBed.get(HttpTestingController);
    widgetService.carNumbers.next(carNumbers);
  });

  it('should GET all carnumbers', () => {
    widgetService.getCarNumbers()
      .subscribe((data: ICarNumber[]) => {
        expect(data.length).toBe(3);
      });
    const carNumbersRequest: TestRequest = httpTestingController.expectOne('http://localhost:8080/carnumbers');
    expect(carNumbersRequest.request.method).toEqual('GET');
    carNumbersRequest.flush(carNumbers);
    httpTestingController.verify();
  });

  it('should Post  carnumber', () => {
    widgetService.createCarNumber(carNumber).subscribe();
    const carNumbersRequest: TestRequest = httpTestingController.expectOne('http://localhost:8080/carnumbers');
    expect(carNumbersRequest.request.method).toEqual('POST');
    httpTestingController.verify();
  });

  it('should add car number', () => {
    widgetService.addCarNumber(carNumber);
    expect(widgetService.carNumbers.value.length).toEqual(4);
  });

  it('should remove car number', () => {
    widgetService.removeCarNumber(carNumber.number);
    expect(widgetService.carNumbers.value).toEqual(widgetService.carNumbers.value.filter(value => value.number !== carNumber.number));
  });
});
