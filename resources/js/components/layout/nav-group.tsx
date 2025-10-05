import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { Menu, MenuGroup } from '@/types/menu';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';
import { Badge } from '../ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import IconWrap from '@/components/icon-wrap';
import * as TablerIcons from '@tabler/icons-react';
import { IconHelpCircle, IconLayoutDashboard } from '@tabler/icons-react';
const Icons = TablerIcons as unknown as Record<string, React.ElementType>;

export function NavGroup({ title, items }: MenuGroup) {
    const { state } = useSidebar();
    // const href = useLocation({ select: (location) => location.href })
    const { url: href } = usePage();
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const key = `${item.title}-${item.url}`;

                    if (!item.items) return <SidebarMenuLink key={key} item={item} href={href} />;

                    if (state === 'collapsed') return <SidebarMenuCollapsedDropdown key={key} item={item} href={href} />;

                    return <SidebarMenuCollapsible key={key} item={item} href={href} />;
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

const NavBadge = ({ children }: { children: ReactNode }) => <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>;

const SidebarMenuLink = ({ item, href }: { item: Menu; href: string }) => {
    const { setOpenMobile } = useSidebar();
    const Icon = Icons[item?.icon ?? ''] ?? IconHelpCircle;
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={checkIsActive(href, item)} tooltip={item.title}>
                <Link href={item.url} onClick={() => setOpenMobile(false)} className="size-10">
                    {/*{Icon && <Icon className="!h-5 !w-5" />}*/}
                    <IconWrap icon={IconLayoutDashboard} size={100} />
                    <span>{item.title}</span>
                    {item.badge && <NavBadge>{item.badge}</NavBadge>}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

const SidebarMenuCollapsible = ({ item, href }: { item: Menu; href: string }) => {
    const { setOpenMobile } = useSidebar();
    const Icon = Icons[item?.icon ?? ''] ?? IconHelpCircle;
    return (
        <Collapsible asChild defaultOpen={checkIsActive(href, item, true)} className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                        {Icon && <Icon size={40} />}
                        <span>{item.title}</span>
                        {item.badge && <NavBadge>{item.badge}</NavBadge>}
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="CollapsibleContent">
                    <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={checkIsActive(href, subItem)}>
                                    <Link href={subItem.url} onClick={() => setOpenMobile(false)}>
                                        {/*{subItem.icon && <subItem.icon />}*/}
                                        <span>{subItem.title}</span>
                                        {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
};

const SidebarMenuCollapsedDropdown = ({ item, href }: { item: Menu; href: string }) => {
    const Icon = Icons[item?.icon ?? ''] ?? IconHelpCircle;
    return (
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} isActive={checkIsActive(href, item)}>
                        {Icon && <Icon />}
                        <span>{item.title}</span>
                        {item.badge && <NavBadge>{item.badge}</NavBadge>}
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" sideOffset={4}>
                    <DropdownMenuLabel>
                        {item.title} {item.badge ? `(${item.badge})` : ''}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.items?.map((sub) => (
                        <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
                            <Link href={sub.url} className={`${checkIsActive(href, sub) ? 'bg-secondary' : ''}`}>
                                {/*{sub.icon && <sub.icon />}*/}
                                <span className="max-w-52 text-wrap">{sub.title}</span>
                                {sub.badge && <span className="ml-auto text-xs">{sub.badge}</span>}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
};

function checkIsActive(href: string, item: Menu, mainNav = false) {
    return (
        href === item.url || // /endpint?search=param
        href.split('?')[0] === item.url || // endpoint
        !!item?.items?.filter((i) => i.url === href).length || // if child nav is active
        (mainNav && href.split('/')[1] !== '' && href.split('/')[1] === item?.url?.split('/')[1])
    );
}
