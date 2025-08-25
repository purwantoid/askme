import { HTMLAttributes } from 'react'
import { Link, useForm } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { Label } from '@/components/ui/label'
import InputError from '@/components/InputError'

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('register'), {
      preserveScroll: true,
      onSuccess: () => {
        reset('password', 'password_confirmation');
      },
    });
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit} noValidate>
        <div className='grid gap-4'>
          <div className='space-y-1'>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              aria-invalid={!!errors.name}
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          <div className='space-y-1'>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="username"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              aria-invalid={!!errors.email}
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className='space-y-1'>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Create a password"
              autoComplete="new-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              aria-invalid={!!errors.password}
            />
            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className='space-y-1'>
            <Label htmlFor="password_confirmation">Confirm Password</Label>
            <PasswordInput
              id="password_confirmation"
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              aria-invalid={!!errors.password_confirmation}
            />
            <InputError message={errors.password_confirmation} className="mt-2" />
          </div>

          <div className="flex items-center justify-between mt-2">
            <Link
              href={route('login')}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Already have an account?
            </Link>

            <Button type="submit" disabled={processing}>
              {processing ? 'Creating account...' : 'Create account'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
