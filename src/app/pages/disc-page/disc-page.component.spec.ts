import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscPageComponent } from './disc-page.component';

describe('DiscPageComponent', () => {
  let component: DiscPageComponent;
  let fixture: ComponentFixture<DiscPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
