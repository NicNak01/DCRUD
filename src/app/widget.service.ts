import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { ICarNumber } from './main-widget/body/car-number';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  itemtUrl = 'http://localhost:8080/carnumbers';
  carNumbers: ICarNumber[];
  carNumber: ICarNumber;
  private carNumbersSubject$ = new BehaviorSubject<ICarNumber[]>(this.carNumbers);
  carNumbersChanged$ = this.carNumbersSubject$.asObservable();
  constructor(private http: HttpClient) {
  }

  getCarNumbers(): Observable <ICarNumber[]> {
    return this.http.get<ICarNumber[]>(this.itemtUrl).pipe
    (tap(data => console.log('getItem: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createCarNumber(carNumber: ICarNumber) {
    return this.http.post(this.itemtUrl, carNumber)
      .pipe(
        tap(data => console.log(JSON.stringify(carNumber))),
        catchError(this.handleError)
    );
  }

    deleteCarNumber(id: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.itemtUrl}/${id}`;
    return this.http.delete<ICarNumber>(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
    }

  addCarNumber(carNumber: any) {
    this.carNumbers.push(carNumber);
    this.carNumbersSubject$.next(this.carNumbers);
  }

   removeCarNumber(num: string) {
    this.carNumbers = this.carNumbers.filter(value => value.number !== num);
    this.carNumbersSubject$.next(this.carNumbers);
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
