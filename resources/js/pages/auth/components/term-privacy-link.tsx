import {Link} from "@inertiajs/react";

export function TermPrivacyLink({termLink='', privacyLink = ''}) {
  return (
    <>
      <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
        By clicking login, you agree to our{' '}
        <Link
          href={termLink}
          className='underline underline-offset-4 hover:text-primary'
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href={privacyLink}
          className='underline underline-offset-4 hover:text-primary'
        >
          Privacy Policy
        </Link>
        .
      </p>
    </>
  )
}
