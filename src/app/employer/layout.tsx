'use client';

import { useState, useEffect } from 'react';
import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  MessageSquare,
  Briefcase,
  ShoppingBag,
  ShoppingCart,
  Package,
  Clock,
  FileText,
  UserCheck,
  History,
  HeadphonesIcon,
  Users,
  UserPlus,
  Building,
  FileTextIcon as FileText2,
  KeyRound,
  Code,
  User,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import {
  DashboardProvider,
  useDashboard,
} from '../../contexts/dashboard-context';

function EmployerLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.includes('/login') || pathname?.includes('/register');
  const [openDropdown, setOpenDropdown] = useState('');
  const { activeTab, setActiveTab, activeSettingsTab, setActiveSettingsTab } =
    useDashboard();

  useEffect(() => {
    const isInSettingsSection = pathname?.includes('/employer/settings/');
    if (isInSettingsSection) {
      setOpenDropdown('Cài đặt tài khoản');
    }
  }, [pathname]);

  useEffect(() => {
    if (activeTab === 'settings' && openDropdown !== 'Cài đặt tài khoản') {
      setOpenDropdown('Cài đặt tài khoản');
    }
  }, [activeTab, openDropdown]);

  const toggleDropdown = (title: string) => {
    if (openDropdown === title) {
      setOpenDropdown('');
    } else {
      setOpenDropdown(title);
    }
  };

  const handleNavItemClick = (
    title: string,
    href: string,
    hasDropdown?: boolean
  ) => {
    if (hasDropdown) {
      toggleDropdown(title);
    } else {
      setOpenDropdown('');

      if (title === 'Tổng quan') {
        setActiveTab('dashboard');
      } else if (title === 'Cài đặt tài khoản') {
        setActiveTab('settings');
        setActiveSettingsTab('');
      }
    }
  };

  const handleSettingsItemClick = (subItem: {
    title: string;
    href: string;
  }) => {
    setActiveTab('settings');

    if (subItem.title === 'Người dùng đăng nhập') {
      setActiveSettingsTab('user-login');
    } else if (subItem.title === 'Danh sách người dùng') {
      setActiveSettingsTab('user-list');
    } else if (subItem.title === 'Tạo người dùng phụ') {
      setActiveSettingsTab('create-user');
    } else if (subItem.title === 'Thông tin công ty') {
      setActiveSettingsTab('company-info');
    } else if (subItem.title === 'Giấy phép kinh doanh') {
      setActiveSettingsTab('business-license');
    } else if (subItem.title === 'Đổi mật khẩu') {
      setActiveSettingsTab('change-password');
    } else if (subItem.title === 'Dịch vụ API') {
      setActiveSettingsTab('api-service');
    }
  };

  const navItems = [
    {
      title: 'Tổng quan',
      href: '/employer/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Cài đặt tài khoản',
      href: '/employer/settings',
      icon: Settings,
      hasDropdown: true,
      dropdownItems: [
        {
          title: 'Người dùng đăng nhập',
          href: '/employer/settings/users/login',
          icon: User,
        },
        {
          title: 'Danh sách người dùng',
          href: '/employer/settings/users/list',
          icon: Users,
        },
        {
          title: 'Tạo người dùng phụ',
          href: '/employer/settings/users/create',
          icon: UserPlus,
        },
        {
          title: 'Thông tin công ty',
          href: '/employer/settings/company',
          icon: Building,
        },
        {
          title: 'Giấy phép kinh doanh',
          href: '/employer/settings/license',
          icon: FileText2,
        },
        {
          title: 'Đổi mật khẩu',
          href: '/employer/settings/password',
          icon: KeyRound,
        },
        {
          title: 'Dịch vụ API',
          href: '/employer/settings/api',
          icon: Code,
        },
      ],
    },
    {
      title: 'Các gói & mua',
      href: '/employer/packages',
      icon: Package,
    },
    {
      title: 'Giỏ hàng & thanh toán',
      href: '/employer/cart',
      icon: ShoppingCart,
    },
    {
      title: 'Theo dõi đơn hàng',
      href: '/employer/orders',
      icon: ShoppingBag,
    },
    {
      title: 'Dịch vụ còn hiệu lực',
      href: '/employer/services',
      icon: Clock,
    },
    {
      title: 'Quản lý tin đăng',
      href: '/employer/jobs',
      icon: FileText,
    },
    {
      title: 'Quản lý CV ứng viên',
      href: '/employer/candidates',
      icon: UserCheck,
    },
    {
      title: 'Quản lý nhận CV',
      href: '/employer/cv-management',
      icon: Briefcase,
    },
    {
      title: 'Tin nhắn',
      href: '/employer/messages',
      icon: MessageSquare,
    },
    {
      title: 'Lịch sử hoạt động',
      href: '/employer/activity',
      icon: History,
    },
    {
      title: 'Chuyên viên CSKH',
      href: '/employer/support',
      icon: HeadphonesIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center mr-8">
              <span className="text-2xl font-bold text-green-500">
                JobFind.vn
              </span>
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-green-500">
                Giới thiệu
              </a>
              <a href="#" className="text-gray-700 hover:text-green-500">
                Đăng tin
              </a>
              <a href="#" className="text-gray-700 hover:text-green-500">
                Lọc CV
              </a>
              <a href="#" className="text-gray-700 hover:text-green-500">
                Quảng cáo banner
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthPage ? (
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Người tìm việc
              </button>
            ) : (
              <>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-md py-1 px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>ENG</option>
                    <option>VIE</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <button className="text-gray-700 hover:text-green-500 relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </button>
                </div>

                <div className="relative">
                  <button className="text-gray-700 hover:text-green-500 relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      2
                    </span>
                  </button>
                </div>

                <div className="relative group">
                  <button className="flex items-center space-x-2 bg-blue-50 rounded-md px-3 py-1.5 hover:bg-blue-100 transition-colors">
                    <span className="text-blue-600 text-sm font-medium">
                      Edward VD (NTD)
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="font-medium">Công ty ABC</p>
                      <p className="text-sm text-gray-500">
                        hr@company-abc.com
                      </p>
                    </div>
                    <a
                      href="/employer/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </a>
                    <a
                      href="/employer/company"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Thông tin công ty
                    </a>
                    <a
                      href="/employer/services"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mua dịch vụ
                    </a>
                    <div className="border-t border-gray-100 mt-1"></div>
                    <a
                      href="/logout"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </a>
                  </div>
                </div>

                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Người tìm việc
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4">
        {isAuthPage ? (
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            {children}
          </div>
        ) : (
          <div className="flex rounded-lg overflow-hidden shadow-sm">
            <div className="w-64 min-w-[240px] bg-white flex-shrink-0">
              <div className="p-4 border-b border-gray-200">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-green-500">
                    JobFind.vn
                  </span>
                </Link>
              </div>
              <div className="h-[calc(100vh-10rem)] overflow-y-auto py-4">
                <nav className="px-2">
                  {navItems.map(item => {
                    const isActive =
                      (activeTab === 'dashboard' &&
                        item.title === 'Tổng quan') ||
                      (activeTab === 'settings' &&
                        item.title === 'Cài đặt tài khoản');
                    const isOpen = openDropdown === item.title;

                    return (
                      <div key={item.href} className="mb-1">
                        {item.hasDropdown ? (
                          <>
                            <button
                              onClick={() =>
                                handleNavItemClick(
                                  item.title,
                                  item.href,
                                  item.hasDropdown
                                )
                              }
                              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                                isActive
                                  ? 'bg-green-100 text-green-700 font-medium border border-green-300'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <div className="flex items-center">
                                <item.icon
                                  className={`mr-2 h-5 w-5 ${
                                    isActive
                                      ? 'text-green-600'
                                      : 'text-gray-500'
                                  }`}
                                />
                                <span>{item.title}</span>
                              </div>
                              {isOpen ? (
                                <ChevronUp className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              )}
                            </button>

                            {isOpen && (
                              <div className="mt-1 ml-4 pl-4 border-l border-gray-200">
                                {item.dropdownItems?.map(subItem => {
                                  const isSubActive =
                                    activeTab === 'settings' &&
                                    ((subItem.title ===
                                      'Người dùng đăng nhập' &&
                                      activeSettingsTab === 'user-login') ||
                                      (subItem.title ===
                                        'Danh sách người dùng' &&
                                        activeSettingsTab === 'user-list') ||
                                      (subItem.title === 'Tạo người dùng phụ' &&
                                        activeSettingsTab === 'create-user') ||
                                      (subItem.title === 'Thông tin công ty' &&
                                        activeSettingsTab === 'company-info') ||
                                      (subItem.title ===
                                        'Giấy phép kinh doanh' &&
                                        activeSettingsTab ===
                                          'business-license') ||
                                      (subItem.title === 'Đổi mật khẩu' &&
                                        activeSettingsTab ===
                                          'change-password') ||
                                      (subItem.title === 'Dịch vụ API' &&
                                        activeSettingsTab === 'api-service'));

                                  return (
                                    <button
                                      key={subItem.href}
                                      onClick={() =>
                                        handleSettingsItemClick(subItem)
                                      }
                                      className={`flex w-full items-center px-3 py-2 my-1 text-sm rounded-md transition-colors ${
                                        isSubActive
                                          ? 'text-green-700 font-medium'
                                          : 'text-gray-700 hover:text-green-600'
                                      }`}
                                    >
                                      <subItem.icon
                                        className={`mr-2 h-4 w-4 ${
                                          isSubActive
                                            ? 'text-green-600'
                                            : 'text-gray-500'
                                        }`}
                                      />
                                      <span>{subItem.title}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        ) : (
                          <button
                            onClick={() =>
                              handleNavItemClick(item.title, item.href)
                            }
                            className={`flex w-full items-center px-3 py-2 text-sm rounded-md transition-colors ${
                              isActive
                                ? 'bg-green-100 text-green-700 font-medium'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <item.icon
                              className={`mr-2 h-5 w-5 ${
                                isActive ? 'text-green-600' : 'text-gray-500'
                              }`}
                            />
                            <span>{item.title}</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </div>
            <div className="flex-1 bg-white">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <EmployerLayoutContent>{children}</EmployerLayoutContent>
    </DashboardProvider>
  );
}
