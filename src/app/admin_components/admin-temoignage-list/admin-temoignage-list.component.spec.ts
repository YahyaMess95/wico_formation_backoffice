import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTemoignageListComponent } from './admin-temoignage-list.component';

describe('AdminTemoignageListComponent', () => {
  let component: AdminTemoignageListComponent;
  let fixture: ComponentFixture<AdminTemoignageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTemoignageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTemoignageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
