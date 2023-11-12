import { ApplicationError } from "@/protocols";


export function unprocessableEntityError(): ApplicationError {
    return {
    name: 'UnprocessableEntity',
    message: 'UnprocessableEntity',
    };
}