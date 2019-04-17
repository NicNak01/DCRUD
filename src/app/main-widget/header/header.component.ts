import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ICarNumber } from '../body/car-number';
import { WidgetService } from '../../widget.service';
import { Subscription } from 'rxjs';

function carNumberMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const regex = /\b[A-Za-z]{3}[0-9]{3}\b/;
  if ( regex.test(c.value)) {
    return null;
  }
  return { match: true };
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  carNumbers: ICarNumber[];
  existence = false;
  carNumberForm: FormGroup;
  carNum: string;
  sub: Subscription;

  constructor(private fb: FormBuilder,
              private widgetService: WidgetService) { }
  saveCarNumeber() {
    this.existence = false;
    // const p = { ...this.carNumber, ...this.carNumberForm.value };
    const p = Object.assign({}, this.carNumberForm.value );
    this.carNumberForm.reset();
    this.carNumbers.forEach(element => {
      if (element.number === p.number) {
        this.carNum = p.number;
        this.existence = true;
      } else {
      }
    });
    if (!this.existence) {
      this.widgetService.createCarNumber(p).subscribe();
    }
  }
  ngOnInit() {
    this.sub = this.widgetService.carNumbersChanged$.subscribe(carNumbers => this.carNumbers = carNumbers);
    this.widgetService.getCarNumbers().subscribe(
      (CarNumbers: ICarNumber[]) => {
        this.widgetService.carNumbers = Object.assign([], CarNumbers);
        this.carNumbers = Object.assign([], this.widgetService.carNumbers);
      }
    );

    this.carNumberForm = this.fb.group({
      number: ['', [Validators.required, carNumberMatcher]],
      owner: ['', [Validators.required, Validators.minLength(1)]]
    });
  }
}



