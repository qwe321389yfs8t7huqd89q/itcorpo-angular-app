import { TestBed } from '@angular/core/testing';

import { ChosenCountryService } from './chosen-country.service';

describe('ChosenCountryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChosenCountryService = TestBed.get(ChosenCountryService);
    expect(service).toBeTruthy();
  });
});
