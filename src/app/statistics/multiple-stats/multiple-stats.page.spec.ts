import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultipleStatsPage } from './multiple-stats.page';

describe('MultipleStatsPage', () => {
  let component: MultipleStatsPage;
  let fixture: ComponentFixture<MultipleStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
