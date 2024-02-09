import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormationDialogComponent } from './admin-formation-dialog.component';

describe('AdminFormationDialogComponent', () => {
  let component: AdminFormationDialogComponent;
  let fixture: ComponentFixture<AdminFormationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFormationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFormationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
