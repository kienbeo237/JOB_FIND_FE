'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { JobPostingServices } from './service-tabs/job-posting-services';
import { JobPostingSupport } from './service-tabs/job-posting-support';
import { CvFilteringServices } from './service-tabs/cv-filtering-services';
import { BannerAdvertising } from './service-tabs/banner-advertising';

export function PackagesPurchaseSettings() {
  const [activeTab, setActiveTab] = useState('job-posting');

  const [quantities, setQuantities] = useState({
    premium: { '1': 0, '5': 0, '12': 0, '25': 0 },
    premiumPlus: { '1': 0, '5': 0, '12': 0, '25': 0 },
    executive: { '1': 0, '5': 0, '12': 0, '25': 0 },
    brand: { '1': 0, '5': 0, '12': 0, '25': 0 },
    lightUp: { '30': 0 },
    urgent: { '30': 0 },
    hotJob: { '30': 0 },
    homepage: { '5': 0, '10': 0, '15': 0 },
  });

  const handleQuantityChange = (
    packageName: string,
    period: string,
    change: number
  ) => {
    setQuantities(prev => {
      const currentValue = prev[packageName]?.[period] || 0;
      const newValue = Math.max(0, currentValue + change);
      return {
        ...prev,
        [packageName]: {
          ...prev[packageName],
          [period]: newValue,
        },
      };
    });
  };

  const calculateTotal = (basePrice: number, quantity: number = 0): number => {
    return basePrice * quantity;
  };

  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Sản phẩm & dịch vụ
            </h2>
            <p className="text-gray-500 mt-1">
              Chọn gói dịch vụ phù hợp với nhu cầu của bạn
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-gray-100 p-1 mb-6">
              <TabsTrigger
                value="job-posting"
                className="data-[state=active]:bg-white"
              >
                Dịch vụ đăng tuyển
              </TabsTrigger>
              <TabsTrigger
                value="cv-search"
                className="data-[state=active]:bg-white"
              >
                Bổ trợ đăng tuyển
              </TabsTrigger>
              <TabsTrigger
                value="branding"
                className="data-[state=active]:bg-white"
              >
                Dịch vụ lọc CV
              </TabsTrigger>
              <TabsTrigger
                value="other-services"
                className="data-[state=active]:bg-white"
              >
                Quảng cáo banner
              </TabsTrigger>
            </TabsList>

            <TabsContent value="job-posting" className="space-y-6">
              <JobPostingServices
                quantities={quantities}
                handleQuantityChange={handleQuantityChange}
                formatPrice={formatPrice}
                calculateTotal={calculateTotal}
              />
            </TabsContent>

            <TabsContent value="cv-search" className="space-y-6">
              <JobPostingSupport
                quantities={quantities}
                handleQuantityChange={handleQuantityChange}
                formatPrice={formatPrice}
                calculateTotal={calculateTotal}
              />
            </TabsContent>

            <TabsContent value="branding" className="space-y-8">
              <CvFilteringServices
                quantities={quantities}
                handleQuantityChange={handleQuantityChange}
                formatPrice={formatPrice}
                calculateTotal={calculateTotal}
              />
            </TabsContent>

            <TabsContent value="other-services" className="space-y-8">
              <BannerAdvertising
                quantities={quantities}
                handleQuantityChange={handleQuantityChange}
                formatPrice={formatPrice}
                calculateTotal={calculateTotal}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default PackagesPurchaseSettings;
