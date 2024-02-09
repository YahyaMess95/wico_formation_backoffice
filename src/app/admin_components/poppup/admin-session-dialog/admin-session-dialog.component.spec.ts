import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSessionDialogComponent } from './admin-session-dialog.component';

describe('AdminSessionDialogComponent', () => {
  let component: AdminSessionDialogComponent;
  let fixture: ComponentFixture<AdminSessionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSessionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
