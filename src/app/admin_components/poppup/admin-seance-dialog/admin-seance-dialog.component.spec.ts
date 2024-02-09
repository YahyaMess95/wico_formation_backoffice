import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeanceDialogComponent } from './admin-seance-dialog.component';

describe('AdminSeanceDialogComponent', () => {
  let component: AdminSeanceDialogComponent;
  let fixture: ComponentFixture<AdminSeanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSeanceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSeanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
