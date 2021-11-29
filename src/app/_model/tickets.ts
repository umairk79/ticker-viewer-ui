import { Ticket } from "./ticket";

/**
 * Response structure recieved from backend.
 */
export interface Tickets {
    "tickets": Ticket[],
    "count": string
}