import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { usePriorities } from '@/pages/administration/priority/context/priority-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Priority, statuses } from '../data/schema';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    value: z.coerce.number().min(1, { message: 'Value is required' }),
    status: z.string(),
    isEdit: z.boolean(),
});

type PriorityForm = z.infer<typeof formSchema>;

interface Props {
    currentRow?: Priority;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PriorityActionDialog({ currentRow, open, onOpenChange }: Props) {
    const isEdit = !!currentRow;
    const { csrf_token } = usePage().props as unknown as { csrf_token: string };
    const [loading, setLoading] = useState(false);
    const { setShouldReload } = usePriorities();

    const form = useForm<PriorityForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                  ...currentRow,
                  isEdit,
              }
            : {
                  name: '',
                  value: 0,
                  status: '',
                  isEdit,
              },
    });

    const onSubmit = (values: PriorityForm) => {
        form.reset();
        const payload = {
            ...values,
        };
        fetch('/dashboard/priority/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf_token,
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((data) => {
                toast({
                    title: 'User saved successfully',
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                        </pre>
                    ),
                });
                setShouldReload(true);
                onOpenChange(false);
            })
            .catch((err) => {
                console.error(err);
                toast({
                    title: 'Error',
                    description: 'Failed to save role.',
                    variant: 'destructive',
                });
            });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                form.reset();
                onOpenChange(state);
            }}
        >
            <DialogContent className="flex max-w-2xl flex-col">
                <DialogHeader className="text-left">
                    <DialogTitle>{isEdit ? 'Edit Priority' : 'Add New Priority'}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? 'Update the priority here. ' : 'Create new priority here. '}
                        Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="-mr-4 w-full flex-1 py-1 pr-4">
                    <Form {...form}>
                        <form id="priority-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-0.5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Input priority name ..." className="col-span-4" {...field} disabled={isEdit} />
                                        </FormControl>
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="value"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Value</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Input priority value..."
                                                className="col-span-4"
                                                type="number"
                                                step="any"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {statuses.map(({ label, value }) => (
                                                    <SelectItem key={value} value={value}>
                                                        {label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </ScrollArea>
                <DialogFooter>
                    <Button type="submit" form="priority-form">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
