import {AuthenticatedLayout} from "@/layouts"
import {Main} from '@/components/layout/main'
import UsersProvider from '../users/context/users-context'
import {useState} from "react"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs"
import {Card, CardHeader, CardTitle, CardContent, CardDescription} from "@/components/ui/card"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {Link} from "@inertiajs/react";
import {ChevronDown, ChevronUp} from "lucide-react"
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible"

type Permission = {
    name: string
    key: string
}

type Module = {
    title: string
    model: string
    permissions: Permission[]
}

const modules: Module[] = [
    {
        title: "Category",
        model: "App\\Models\\Category",
        permissions: [
            {name: "View", key: "view"},
            {name: "View Any", key: "viewAny"},
            {name: "Create", key: "create"},
            {name: "Update", key: "update"},
            {name: "Restore", key: "restore"},
            {name: "Restore Any", key: "restoreAny"},
            {name: "Delete", key: "delete"},
            {name: "Delete Any", key: "deleteAny"},
            {name: "Replicate", key: "replicate"},
            {name: "Reorder", key: "reorder"},
            {name: "Force Delete", key: "forceDelete"},
            {name: "Force Delete Any", key: "forceDeleteAny"},
        ],
    },
    {
        title: "Platform",
        model: "App\\Models\\Platform",
        permissions: [
            {name: "View", key: "view"},
            {name: "View Any", key: "viewAny"},
            {name: "Create", key: "create"},
            {name: "Update", key: "update"},
            {name: "Restore", key: "restore"},
            {name: "Restore Any", key: "restoreAny"},
            {name: "Delete", key: "delete"},
            {name: "Delete Any", key: "deleteAny"},
            {name: "Replicate", key: "replicate"},
            {name: "Reorder", key: "reorder"},
            {name: "Force Delete", key: "forceDelete"},
            {name: "Force Delete Any", key: "forceDeleteAny"},
        ],
    },

    {
        title: "Activity",
        model: "App\\Models\\Activity",
        permissions: [
            {name: "View", key: "view"},
            {name: "View Any", key: "viewAny"},
            {name: "Create", key: "create"},
            {name: "Update", key: "update"},
            {name: "Restore", key: "restore"},
            {name: "Restore Any", key: "restoreAny"},
            {name: "Delete", key: "delete"},
            {name: "Delete Any", key: "deleteAny"},
            {name: "Replicate", key: "replicate"},
            {name: "Reorder", key: "reorder"},
            {name: "Force Delete", key: "forceDelete"},
            {name: "Force Delete Any", key: "forceDeleteAny"},
        ],
    },
    {
        title: "Logs",
        model: "App\\Models\\Logs",
        permissions: [
            {name: "View", key: "view"},
            {name: "View Any", key: "viewAny"},
            {name: "Create", key: "create"},
            {name: "Update", key: "update"},
            {name: "Restore", key: "restore"},
            {name: "Restore Any", key: "restoreAny"},
            {name: "Delete", key: "delete"},
            {name: "Delete Any", key: "deleteAny"},
            {name: "Replicate", key: "replicate"},
            {name: "Reorder", key: "reorder"},
            {name: "Force Delete", key: "forceDelete"},
            {name: "Force Delete Any", key: "forceDeleteAny"},
        ],
    },

]

