import { Card } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'
import {TermPrivacyLink, SocialButtons} from "@/pages/auth/components";

export default function SignIn({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  return (
    <AuthLayout title={"Login"}>
      <Card className='p-6'>
        <div className='flex flex-col space-y-2 text-left'>
          <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email and password below <br />
            to log into your account
          </p>
        </div>
        <UserAuthForm canResetPassword={canResetPassword} status={status} />
        <TermPrivacyLink privacyLink={'#'} termLink={'#'} />
        <SocialButtons isLoading={false}/>
      </Card>
    </AuthLayout>
  )
}
