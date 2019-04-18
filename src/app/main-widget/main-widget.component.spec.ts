import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MainWidgetComponent } from './main-widget.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MainWidgetComponent', () => {
  @Component({
    selector: 'app-header',
    template: '<div></div>'
  })
  class FakeHeaderComponent { }

  @Component({
    selector: 'app-body',
    template: '<div></div>'
  })
  class FakeBodyComponent { }
  let component: MainWidgetComponent;
  let fixture: ComponentFixture<MainWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainWidgetComponent,
        FakeHeaderComponent,
        FakeBodyComponent
      ]
      // schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
