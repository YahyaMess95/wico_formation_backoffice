import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContenuListComponent } from './admin-contenu-list.component';

describe('AdminContenuListComponent', () => {
  let component: AdminContenuListComponent;
  let fixture: ComponentFixture<AdminContenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContenuListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
