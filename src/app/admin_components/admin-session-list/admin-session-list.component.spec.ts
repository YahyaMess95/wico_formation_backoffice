import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSessionListComponent } from './admin-session-list.component';

describe('AdminSessionListComponent', () => {
  let component: AdminSessionListComponent;
  let fixture: ComponentFixture<AdminSessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSessionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
