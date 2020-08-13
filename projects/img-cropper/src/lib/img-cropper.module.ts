import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgCropperComponent } from './img-cropper.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImgCropperComponent],
  exports: [ImgCropperComponent]
})
export class ImgCropperModule { }
