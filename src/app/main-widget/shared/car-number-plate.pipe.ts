import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carNumberPlate'
})
export class CarNumberPlate implements PipeTransform {

  transform(value: string): string {
    const newValue = `${value.slice(0, 3)} - ${value.slice(3, 6)}`;
    return newValue.toLocaleUpperCase();
  }
}

