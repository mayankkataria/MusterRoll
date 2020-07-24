import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleStatsPage } from './single-stats.page';

describe('SingleStatsPage', () => {
  let component: SingleStatsPage;
  let fixture: ComponentFixture<SingleStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
