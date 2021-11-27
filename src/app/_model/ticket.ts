export interface Ticket {
    "id": String,
    "assignee_id": String,
    "requester_id": String,
    "subject": String,
    "description": String,
    "status": String,
    "created_at": string,
    "updated_at": string,
    "tags": String[]
}