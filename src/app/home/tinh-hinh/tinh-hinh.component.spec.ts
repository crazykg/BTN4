import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhHinhComponent } from './tinh-hinh.component';

describe('TinhHinhComponent', () => {
  let component: TinhHinhComponent;
  let fixture: ComponentFixture<TinhHinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinhHinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhHinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
