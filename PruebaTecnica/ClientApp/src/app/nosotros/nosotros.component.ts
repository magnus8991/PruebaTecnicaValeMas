import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Imagenes } from './images';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})

export class NosotrosComponent implements OnInit {
  showNavigationArrows = false;
  imagenes: Imagenes;
  direction;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    this.imagenes = new Imagenes();
  }

  ngOnInit(): void {
  }

  sliderOn(event) { this.direction = event.direction; }

}
