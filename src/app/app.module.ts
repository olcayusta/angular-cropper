import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ImgCropperModule} from '../../projects/img-cropper/src/lib/img-cropper.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ImgCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
