# Ticket Viewer UI

This frontend project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.13.

## Requirements

- Node v16.13.0
- Angular v12.2.13

## Installation and Setup
Install [Node.js](https://nodejs.org/) which includes [Node Package Manager](https://www.npmjs.com/get-npm). NPM is required to install various node packages.

Once node is setup, Angular need to be installed. Run the following command to install it globally. 
```
npm install -g @angular/cli@12.2.13
```
Now clone the repository, and move into the project directory. Run the following command to install all the required packages.
```
npm install
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Note `4200` is the default port, if you change the port please change the port in the navigation URL as well. 

## Usage

The angular frontend application has 3 components.
- Login (User details section).
- Ticket viewer section (Displays all the tickets in a paginated order).
- Single ticket viewer (Displays details for a single ticket).
  
### 1. Login Component

```
http://localhost:4200/
```

This section takes user details such as email, password and subdomain and then sends this details to the backend REST API server. 

It performs form validations (email pattern validaiton, required fields etc) on each field.

Upon successful form validation sends request to the backend. Redirects to ticket viewer component if the connection is successful and the data is received (only for page=1). Otherwise prompts appropriate error messages and asks user to try again.

![Invalid Email](src/assets/login_invalid.png?raw=true "Invalid Email")

![Auth Error](src/assets/login_error.png?raw=true "Auth Error")

### 2. Ticket Viewer Component

```
http://localhost:4200/tickets?page={pageNumber}
```

This section shows all the ticket for a given account. On page load it only retrieves first 100 tickets for a given account (sorted by updated_date desc). Once the page is loaded it retrieves the remaining tickets hence saving a lot of load time. Imagine you have 10,000 tickets and you page waits for all tickets to be fetched! 

This sections only shows limited ticket details such as ticket-id, ticket-subject, ticket-creation-date, ticket-last-updated-date. This view also shows the ticket status by color labeling the ticket-id (red for open, blue for pending and grey for closed). The tickets are shown in an accordion structure, hence clicking on them shows additional details and the button to view a single ticket.

Pagination is also implemented for this section. By default it launches page 1. You can navigate to other pages either by clicking the page numbers in the footer or by `page` query param. In the bottom it also shows the total number of tickets and the number of tickets displayed on the current page.

![Viewer](src/assets/viewer_main.png?raw=true "Ticker Viewer")

![Accordion](src/assets/viewer_accordion.png?raw=true "Accordion")

### 3. Single Ticket Viewer Component

```
http://localhost:4200/tickets/{ticketId}
```


This section displays details for a single ticket. Contains fields such as ticket-id, ticket-subject, ticket-description, ticket-created-at, ticket-last-updated-at, ticket-requester, ticket-assignee, ticket-tags, ticket-status.

![Ticket](src/assets/single_ticket.png?raw=true "Ticket")

## Configuration

Configuration for this application is maitained in the `src/environments/environment.ts` file. It contains the following properties.

```
backendURL: "http://127.0.0.1:8000/",
backendEndpoint: "tickets/",
pageSize: 25
```

Backend url/endpoint is the url/endpoint for the Django REST API. The source code for the backend server can be found in the other shared repository. If you are running the backend system on a different host/port, please make the change in this file too.

Page size is also externalized hence we can change the number of tickets to be displayed in a single page.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Commits

All Github checkin commits messages have the corresponding Zendesk ticket ID. For eg. I created a ticket(Zendesk Ticket #4) for initializing Angular app and referenced the ticket number in the corresponding commit (d7d12a6c1696520a393c110e077890b7a08154d3).