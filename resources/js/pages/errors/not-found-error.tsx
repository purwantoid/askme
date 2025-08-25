import {GoBack} from "./components/go-back"
import { Head } from '@inertiajs/react'

export default function NotFoundError() {
  return (
    <>
      <Head title='Oops! Page Not Found'/>
      <div className='h-svh'>
        <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
          <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
          <span className='font-medium'>Oops! Page Not Found!</span>
          <p className='text-center text-muted-foreground'>
            It seems like the page you're looking for <br/>
            does not exist or might have been removed.
          </p>
          <GoBack/>
        </div>
      </div>
    </>
  )
}
