import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatelogPage } from './datelog.page';

describe('DatelogPage', () => {
  let component: DatelogPage;
  let fixture: ComponentFixture<DatelogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatelogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatelogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
