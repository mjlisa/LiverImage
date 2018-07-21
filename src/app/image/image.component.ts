
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor(
    private location: Location

  ) { }

  ngOnInit() {
  }

  goBack(): void {
  this.location.back();
}

}
