import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../_model/ticket';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { LoginService } from '../_services/login.service';

/**
 * Ticket Viewer Component
 * Displays all the tickets recieved from the backend based on pagination.
 */
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
})
export class ViewerComponent implements OnInit, AfterViewInit {

  // Component params
  tickets: Ticket[];
  page = 1;
  pageSize;
  ticketCount: number;
  math = Math;

  // Component constructor
  constructor(
    private router: Router,
    public datePipe: DatePipe,
    private _loginService: LoginService,
    private route: ActivatedRoute,
  ) {
    this.pageSize = environment.pageSize;
  }

  /**
   * Angular init directive
   * Gets first 100 tickets and displays them in the HTML view.
   * Page number is set from query param.
   */
  ngOnInit(): void {
    if (
      sessionStorage.getItem('tickets') == null ||
      sessionStorage.getItem('email') == null ||
      sessionStorage.getItem('password') == null ||
      sessionStorage.getItem('subdomain') == null
    ) {
      this.router.navigate(['']);
      sessionStorage.setItem('maintained', 'false')
    }
    
    this.tickets = JSON.parse(sessionStorage.getItem('tickets')) as Ticket[];
    this.ticketCount = +sessionStorage.getItem('totalCount');

    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.page = params.page;
      }
    );
  }
  /**
   * Angular after view init directive.
   * This method asynchronously calls the backed to receive all remaining tickets.
   * This happens after page load hence page load time is saved.
   */
  ngAfterViewInit(): void {
    if (sessionStorage.getItem('maintained') == 'true'){
      return;
    }
    let totalPages = Math.ceil(this.ticketCount / 100);
    for (let page = 2; page <= totalPages; page++) {
      this._loginService
        .login(
          sessionStorage.getItem('email'),
          sessionStorage.getItem('password'),
          sessionStorage.getItem('subdomain'),
          page
        )
        .subscribe(
          (data) => {
            this.tickets.push(...data['tickets']);
            sessionStorage.setItem('tickets', JSON.stringify(this.tickets));
            sessionStorage.setItem('maintained', 'true')
          },
          (error) => {}
        );
    }
  }

  // Redirects to ticket component to view a single ticket
  viewTicket(index: number) {
    index = index + (this.page - 1) * this.pageSize
    if (typeof Storage !== 'undefined') {
      sessionStorage.setItem('ticket', JSON.stringify(this.tickets[index]));
    }
    this.router.navigate(['/tickets', this.tickets[index]['id']], {
      state: { page: this.page },
    });
  }
  
  // Pagination: Load a specific page based on the page number.
  loadPage(event: number) {
    console.log(event);
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page: event }});
  }
}
