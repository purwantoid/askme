import { PropsWithChildren } from 'react';
import { Header } from './header';

export function PageLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
    return (
        <>
            <Header title={title} />
            <main>{children}</main>
        </>
    );
}
