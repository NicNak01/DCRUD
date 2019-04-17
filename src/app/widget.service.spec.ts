import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { WidgetService } from './widget.service';
import { ICarNumber } from './main-widget/body/car-number';

describe('WidgetService', () => {
  let widgetService: WidgetService;
  let httpTestingController: HttpTestingController;
  const carNumbers: ICarNumber[] = [
    { number: 'car111', owner: 'John1' },
    { number: 'car112', owner: 'John2' },
    { number: 'car112', owner: 'John3' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // providers: [WidgetService]
    });
    widgetService = TestBed.get(WidgetService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('GET all carnumbers', () => {
    widgetService.getCarNumbers()
      .subscribe((data: ICarNumber[]) => {
        expect(data.length).toBe(3);
      });
    const carNumbersRequest: TestRequest = httpTestingController.expectOne('http://localhost:8080/carnumbers');
    expect(carNumbersRequest.request.method).toEqual('GET');
    carNumbersRequest.flush(carNumbers);
    httpTestingController.verify();
  });
  // it('should be created', () => {
  //   const service: WidgetService = TestBed.get(WidgetService);
  //   expect(service).toBeTruthy();
  // });
});
