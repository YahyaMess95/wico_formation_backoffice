import { TestBed } from '@angular/core/testing';

import { PasswordrecoverydialogService } from './passwordrecoverydialog.service';

describe('PasswordrecoverydialogService', () => {
  let service: PasswordrecoverydialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordrecoverydialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
