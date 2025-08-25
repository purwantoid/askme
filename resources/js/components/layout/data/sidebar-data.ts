import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
  IconChartBar,
  IconShoppingBag,
  IconShoppingBagDiscount,
  IconShoe,
  IconRobot,
  IconMail,
} from '@tabler/icons-react'
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'binjuhor',
    email: 'hi@binjuhor.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Tasks',
          url: '/dashboard/tasks',
          icon: IconChecklist,
        },
        {
          title: 'Mail',
          url: '/dashboard/mail',
          icon: IconMail,
        },
        {
          title: 'Apps',
          url: '/dashboard/apps',
          icon: IconPackages,
        },
        {
          title: 'Chats',
          url: '/dashboard/chats',
          badge: '3',
          icon: IconMessages,
        },
        {
          title: 'Ai Chats',
          url: '/dashboard/chat-ai',
          icon: IconRobot,
        },
        {
          title: 'Charts',
          url: '/dashboard/charts',
          icon: IconChartBar,
        },
        {
          title: 'Users',
          url: '/dashboard/users',
          icon: IconUsers,
        },
      ],
    },
    {
      title: 'Ecommerce',
      items: [
        {
          title: 'Orders',
          url: '/dashboard/orders',
          icon: IconShoppingBag,
        },
        {
          title: 'Products',
          url: '/dashboard/products',
          icon: IconShoppingBagDiscount,
        },
        {
          title: 'Product',
          url: '/dashboard/products/edit',
          icon: IconShoe,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: IconLockAccess,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-pass',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: IconBug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: IconUserOff,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/dashboard/settings',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/dashboard/settings/account',
              icon: IconTool,
            },
            {
              title: 'Appearance',
              url: '/dashboard/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/dashboard/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'Display',
              url: '/dashboard/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/dashboard/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
