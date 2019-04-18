import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ICarNumber } from './main-widget/body/car-number';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  url = 'http://localhost:8080/carnumbers';
  newcarNumbers: ICarNumber[];
  carNumbers = new BehaviorSubject<ICarNumber[]>([]);
  carNumbersChanged$ = this.carNumbers.asObservable();
  constructor(private http: HttpClient) {
  }

  getCarNumbers(): Observable <ICarNumber[]> {
    return this.http.get<ICarNumber[]>(this.url).pipe
    (tap(data => console.log('getcarNumber: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createCarNumber(carNumber: ICarNumber) {
    return this.http.post(this.url, carNumber)
      .pipe(
        tap(data => console.log(JSON.stringify(carNumber))),
        catchError(this.handleError)
    );
  }

  deleteCarNumber(id: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${id}`;
    return this.http.delete<ICarNumber>(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
    }

  addCarNumber(carNumber: ICarNumber) {
    const currentState = this.carNumbers.value.map(o => {
      return {...o};
    });
    this.newcarNumbers = [...this.carNumbers.value, carNumber];
    this.carNumbers.next(this.newcarNumbers);
  }

  removeCarNumber(num: string) {
    this.newcarNumbers = this.carNumbers.value.filter(value => value.number !== num);
    this.carNumbers.next(this.newcarNumbers);
  }

   setCarNumber(carnumbers) {
    this.carNumbers.next(carnumbers);
   }

  private handleError(err) {
  let errorMessage: string;
  if (err.error instanceof ErrorEvent) {
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
  }
  console.error(err);
  return throwError(errorMessage);
  }

}
