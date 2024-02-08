import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormationListComponent } from './admin-formation-list.component';

describe('AdminFormationListComponent', () => {
  let component: AdminFormationListComponent;
  let fixture: ComponentFixture<AdminFormationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFormationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFormationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
