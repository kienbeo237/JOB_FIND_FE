'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Briefcase,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  BarChart,
  Layers,
  Ticket,
} from 'lucide-react';

/* Hide scrollbar for Chrome, Safari and Opera */
const scrollbarHideStyle = {
  scrollbarWidth: 'none' as const,
  msOverflowStyle: 'none' as const,
  '&::-webkit-scrollbar': {
    display: 'none',
  },
} as const;

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: 'User Management',
      href: '/admin/users',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Content Management',
      href: '/admin/content',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: 'Transactions',
      href: '/admin/transactions',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: 'Vouchers & Coupons',
      href: '/admin/vouchers',
      icon: <Ticket className="h-5 w-5" />,
    },
    {
      title: 'Job Categories',
      href: '/admin/categories',
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: 'Customer Support',
      href: '/admin/support',
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: 'Tab Settings',
      href: '/admin/tab-settings',
      icon: <Layers className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={cn(
        'bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="p-4 flex items-center justify-between border-b h-12">
        {!collapsed && (
          <Link href="/admin" className="font-bold text-xl text-emerald-600">
            JobFind CMS
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none ml-auto"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex-1 py-4 overflow-y-auto" style={scrollbarHideStyle}>
        <nav className="px-2 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                collapsed ? 'justify-center' : 'justify-start',
                (item.title === 'Settings' ||
                  item.title === 'Vouchers & Coupons') &&
                  'relative'
              )}
            >
              <div className={collapsed ? '' : 'mr-3'}>{item.icon}</div>
              {!collapsed && (
                <>
                  <span>{item.title}</span>
                  {item.title === 'Settings' && (
                    <div className="ml-auto flex items-center">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    </div>
                  )}
                  {item.title === 'Vouchers & Coupons' && (
                    <div className="ml-auto">
                      <span className="px-1.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                        NEW
                      </span>
                    </div>
                  )}
                </>
              )}
              {collapsed && item.title === 'Settings' && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
              {collapsed && item.title === 'Vouchers & Coupons' && (
                <span className="absolute -top-1 -right-1 px-1 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                  N
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <Link
          href="/logout"
          className={cn(
            'flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors',
            collapsed ? 'justify-center' : 'justify-start'
          )}
        >
          <div className={collapsed ? '' : 'mr-3'}>
            <LogOut className="h-5 w-5" />
          </div>
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
}
