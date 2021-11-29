import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../_model/ticket';

/**
 * Single Ticket Viewer Component
 */
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  // Component parameters
  ticketId: string
  private sub: any;
  ticket: Ticket;
  page: number = 1;

  // Constructor
  constructor(private router: Router, private route: ActivatedRoute, public datePipe: DatePipe) { }

  /**
   * Angular init directive
   * Takes in session variables to initialize the page with details of a ticket based on it's ID.
   */ 
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.ticketId = params['id'];
   });
    if (sessionStorage.getItem('ticket') == null){
      this.router.navigate(['tickets'], { queryParams: { page: 1} })
    };
    this.ticket = JSON.parse(sessionStorage.getItem('ticket')) as Ticket
    if (this.ticket['id'] != this.ticketId){
      this.router.navigate(['tickets'], { queryParams: { page: 1} })
    };
    this.page = history.state.page;
  }

}
