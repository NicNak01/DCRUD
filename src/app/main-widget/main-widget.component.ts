import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../widget.service';
import { ICarNumber } from './body/car-number';

@Component({
  selector: 'app-main-widget',
  templateUrl: './main-widget.component.html',
  styleUrls: ['./main-widget.component.css']
})
export class MainWidgetComponent implements OnInit {

  constructor(private widgetService: WidgetService) { }

  ngOnInit() {
    this.widgetService.getCarNumbers().subscribe(
      (CarNumbers: ICarNumber[]) => {
        this.widgetService.setCarNumber(CarNumbers);
      }
    );
  }

}
