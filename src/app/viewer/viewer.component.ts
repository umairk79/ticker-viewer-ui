import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../_model/ticket';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  tickets: Ticket[] ;
  page = 1;
  pageSize = 25;
  math = Math;

  constructor(private router: Router, public datePipe: DatePipe) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('tickets') == null){
      this.router.navigate([''])
    }
    this.tickets = JSON.parse(sessionStorage.getItem('tickets')) as Ticket[];
  }

  viewTicket(index: number) {
    if (typeof (Storage) !== 'undefined') {
      sessionStorage.setItem('ticket', JSON.stringify(this.tickets[index]));
    }
    this.router.navigate(['/tickets', this.tickets[index]['id']], {state: {ticket: this.tickets[index]}});
  }

}
