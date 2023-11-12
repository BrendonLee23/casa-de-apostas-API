import { ApplicationError } from "@/protocols";


export function paymentRequiredError(): ApplicationError {
    return {
    name: 'PaymentRequiredError',
    message: 'Payment Required or insufficient',
    };
}