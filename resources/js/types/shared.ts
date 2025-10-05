import type { Auth } from './auth';
import type { MenuGroup } from './menu';

export type FlashProps = {
    type: string;
    message: string;
};

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    menus: MenuGroup[];

    [key: string]: unknown;
}

export interface Meta {
    title: string;
    method: string;
    url: string;
}
