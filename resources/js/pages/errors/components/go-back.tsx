import {Button} from "@/components/ui/button";
import {router} from "@inertiajs/react";

export function GoBack() {
  return <div className='mt-6 flex gap-4'>
    <Button variant='outline' onClick={() => window.history.back()}>
      Go Back
    </Button>
    <Button onClick={() => router.visit('/')}>Back to Home</Button>
  </div>
}
