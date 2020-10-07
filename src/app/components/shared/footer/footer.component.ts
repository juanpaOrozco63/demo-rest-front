import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  anio :number;
  autor: string = 'Juan Pablo Orozco';
  constructor() {
    this.anio = new Date().getFullYear();

   }

  ngOnInit(): void {
  }

}
