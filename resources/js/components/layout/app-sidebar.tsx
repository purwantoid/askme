import { NavGroup } from '@/components/layout/nav-group';
import { NavUser } from '@/components/layout/nav-user';
import { TeamSwitcher } from '@/components/layout/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import type { SharedData } from '@/types/shared';
import { usePage } from '@inertiajs/react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth, menus } = usePage<SharedData>().props;
    return (
        <Sidebar collapsible="icon" variant="inset" {...props}>
            <SidebarHeader>
                <TeamSwitcher currentTeam={auth?.user?.current_team} teams={auth?.user?.teams} />
            </SidebarHeader>
            <SidebarContent>
                {menus.map((props) => (
                    <NavGroup key={props.title} {...props} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={auth.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
