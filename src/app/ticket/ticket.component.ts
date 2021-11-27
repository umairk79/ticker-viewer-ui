import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../_model/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticketId: string
  private sub: any;
  ticket: Ticket;

  constructor(private router: Router, private route: ActivatedRoute, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.ticketId = params['id'];
   });
    if (sessionStorage.getItem('ticket') == null){
      this.router.navigate(['tickets'])
    };
    this.ticket = JSON.parse(sessionStorage.getItem('ticket')) as Ticket
    if (this.ticket['id'] != this.ticketId){
      this.router.navigate(['tickets'])
    };
  }

}
