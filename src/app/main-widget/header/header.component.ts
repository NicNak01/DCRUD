import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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
export class HeaderComponent implements OnInit, OnDestroy {
  carNumbers: ICarNumber[];
  existence = false;
  carNum: string;
  sub: Subscription;
  carNumber: ICarNumber;
  carNumberForm: FormGroup = this.fb.group({
    number: ['', [Validators.required, carNumberMatcher]],
    owner: ['', [Validators.required, Validators.minLength(1)]]
  });

  constructor(private fb: FormBuilder,
              private widgetService: WidgetService) { }
  saveCarNumeber() {
    this.existence = false;
    this.carNumber = {...this.carNumberForm.value};
    this.carNumberForm.reset();
    if (!!this.carNumbers.find(o => o.number === this.carNumber.number)) {
      this.existence = true;
      return this.carNum = this.carNumber.number;
      }
    if (!this.existence) {
      this.widgetService.addCarNumber(this.carNumber);
      this.widgetService.createCarNumber(this.carNumber).subscribe();
      this.carNum = null;
    }
  }


  ngOnInit() {
    this.sub = this.widgetService.carNumbersChanged$.subscribe(carNumbers => this.carNumbers = carNumbers);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

