import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeanceListComponent } from './admin-seance-list.component';

describe('AdminSeanceListComponent', () => {
  let component: AdminSeanceListComponent;
  let fixture: ComponentFixture<AdminSeanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSeanceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSeanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
