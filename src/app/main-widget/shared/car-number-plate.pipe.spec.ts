import { CarNumberPlate } from './car-number-plate.pipe';


describe('carNumberPlatePipe', () => {
  it('should put space dash space after 3 char and make it Caps', () => {
    const pipe = new CarNumberPlate();
    expect(pipe.transform('aaa111')).toEqual('AAA - 111');
  });
});
