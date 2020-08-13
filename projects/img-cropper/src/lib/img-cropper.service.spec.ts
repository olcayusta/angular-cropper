import { TestBed, inject } from '@angular/core/testing';

import { ImgCropperService } from './img-cropper.service';

describe('ImgCropperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImgCropperService]
    });
  });

  it('should be created', inject([ImgCropperService], (service: ImgCropperService) => {
    expect(service).toBeTruthy();
  }));
});
