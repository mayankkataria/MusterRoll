import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OthersProfilePage } from './others-profile.page';

describe('OthersProfilePage', () => {
  let component: OthersProfilePage;
  let fixture: ComponentFixture<OthersProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OthersProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
