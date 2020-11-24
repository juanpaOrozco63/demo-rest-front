import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-list-normal',
  templateUrl: './record-list-normal.component.html',
  styleUrls: ['./record-list-normal.component.css']
})
export class RecordListNormalComponent implements OnInit {
  title:string='Shopping Record';
  constructor() { }

  ngOnInit(): void {
  }

}
