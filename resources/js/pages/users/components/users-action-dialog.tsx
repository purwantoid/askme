'use client';

import { MultiSelect, MultiSelectOption } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useUsers } from '@/pages/users/context/users-context';
import { statuses } from '@/pages/users/data/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { User } from '../data/schema';

const formSchema = z.object({
    name: z.string().min(1, { message: 'fullname is required.' }),
    email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Email is invalid.' }),
    roles: z.array(z.string()).optional(),
    status: z.string(),
    isEdit: z.boolean(),
});
type UserForm = z.infer<typeof formSchema>;

interface Props {
    currentRow?: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
    const isEdit = !!currentRow;
    const [roleOptions, setRoleOptions] = useState<MultiSelectOption[]>([]);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const { setShouldReload } = useUsers();

    useEffect(() => {
        if (open) {
            setLoading(true);
            fetch('/dashboard/users/roles')
                .then((res) => res.json())
                .then((data: { id: string; name: string }[]) => {
                    const options: MultiSelectOption[] = data.map((role) => ({
                        label: role.name,
                        value: role.id,
                    }));
                    setRoleOptions(options);
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => setLoading(false));
        }
    }, [open]);

    useEffect(() => {
        if (roleOptions.length === 0) return;
        const inits: string[] = [];
        roleOptions.forEach((r) => {
            currentRow?.roles.forEach((cr) => {
                if (r.value === cr.id) {
                    inits.push(r.value);
                }
            });
        });
        setSelectedValues(inits);
    }, [roleOptions, isEdit, currentRow, loading]);

    const form = useForm<UserForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                  ...currentRow,
                  roles: currentRow.roles.map((r) => r.id),
                  isEdit,
              }
            : {
                  name: '',
                  email: '',
                  status: 'active',
                  roles: [],
                  isEdit,
              },
    });

    const onSubmit = (values: UserForm) => {
        form.reset();
        const payload = {
            ...values,
            roles: selectedValues.map((v) => Number(v)).filter((n) => !isNaN(n)),
        };
        fetch('/dashboard/users/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '',
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
                setSelectedValues([]);
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
                    <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? 'Update the user here. ' : 'Create new user here. '}
                        Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="-mr-4 w-full flex-1 py-1 pr-4">
                    <Form {...form}>
                        <form id="user-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-0.5">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john.doe@gmail.com" className="col-span-4" {...field} disabled={isEdit} />
                                        </FormControl>
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fullname</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" className="col-span-4" autoComplete="off" {...field} />
                                        </FormControl>
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="roles"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                variant="secondary"
                                                options={roleOptions}
                                                responsive={true}
                                                onValueChange={setSelectedValues}
                                                defaultValue={selectedValues}
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
                                                    <SelectValue placeholder="User status" />
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
                    <Button type="submit" form="user-form">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