export default function RoleExample() {
    // state untuk selected setiap permission (kunci: `${model}.${permKey}`)
    const [selected, setSelected] = useState<Record<string, boolean>>(() => {
        const init: Record<string, boolean> = {};
        modules.forEach((m) =>
            m.permissions.forEach((p) => {
                init[`${m.model}.${p.key}`] = false;
            })
        );
        return init;
    });

    // controlled open/close per module
    const [openMap, setOpenMap] = useState<Record<string, boolean>>(
        () => Object.fromEntries(modules.map((m) => [m.model, true]))
    );

    const toggleModuleOpen = (model: string, next: boolean) =>
        setOpenMap((p) => ({...p, [model]: next}));

    const permKey = (m: Module, p: Permission) => `${m.model}.${p.key}`;

    const togglePermission = (key: string) =>
        setSelected((p) => ({...p, [key]: !p[key]}));

    const isAllSelected = (m: Module) =>
        m.permissions.every((p) => selected[permKey(m, p)]);

    const toggleSelectAllModule = (m: Module) => {
        const all = isAllSelected(m);
        setSelected((prev) => {
            const next = {...prev};
            m.permissions.forEach((p) => {
                next[permKey(m, p)] = !all;
            });
            return next;
        });
    };

    return (
        <UsersProvider>
            <AuthenticatedLayout title={"Users"}>
                <Main>
                    <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight'>Create Role</h2>
                            <p className='text-muted-foreground'>
                                Create a new role and assign permissions.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={route('roles.index')}>Cancel</Link>
                                </Button>
                                <Button size="sm">Save Product</Button>
                            </div>
                        </div>
                    </div>
                    <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                        <div className="p-0 space-y-6">

                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                    <CardDescription>
                                        Enter the basic details for the new role.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                        <div>
                                            <Label>Nama</Label>
                                            <Input placeholder="Nama role..."/>
                                        </div>
                                        <div>
                                            <Label>Guard</Label>
                                            <Input placeholder="web"/>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Tabs defaultValue="all">
                                <TabsList>
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="halaman">Halaman</TabsTrigger>
                                    <TabsTrigger value="widget">Widget</TabsTrigger>
                                    <TabsTrigger value="izin">Izin Khusus</TabsTrigger>
                                </TabsList>

                                <TabsContent value="all" className="space-y-4 mt-4">
                                    {modules.map((m) => {
                                        const isOpen = openMap[m.model];
                                        return (
                                            <Collapsible
                                                key={m.model}
                                                open={isOpen}
                                                onOpenChange={(v) => toggleModuleOpen(m.model, v)}
                                            >
                                                <Card>
                                                    <div
                                                        className="flex items-center justify-between border-b px-4 py-3">
                                                        <CollapsibleTrigger asChild>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleModuleOpen(m.model, !isOpen);
                                                                }}
                                                                className="flex items-start gap-3 cursor-pointer"
                                                                aria-label={`Toggle ${m.title}`}
                                                                type="button"
                                                            >
                                                                <div className="text-left">
                                                                    <h3 className="text-base font-semibold">{m.title}</h3>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {m.model}
                                                                    </p>
                                                                </div>
                                                            </button>
                                                        </CollapsibleTrigger>

                                                        {/* area kanan: Select all + Chevron */}
                                                        <div className="flex items-center gap-3">
                                                            <label
                                                                className="flex items-center gap-2 cursor-pointer select-none"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <Checkbox
                                                                    checked={isAllSelected(m)} // true kalau semua permission kepilih
                                                                    onCheckedChange={() => toggleSelectAllModule(m)}
                                                                />
                                                                <span className="text-sm text-muted-foreground">Select all</span>
                                                            </label>
                                                            <div
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleModuleOpen(m.model, !isOpen);
                                                                }}
                                                                className="p-1 rounded hover:bg-muted inline-flex"
                                                                aria-hidden
                                                            >
                                                                {isOpen ? (
                                                                    <ChevronUp className="h-5 w-5"/>
                                                                ) : (
                                                                    <ChevronDown className="h-5 w-5"/>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Content (checkbox grid) */}
                                                    <CollapsibleContent>
                                                        <CardContent
                                                            className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                            {m.permissions.map((p) => {
                                                                const key = permKey(m, p);
                                                                return (
                                                                    <label
                                                                        key={key}
                                                                        className="flex items-center gap-2 cursor-pointer select-none"
                                                                    >
                                                                        <Checkbox
                                                                            checked={selected[key]}
                                                                            onCheckedChange={() => togglePermission(key)}
                                                                        />
                                                                        <span>{p.name}</span>
                                                                    </label>
                                                                );
                                                            })}
                                                        </CardContent>
                                                    </CollapsibleContent>
                                                </Card>
                                            </Collapsible>
                                        );
                                    })}
                                </TabsContent>
                            </Tabs>
                            {/* Actions */}
                            <div className="flex justify-end gap-3">
                                <Button variant="outline" asChild>
                                    <Link href={route('roles.index')}>Cancel</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Main>
            </AuthenticatedLayout>
        </UsersProvider>
    )
}
