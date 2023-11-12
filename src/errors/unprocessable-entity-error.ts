import { ApplicationError } from "@/protocols";


export function unprocessableEntityError(): ApplicationError {
    return {
    name: 'UnprocessableEntityError',
    message: 'UnprocessableEntity',
    };
}