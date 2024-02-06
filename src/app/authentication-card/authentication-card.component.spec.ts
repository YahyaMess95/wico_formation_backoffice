import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationCardComponent } from './authentication-card.component';

describe('AuthenticationCardComponent', () => {
  let component: AuthenticationCardComponent;
  let fixture: ComponentFixture<AuthenticationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthenticationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthenticationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
