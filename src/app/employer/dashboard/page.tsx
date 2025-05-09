'use client';

import {
  Calendar,
  Clock,
  Eye,
  FileCheck,
  Save,
  User,
  Users,
  UserPlus,
  Building,
  FileText,
  KeyRound,
  Code,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartTooltip } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDashboard } from '../../../contexts/dashboard-context';
import { UserLoginSettings } from '../../../components/employer/setting-tabs/user-login-settings';
import { UserListSettings } from '../../../components/employer/setting-tabs/user-list-settings';
import { CompanyInfoSettings } from '../../../components/employer/setting-tabs/company-info-settings';
import { CreateUserSettings } from '../../../components/employer/setting-tabs/create-user-settings';
import { BusinessLicenseSettings } from '../../../components/employer/setting-tabs/business-license-settings';
import { ChangePasswordSettings } from '../../../components/employer/setting-tabs/change-password-settings';
import { ApiServiceSettings } from '../../../components/employer/setting-tabs/api-service-settings';
import { useEffect, useRef } from 'react';

const timeData = [
  { name: 'T1', total: 20 },
  { name: 'T2', total: 30 },
  { name: 'T3', total: 45 },
  { name: 'T4', total: 58 },
  { name: 'T5', total: 79 },
  { name: 'T6', total: 110 },
  { name: 'T7', total: 150 },
];

const jobPositionData = [
  { name: 'Frontend Developer', value: 45, fullValue: 60 },
  { name: 'Backend Developer', value: 32, fullValue: 45 },
  { name: 'UI/UX Designer', value: 24, fullValue: 35 },
  { name: 'Project Manager', value: 18, fullValue: 30 },
  { name: 'QA Engineer', value: 28, fullValue: 40 },
  { name: 'DevOps', value: 15, fullValue: 25 },
];

