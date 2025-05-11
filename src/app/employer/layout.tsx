'use client';

import { useState, useEffect, useRef } from 'react';
import type React from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  MessageSquare,
  Briefcase,
  ShoppingBag,
  ShoppingCartIcon,
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
  ChevronUpIcon,
  ChevronDownIcon,
  X,
  Menu,
} from 'lucide-react';
import { DashboardProvider, useDashboard } from '@/contexts/dashboard-context';
import { Bell, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PostJobForm from '@/components/employer/post-job-form';
import CVFilterContent from '@/components/employer/cv-filter-content';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';

function EmployerLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.includes('/login') || pathname?.includes('/register');
  const [openDropdown, setOpenDropdown] = useState('');
  const { activeTab, setActiveTab, activeSettingsTab, setActiveSettingsTab } =
    useDashboard();
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getTotalCartItems = () => {
    if (typeof window === 'undefined') return 0;

    try {
      const jobPostingItems = JSON.parse(
        localStorage.getItem('jobPostingCart') || '[]'
      );
      const cvFilteringItems = JSON.parse(
        localStorage.getItem('cvFilteringCart') || '[]'
      );
      const bannerItems = JSON.parse(
        localStorage.getItem('bannerCart') || '[]'
      );

      const totalItems = [
        ...jobPostingItems,
        ...cvFilteringItems,
        ...bannerItems,
      ].reduce((total, item) => total + (item.quantity || 0), 0);

      return totalItems;
    } catch (error) {
      console.error('Error getting cart items:', error);
      return 0;
    }
  };

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getTotalCartItems());
    };

    window.addEventListener('storage', updateCartCount);

    window.addEventListener('cartUpdated', updateCartCount);

    updateCartCount();

    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleSetActiveTab = (event: CustomEvent) => {
      if (event.detail === 'post-job') {
        setActiveTab('post-job');
      } else if (event.detail === 'cv-filter') {
        setActiveTab('cv-filter');
      } else if (event.detail === 'banner') {
        setActiveTab('banner');
      }
    };

    window.addEventListener(
      'setActiveTab',
      handleSetActiveTab as EventListener
    );

    return () => {
      window.removeEventListener(
        'setActiveTab',
        handleSetActiveTab as EventListener
      );
    };
  }, [setActiveTab]);

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
      } else if (title === 'Các gói & mua') {
        setActiveTab('packages');
        setActiveSettingsTab('');
      } else if (title === 'Giỏ hàng & thanh toán') {
        setActiveTab('cart');
        setActiveSettingsTab('');
      } else if (title === 'Theo dõi đơn hàng') {
        setActiveTab('orders');
        setActiveSettingsTab('');
      } else if (title === 'Dịch vụ còn hiệu lực') {
        setActiveTab('services');
        setActiveSettingsTab('');
      } else if (title === 'Quản lý tin đăng') {
        setActiveTab('jobs');
        setActiveSettingsTab('');
      } else if (title === 'Quản lý CV ứng viên') {
        setActiveTab('candidates');
        setActiveSettingsTab('');
      } else if (title === 'Quản lý nhãn CV') {
        setActiveTab('cv-labels');
        setActiveSettingsTab('');
      } else if (title === 'Tin nhắn') {
        setActiveTab('messages');
        setActiveSettingsTab('');
      } else if (title === 'Lịch sử hoạt động') {
        setActiveTab('activity');
        setActiveSettingsTab('');
      } else if (title === 'Chuyên viên CSKH') {
        setActiveTab('support');
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
      icon: ShoppingCartIcon,
      onClick: () => setActiveTab('cart'),
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
      title: 'Quản lý nhãn CV',
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

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold text-green-600">
                JobFind.vn
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/employer/jobs"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Giới thiệu
              </Link>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const event = new CustomEvent('setActiveTab', {
                      detail: 'post-job',
                    });
                    window.dispatchEvent(event);

                    setMobileMenuOpen(false);
                  }
                }}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Đăng tin
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const event = new CustomEvent('setActiveTab', {
                      detail: 'cv-filter',
                    });
                    window.dispatchEvent(event);

                    setMobileMenuOpen(false);
                  }
                }}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Lọc CV
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const event = new CustomEvent('setActiveTab', {
                      detail: 'banner',
                    });
                    window.dispatchEvent(event);

                    setMobileMenuOpen(false);
                  }
                }}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Quảng cáo banner
              </button>
            </nav>

            {/* Right Side Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-1 pl-2 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>ENG</option>
                  <option>VIE</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDownIcon size={14} />
                </div>
              </div>

              <Link
                href="/employer/notifications"
                className="text-gray-700 relative hover:text-green-600 transition-colors"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  3
                </span>
              </Link>

              <Link
                href="/employer/cart"
                className="text-gray-700 relative hover:text-green-600 transition-colors"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-1 cursor-pointer bg-blue-100 px-3 py-1.5 rounded-md hover:bg-blue-200 transition-colors"
                >
                  <span className="text-blue-700">Edward VŨ (NTD)</span>
                  {dropdownOpen ? (
                    <ChevronUpIcon size={16} className="text-blue-500" />
                  ) : (
                    <ChevronDownIcon size={16} className="text-blue-500" />
                  )}
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg p-2 w-56 z-50 border border-gray-100">
                    <div className="border-b pb-2 mb-2">
                      <p className="font-medium px-3 py-1">Công ty ABC</p>
                      <p className="text-sm text-gray-500 px-3">
                        hr@company-abc.com
                      </p>
                    </div>
                    <Link
                      href="/employer/dashboard"
                      className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/employer/settings/profile"
                      className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    >
                      Thông tin công ty
                    </Link>
                    <Link
                      href="/employer/buy"
                      className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    >
                      Mua dịch vụ
                    </Link>
                    <div className="border-t pt-2 mt-2">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Button
                asChild
                variant="default"
                className="bg-green-600 hover:bg-green-700"
              >
                <Link href="/">Người tìm việc</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 bg-white shadow-lg rounded-lg mt-2">
              <div className="space-y-2 px-4">
                <Link
                  href="/employer/jobs"
                  className="block text-gray-700 hover:text-green-600 py-2 transition-colors"
                >
                  Giới thiệu
                </Link>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      const event = new CustomEvent('setActiveTab', {
                        detail: 'post-job',
                      });
                      window.dispatchEvent(event);

                      setMobileMenuOpen(false);
                    }
                  }}
                  className="block text-left w-full text-gray-700 hover:text-green-600 py-2 transition-colors"
                >
                  Đăng tin
                </button>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      const event = new CustomEvent('setActiveTab', {
                        detail: 'cv-filter',
                      });
                      window.dispatchEvent(event);

                      setMobileMenuOpen(false);
                    }
                  }}
                  className="block text-left w-full text-gray-700 hover:text-green-600 py-2 transition-colors"
                >
                  Lọc CV
                </button>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      const event = new CustomEvent('setActiveTab', {
                        detail: 'banner',
                      });
                      window.dispatchEvent(event);

                      setMobileMenuOpen(false);
                    }
                  }}
                  className="block text-left w-full text-gray-700 hover:text-green-600 py-2 transition-colors"
                >
                  Quảng cáo banner
                </button>

                <div className="border-t border-gray-100 my-2 pt-2">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium">Edward VŨ (NTD)</span>
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                      NTD
                    </span>
                  </div>
                  <Link
                    href="/employer/dashboard"
                    className="block text-gray-700 hover:text-green-600 py-2 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/employer/settings/profile"
                    className="block text-gray-700 hover:text-green-600 py-2 transition-colors"
                  >
                    Thông tin công ty
                  </Link>
                  <Link
                    href="/employer/buy"
                    className="block w-full text-left py-2 px-3 text-gray-700 hover:text-green-600 rounded transition-colors"
                  >
                    Mua dịch vụ
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-gray-700 hover:text-green-600 py-2 transition-colors"
                  >
                    Đăng xuất
                  </button>
                </div>

                <Link
                  href="/"
                  className="flex items-center justify-center bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                >
                  Người tìm việc
                </Link>
              </div>
            </div>
          )}
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
              <div className="p-4 border-b border-gray-200"></div>
              <div className="h-[calc(100vh-10rem)] overflow-y-auto py-4">
                <nav className="px-2">
                  {navItems.map(item => {
                    const isActive =
                      (activeTab === 'dashboard' &&
                        item.title === 'Tổng quan') ||
                      (activeTab === 'settings' &&
                        item.title === 'Cài đặt tài khoản') ||
                      (activeTab === 'packages' &&
                        item.title === 'Các gói & mua') ||
                      (activeTab === 'cart' &&
                        item.title === 'Giỏ hàng & thanh toán') ||
                      (activeTab === 'orders' &&
                        item.title === 'Theo dõi đơn hàng') ||
                      (activeTab === 'services' &&
                        item.title === 'Dịch vụ còn hiệu lực') ||
                      (activeTab === 'jobs' &&
                        item.title === 'Quản lý tin đăng') ||
                      (activeTab === 'candidates' &&
                        item.title === 'Quản lý CV ứng viên') ||
                      (activeTab === 'cv-labels' &&
                        item.title === 'Quản lý nhãn CV') ||
                      (activeTab === 'messages' && item.title === 'Tin nhắn') ||
                      (activeTab === 'activity' &&
                        item.title === 'Lịch sử hoạt động') ||
                      (activeTab === 'support' &&
                        item.title === 'Chuyên viên CSKH');

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
                                <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                              )}
                            </button>

                            {isOpen && (
                              <div className="mt-1 ml-4 pl-4 border-l border-gray-200 w-full">
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
                                      className={`flex w-full items-center px-3 py-2 my-1 text-sm rounded-md transition-colors whitespace-nowrap overflow-hidden ${
                                        isSubActive
                                          ? 'text-green-700 font-medium'
                                          : 'text-gray-700 hover:text-green-600'
                                      }`}
                                    >
                                      <subItem.icon
                                        className={`mr-2 h-4 w-4 flex-shrink-0 ${
                                          isSubActive
                                            ? 'text-green-600'
                                            : 'text-gray-500'
                                        }`}
                                      />
                                      <span className="truncate">
                                        {subItem.title}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        ) : (
                          <button
                            onClick={() =>
                              item.onClick
                                ? item.onClick()
                                : handleNavItemClick(item.title, item.href)
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
            <div className="flex-1 bg-white">
              {activeTab === 'post-job' ? (
                <PostJobForm />
              ) : activeTab === 'cv-filter' ? (
                <CVFilterContent />
              ) : activeTab === 'banner' ? (
                <div className="p-6">
                  <h1 className="text-xl font-medium mb-6 text-teal-700">
                    Lựa chọn dịch vụ đăng banner còn hiệu lực
                  </h1>

                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Sản phẩm
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Số lượng hiện tại
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Thao tác
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Số lượng còn lại
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                id: 'mainBanner',
                                name: 'Banner trang chủ (1500 x 350)',
                                currentAmount: 3,
                                remainingAmount: 2,
                                previewLink: '#',
                              },
                              {
                                id: 'leftSubBanner',
                                name: 'Sub Banner Trái (220 x 30)',
                                currentAmount: 2,
                                remainingAmount: 2,
                                previewLink: '#',
                              },
                              {
                                id: 'rightSubBanner',
                                name: 'Sub Banner Phải (220 x 30)',
                                currentAmount: 0,
                                remainingAmount: 0,
                                previewLink: '#',
                              },
                            ].map((service, index) => (
                              <tr
                                key={service.id}
                                className={
                                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                }
                              >
                                <td className="px-4 py-4">
                                  <div className="flex flex-col">
                                    <span className="font-medium text-gray-800">
                                      {service.name}
                                    </span>
                                    <a
                                      href={service.previewLink}
                                      className="text-sm text-green-600 hover:underline"
                                    >
                                      Xem mẫu tả
                                    </a>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                  {service.currentAmount}
                                </td>
                                <td className="px-4 py-4 text-center">
                                  <RadioGroup
                                    defaultValue={index === 0 ? service.id : ''}
                                  >
                                    <div className="flex justify-center">
                                      <RadioGroupItem
                                        value={service.id}
                                        id={service.id}
                                        disabled={service.currentAmount === 0}
                                        className="text-green-600"
                                      />
                                    </div>
                                  </RadioGroup>
                                </td>
                                <td className="px-4 py-4 text-center">
                                  {service.remainingAmount}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-10">
                        <h2 className="text-lg font-medium mb-4">
                          Tải Banner lên để duyệt
                        </h2>
                        <div className="bg-gray-100 border border-gray-200 rounded-md p-4 mb-6">
                          <p className="text-gray-700">
                            File Png, Jpeg dưới 5 MB
                          </p>
                        </div>

                        <div className="flex space-x-4">
                          <Button
                            variant="outline"
                            className="border-teal-600 text-teal-600 hover:bg-teal-50 w-1/3"
                          >
                            Xem trước
                          </Button>
                          <Button className="bg-teal-600 hover:bg-teal-700 w-2/3">
                            Gửi đề xuất
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-teal-600 text-white p-6 rounded-md">
                    <h3 className="font-medium text-lg mb-2">
                      Gói dịch vụ đăng banner trang chủ 10 ngày
                    </h3>
                    <p>
                      Hiển thị banner quảng cáo trên trang chủ với vị trí đẹp,
                      thu hút nhiều lượt xem từ ứng viên tiềm năng.
                    </p>
                  </div>
                </div>
              ) : (
                children
              )}
            </div>
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
