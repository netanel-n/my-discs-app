import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscListItemComponent } from './disc-list-item.component';

describe('DiscListItemComponent', () => {
  let component: DiscListItemComponent;
  let fixture: ComponentFixture<DiscListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