export default function EmployerDashboard() {
  const { activeTab, activeSettingsTab, setActiveSettingsTab } = useDashboard();
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabsContainerRef.current) {
      const selectedTab = tabsContainerRef.current.querySelector(
        `[data-state="active"]`
      ) as HTMLElement;
      if (selectedTab) {
        const containerWidth = tabsContainerRef.current.offsetWidth;
        const tabWidth = selectedTab.offsetWidth;
        const tabLeft = selectedTab.offsetLeft;
        const scrollPosition = tabLeft - containerWidth / 2 + tabWidth / 2;

        tabsContainerRef.current.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth',
        });
      }
    }
  }, [activeSettingsTab]);

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return renderDashboardContent();
    } else if (activeTab === 'settings') {
      return renderSettingsContent();
    }
    return renderDashboardContent();
  };

  const renderDashboardContent = () => {
    return (
      <>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden">
            <CardHeader className="bg-blue-50 p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-700">
                  Tin đăng
                </CardTitle>
                <div className="rounded-full bg-white p-1.5">
                  <FileCheck className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-3">
              <div className="text-3xl font-bold text-gray-900">8</div>
              <div className="flex items-center text-xs text-green-600">
                <span className="font-medium">+12% so với tháng trước</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="bg-green-50 p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-green-700">
                  Ứng viên
                </CardTitle>
                <div className="rounded-full bg-white p-1.5">
                  <Users className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-3">
              <div className="text-3xl font-bold text-gray-900">152</div>
              <div className="flex items-center text-xs text-green-600">
                <span className="font-medium">+25% so với tháng trước</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="bg-amber-50 p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-amber-700">
                  CV đã xem
                </CardTitle>
                <div className="rounded-full bg-white p-1.5">
                  <Eye className="h-4 w-4 text-amber-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-3">
              <div className="text-3xl font-bold text-gray-900">67</div>
              <div className="flex items-center text-xs text-green-600">
                <span className="font-medium">+18% so với tháng trước</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="bg-purple-50 p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-purple-700">
                  CV đã lưu
                </CardTitle>
                <div className="rounded-full bg-white p-1.5">
                  <Save className="h-4 w-4 text-purple-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-3">
              <div className="text-3xl font-bold text-gray-900">29</div>
              <div className="flex items-center text-xs text-green-600">
                <span className="font-medium">+5% so với tháng trước</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="border-b p-4">
              <CardTitle className="text-base font-medium">
                Tổng số ứng viên theo thời gian
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={timeData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorTotal"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#c4b5fd"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="name"
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                      domain={[0, 160]}
                      ticks={[0, 40, 80, 120, 160]}
                    />
                    <Tooltip
                      formatter={value => [`${value}`, 'total']}
                      labelFormatter={label => `${label}`}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '2px',
                        padding: '8px 12px',
                      }}
                      itemStyle={{ color: '#8b5cf6' }}
                      cursor={false}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#8b5cf6"
                      fill="url(#colorTotal)"
                      strokeWidth={2}
                      activeDot={{
                        r: 4,
                        fill: 'white',
                        stroke: '#8b5cf6',
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Ứng viên theo vị trí công việc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={jobPositionData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    barCategoryGap={8}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      horizontal={true}
                    />
                    <XAxis
                      type="number"
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                      domain={[0, 60]}
                      ticks={[0, 15, 30, 45, 60]}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                      width={100}
                      tickFormatter={value => {
                        return value.split(' ').join('\n');
                      }}
                    />
                    <ChartTooltip
                      cursor={{ fill: '#f3f4f6' }}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
                              <p className="font-medium">{label}</p>
                              <p className="text-sm text-emerald-600">
                                value : {payload[0].value}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#10b981"
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="border-b p-4">
              <CardTitle className="text-base font-medium">
                Hoạt động gần đây
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <Eye className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Đã xem CV của Nguyễn Văn A
                    </p>
                    <p className="text-xs text-gray-500">Hôm nay, 10:25 AM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <Save className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Đã lưu CV của Trần Thị B
                    </p>
                    <p className="text-xs text-gray-500">Hôm qua, 15:40 PM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                    <FileCheck className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Đã đăng tin tuyển dụng mới
                    </p>
                    <p className="text-xs text-gray-500">
                      03/07/2023, 09:15 AM
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                    <User className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Đã cập nhật thông tin công ty
                    </p>
                    <p className="text-xs text-gray-500">
                      02/07/2023, 14:20 PM
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b p-4">
              <CardTitle className="text-base font-medium">
                Sắp hết hạn
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 text-red-500">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        Tin tuyển dụng Frontend Developer
                      </h3>
                      <p className="text-sm text-red-600">sẽ hết hạn</p>
                      <p className="text-sm font-medium text-red-600">
                        Còn 2 ngày
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 text-amber-500">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        Gói dịch vụ Premium
                      </h3>
                      <p className="text-sm text-amber-600">sẽ hết hạn</p>
                      <p className="text-sm font-medium text-amber-600">
                        Còn 15 ngày
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Gia hạn dịch vụ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const renderSettingsContent = () => {
    return (
      <Tabs
        value={activeSettingsTab}
        onValueChange={setActiveSettingsTab}
        className="w-full"
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Cài đặt tài khoản
          </h1>
          <div className="flex justify-center mb-2">
            <div className="relative max-w-3xl w-full mx-auto border border-gray-200 rounded-lg shadow-sm">
              <div
                className="overflow-x-auto custom-scrollbar"
                ref={tabsContainerRef}
              >
                <TabsList className="bg-gray-100 p-1 inline-flex w-auto min-w-full">
                  <TabsTrigger
                    value="user-login"
                    className="data-[state=active]:bg-white whitespace-nowrap px-4"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Người dùng đăng nhập
                  </TabsTrigger>
                  <TabsTrigger
                    value="user-list"
                    className="data-[state=active]:bg-white whitespace-nowrap px-4"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Danh sách người dùng
                  </TabsTrigger>
                  <TabsTrigger
                    value="create-user"
                    className="data-[state=active]:bg-white whitespace-nowrap px-4"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Tạo người dùng phụ
                  </TabsTrigger>
                  <TabsTrigger
                    value="company-info"
                    className="data-[state=active]:bg-white whitespace-nowrap px-4"
                  >
                    <Building className="h-4 w-4 mr-2" />
                    Thông tin công ty
                  </TabsTrigger>
                  <TabsTrigger
                    value="business-license"
                    className="data-[state=active]:bg-white whitespace-nowrap px-4"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Giấy phép kinh doanh
                  </TabsTrigger>
                  <TabsTrigger
                    value="change-password"
                    className="data-[state=active]:bg-white whitespace-nowrap px-4"
                  >
                    <KeyRound className="h-4 w-4 mr-2" />
                    Đổi mật khẩu
                  </TabsTrigger>
                  <TabsTrigger
                    value="api-service"
                    className="data-[state=active]:bg-white whitespace-nowrap px-4"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Dịch vụ API
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </div>
        </div>

        <TabsContent
          value="user-login"
          className="transition-all duration-300 ease-in-out"
        >
          <UserLoginSettings />
        </TabsContent>
        <TabsContent
          value="user-list"
          className="transition-all duration-300 ease-in-out"
        >
          <UserListSettings
            onCreateUser={() => setActiveSettingsTab('create-user')}
          />
        </TabsContent>
        <TabsContent
          value="create-user"
          className="transition-all duration-300 ease-in-out"
        >
          <CreateUserSettings />
        </TabsContent>
        <TabsContent
          value="company-info"
          className="transition-all duration-300 ease-in-out"
        >
          <CompanyInfoSettings />
        </TabsContent>
        <TabsContent
          value="business-license"
          className="transition-all duration-300 ease-in-out"
        >
          <BusinessLicenseSettings />
        </TabsContent>
        <TabsContent
          value="change-password"
          className="transition-all duration-300 ease-in-out"
        >
          <ChangePasswordSettings />
        </TabsContent>
        <TabsContent
          value="api-service"
          className="transition-all duration-300 ease-in-out"
        >
          <ApiServiceSettings />
        </TabsContent>
      </Tabs>
    );
  };

  return <div className="flex-1 bg-gray-50 p-6">{renderContent()}</div>;
}
