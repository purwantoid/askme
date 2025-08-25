import { Header } from "./header";
import { PropsWithChildren } from 'react';

export function PageLayout({
    children,
    title,
  }: PropsWithChildren<{ title?: string }>) {
  return (
    <>
      <Header title={title}/>
      <main>
        {children}
      </main>
    </>
  )
}
