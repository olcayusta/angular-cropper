import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'lib-img-cropper',
  template: `
    <ng-container>
      <div class="wrapper">
        <div id="container">
          <div
            (mousedown)="onmousedown($event)"
            (mouseup)="onmouseup($event)"
            id="drag" class="drag"></div>
          <div id="debug">
            <div>Width: {{imgWidth}}px</div>
            <div>Height: {{imgHeight}}px</div>
            <div>Mouse event: {{debug}}</div>
          </div>
          <input #file type="file" id="file" (change)="onchange($event)">
          <button (click)="file.click()">Gözat</button>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['cropper-style.scss']
})
export class ImgCropperComponent implements OnInit {
  imgWidth;
  imgHeight;

  private startX;
  private startY;
  private offsetX;
  private offsetY;

  private dragElement;

  private positionX;
  private positionY;

  private defaultSizeX;
  private defaultSizeY;

  debug;

  moveFunc: Function;

  constructor(
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) { }

  onchange(e) {
    const file = e.target.files[0];
    const blobUrl = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      this.imgWidth = img.width;
      this.imgHeight = img.height;
      const el = document.getElementById('drag');
      el.style.backgroundImage = `url(${blobUrl})`;

      if (this.imgHeight > this.imgWidth) {
        const ratio = this.imgHeight / this.imgWidth;
        const size_y = ratio * 300;
        this.defaultSizeX = 300;
        this.defaultSizeY = -1 * (size_y - 300);
        const pos_y = -1 * (size_y - 300) / 2;
        el.style.backgroundPosition = `300px ${pos_y}px`;
        el.style.backgroundSize = '300px ' + size_y + 'px';
      } else {
        const ratio = this.imgWidth / this.imgHeight;
        const size_x = ratio * 300;
        this.defaultSizeX = -1 * (size_x - 300);
        this.defaultSizeY = 300;
        const pos_x = -1 * (size_x - 300) / 2;
        el.style.backgroundPosition = `${pos_x}px 300px`;
        el.style.backgroundSize = size_x + 'px ' + '300px';
      }

    };
    img.src = blobUrl;
  }

  onmousedown(e) {
    this.debug = 'Mouse is Down!';
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.offsetX = e.target.style.left;
    this.offsetY = e.target.style.top;
    this.positionY = parseInt(document.getElementById('drag').style.backgroundPositionY, 10);
    this.positionX = parseInt(document.getElementById('drag').style.backgroundPositionX, 10);
    this.dragElement = e.target;
    this.moveFunc = this.renderer.listen('document', 'mousemove', (e) => {
      const pos_x = (this.positionX + e.clientX - this.startX);
      const pos_y = (this.positionY + e.clientY - this.startY);

      this.debug = 'Mouse is Move!';

      const dragEl = document.getElementById('drag');

      dragEl.style.backgroundPosition = pos_x + 'px ' + pos_y + 'px';

      if (pos_y >= 0) {
        dragEl.style.backgroundPositionY = '0px';
      }

      if (pos_y <= this.defaultSizeY) {
        dragEl.style.backgroundPositionY = `${this.defaultSizeY}px`;
      }

      if (pos_x >= 0) {
        dragEl.style.backgroundPositionX = '0px';
      }

      if (pos_x <= this.defaultSizeX) {
        dragEl.style.backgroundPositionX = `${this.defaultSizeX}px`;
      }

    });
    return false;
  }

  onmouseup() {
    if (this.dragElement != null) {
      this.moveFunc();
      // this.moveFunc();
      // we're done with these events until the next OnMouseDown
      // document.onmousemove = null;
      document.onselectstart = null;

      // this is how we know we're not dragging
      this.dragElement = null;
      this.debug = 'Mouse is Up!';

    }

  }

  rendererMove() {
  }

  ngOnInit() {
  }

}
