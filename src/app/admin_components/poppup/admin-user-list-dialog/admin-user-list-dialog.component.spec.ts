import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserListDialogComponent } from './admin-user-list-dialog.component';

describe('AdminUserListDialogComponent', () => {
  let component: AdminUserListDialogComponent;
  let fixture: ComponentFixture<AdminUserListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
