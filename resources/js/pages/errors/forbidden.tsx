import {GoBack} from "./components/go-back"
import { Head } from '@inertiajs/react'

export default function ForbiddenError() {
  return (
    <>
      <Head title='Access Forbidden'/>
      <div className='h-svh'>
        <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
          <h1 className='text-[7rem] font-bold leading-tight'>403</h1>
          <span className='font-medium'>Access Forbidden</span>
          <p className='text-center text-muted-foreground'>
            You don't have necessary permission <br/>
            to view this resource.
          </p>
          <GoBack/>
        </div>
      </div>
    </>
  )
}
