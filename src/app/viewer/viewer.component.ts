import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from './../_model/tickets';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  tickets: Ticket[] ;
  page = 1;
  pageSize = 5;
  math = Math;

  constructor(private router: Router, public datePipe: DatePipe) { }

  ngOnInit(): void {
    if (history.state.data == undefined){
      this.router.navigate([''])
    }
    this.tickets = history.state.data["tickets"];
  }

}
