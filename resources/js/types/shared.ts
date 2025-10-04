import type { Auth } from './auth';

export type FlashProps = {
    type: string;
    message: string;
};

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;

    [key: string]: unknown;
}

export interface Meta {
    title: string;
    method: string;
    url: string;
}
