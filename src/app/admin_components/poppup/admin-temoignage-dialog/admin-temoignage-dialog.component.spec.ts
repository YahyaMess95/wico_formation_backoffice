import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTemoignageDialogComponent } from './admin-temoignage-dialog.component';

describe('AdminTemoignageDialogComponent', () => {
  let component: AdminTemoignageDialogComponent;
  let fixture: ComponentFixture<AdminTemoignageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTemoignageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTemoignageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
