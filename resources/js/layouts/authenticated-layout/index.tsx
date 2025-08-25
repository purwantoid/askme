import {AppSidebar} from "@/components/layout/app-sidebar"
import {Header} from '@/components/layout/header'
import {TopNav} from '@/components/layout/top-nav'
import {ProfileDropdown} from '@/components/profile-dropdown'
import {Search} from '@/components/search'

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {ThemeSwitch} from "@/components/theme-switch"
import {Head} from "@inertiajs/react";


const topNav = [
  {
    title: 'Overview',
    href: '/dashboard',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: '/dashboard/users',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    isActive: false,
    disabled: true,
  },
]

export function AuthenticatedLayout({
    children,
    title,
    showHeader = true,
    withTopNav = true,
  }: any) {
  return (
    <>
      <Head title={title ?? 'Dashboard'}/>
      <SidebarProvider>
        <AppSidebar/>
        <SidebarInset>
          {showHeader && <Header>
            {withTopNav && <TopNav links={topNav}/>}
            {!withTopNav && <Search/>}
            <div className='ml-auto flex items-center space-x-4'>
              {withTopNav && <Search/>}
              <ThemeSwitch/>
              <ProfileDropdown/>
            </div>
          </Header>}

          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
