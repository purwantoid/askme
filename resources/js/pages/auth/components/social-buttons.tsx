import {Button} from "@/components/ui/button"
import {IconBrandFacebook, IconBrandGithub} from "@tabler/icons-react"

export function SocialButtons({ isLoading } : { isLoading: boolean}) {
  return <>
    <div className='relative my-2'>
      <div className='absolute inset-0 flex items-center'>
        <span className='w-full border-t'/>
      </div>
      <div className='relative flex justify-center text-xs uppercase'>
        <span className='bg-background px-2 text-muted-foreground'>
          Or continue with
        </span>
      </div>
    </div>

    <div className='flex items-center gap-2'>
      <Button
        variant='outline'
        className='w-full'
        type='button'
        disabled={isLoading}
      >
        <IconBrandGithub className='h-4 w-4'/> GitHub
      </Button>
      <Button
        variant='outline'
        className='w-full'
        type='button'
        disabled={isLoading}
      >
        <IconBrandFacebook className='h-4 w-4'/> Facebook
      </Button>
    </div>
  </>
}
