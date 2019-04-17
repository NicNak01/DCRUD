import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../../widget.service';
import { ICarNumber } from './car-number';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  carNumbers: ICarNumber[];
  sub: Subscription;

  constructor(private widgetService: WidgetService) { }
  deleteNumber(id: string): void {
    this.widgetService.removeCarNumber(id);
    this.widgetService.deleteCarNumber(id).subscribe();
  }

  ngOnInit() {
    this.sub = this.widgetService.carNumbersChanged$.subscribe(carNumbers => this.carNumbers = carNumbers);
    this.widgetService.getCarNumbers().subscribe(
      (CarNumbers: ICarNumber[]) => {
        this.widgetService.carNumbers = Object.assign([], CarNumbers);
        this.carNumbers = Object.assign([], this.widgetService.carNumbers);
      }
    );
  }
}
