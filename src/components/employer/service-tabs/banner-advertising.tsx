'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useDashboard } from '@/contexts/dashboard-context';

type QuantityState = {
  [key: string]: {
    [key: string]: number;
  };
};

interface BannerAdvertisingProps {
  quantities: QuantityState;
  handleQuantityChange: (
    packageName: string,
    period: string,
    change: number
  ) => void;
  formatPrice: (price: number) => string;
  calculateTotal: (basePrice: number, quantity: number) => number;
}

export function BannerAdvertising({
  quantities,
  handleQuantityChange,
  formatPrice,
  calculateTotal,
}: BannerAdvertisingProps) {
  const [activeBannerPackage, setActiveBannerPackage] =
    useState<string>('banner-homepage');
  const [totalItems, setTotalItems] = useState(0);
  const { toast } = useToast();
  const { setActiveTab } = useDashboard();

  const handleAddToCart = useCallback(
    (packageName: string, period: string, price: number, quantity: number) => {
      if (quantity <= 0) {
        toast({
          title: 'Số lượng không hợp lệ',
          description: 'Vui lòng chọn số lượng lớn hơn 0.',
          variant: 'destructive',
        });
        return;
      }

      const existingCart = JSON.parse(
        localStorage.getItem('bannerCart') || '[]'
      );

      const existingItemIndex = existingCart.findIndex(
        (item: any) => item.name === period && item.packageTitle === packageName
      );

      // Find the package benefits based on the package title
      let benefits = [];
      Object.values(bannerPackages).forEach(pkg => {
        if (pkg.title === packageName) {
          benefits = pkg.benefits;
        }
      });

      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push({
          id: Date.now(),
          name: period,
          packageTitle: packageName,
          price: price,
          quantity: quantity,
          description: benefits,
        });
      }

      localStorage.setItem('bannerCart', JSON.stringify(existingCart));

      updateTotalItems();

      toast({
        title: 'Đã thêm vào giỏ hàng',
        description: `Đã thêm ${quantity} ${period} vào giỏ hàng.`,
      });

      // Change to cart tab
      setActiveTab('cart');
    },
    [setActiveTab, toast]
  );

  const updateTotalItems = useCallback(() => {
    const cart = JSON.parse(localStorage.getItem('bannerCart') || '[]');
    const count = cart.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    );
    setTotalItems(count);
  }, []);

  useEffect(() => {
    updateTotalItems();
  }, [updateTotalItems]);

  const bannerPackages = {
    'banner-homepage': {
      title: 'Gói Banner Trang Chủ',
      gradient: 'from-purple-500 to-pink-500',
      benefits: [
        'Được đăng banner 1350 x 350 pixel',
        'Quảng cáo chiến dịch ngay trang chủ',
        'Thể hiện giá trị thương hiệu',
        'Phục vụ chiến dịch tuyển dụng lớn',
        'Thu hút lượng lớn ứng viên quan tâm',
      ],
      pricing: [
        { period: '10 ngày', price: 14000000 },
        { period: '20 ngày', price: 20533000 },
        { period: '30 ngày', price: 28225000 },
      ],
    },
    'sub-banner-left': {
      title: 'Gói Sub Banner Trái',
      gradient: 'from-amber-500 to-orange-500',
      benefits: [
        'Được đăng banner 350 x 35 pixel',
        'Quảng cáo chiến dịch ngay trang chủ',
        'Tiếp cận nhiều ứng viên',
        'Phục vụ tốt chiến dịch tuyển dụng',
        'Thu hút nhân sự chất lượng',
        'Được lựa chọn khung banner hợp lý',
      ],
      pricing: [
        { period: '10 ngày', price: 6325000 },
        { period: '20 ngày', price: 9276000 },
        { period: '30 ngày', price: 12650000 },
      ],
    },
    'sub-banner-right': {
      title: 'Gói Sub Banner Phải',
      gradient: 'from-green-500 to-teal-500',
      benefits: [
        'Được đăng banner 350 x 35 pixel',
        'Quảng cáo chiến dịch ngay trang chủ',
        'Tiếp cận nhiều ứng viên',
        'Phục vụ tốt chiến dịch tuyển d��ng',
        'Thu hút nhân sự chất lượng',
        'Được lựa chọn khung banner hợp lý',
      ],
      pricing: [
        { period: '10 ngày', price: 6075000 },
        { period: '20 ngày', price: 8910000 },
        { period: '30 ngày', price: 12150000 },
      ],
    },
    'top-employer-logo': {
      title: 'Gói Top Employer Logo',
      gradient: 'from-blue-500 to-cyan-500',
      benefits: [
        'Được đăng logo 40 x 40 pixel',
        'Hiển thị logo trong mục nhà tuyển dụng hàng đầu',
        'Xuất hiện ngay trên trang chủ',
        'Gia tăng uy tín với ứng viên',
        'Được sử dụng dịch vụ với chi phí hợp lý',
      ],
      pricing: [
        { period: '10 ngày', price: 4500000 },
        { period: '20 ngày', price: 6600000 },
        { period: '30 ngày', price: 9100000 },
      ],
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Dịch Vụ Quảng Cáo Banner
        </h2>

        {totalItems > 0 && (
          <Button
            variant="outline"
            className="bg-green-50 text-green-600 border-green-300 hover:bg-green-100"
          >
            <ShoppingBag className="mr-2" size={16} />
            Xem Giỏ Hàng ({totalItems})
          </Button>
        )}
      </div>

      {/* Package Selection Bar */}
      <div className="flex overflow-x-auto pb-2 mb-2 border-b">
        <button
          onClick={() => setActiveBannerPackage('banner-homepage')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg mr-1 transition-colors ${
            activeBannerPackage === 'banner-homepage'
              ? 'bg-purple-100 text-purple-700 border-b-2 border-purple-500'
              : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
          }`}
        >
          Gói Banner Trang Chủ
        </button>
        <button
          onClick={() => setActiveBannerPackage('sub-banner-left')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg mx-1 transition-colors ${
            activeBannerPackage === 'sub-banner-left'
              ? 'bg-amber-100 text-amber-700 border-b-2 border-amber-500'
              : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
          }`}
        >
          Gói Sub Banner Trái
        </button>
        <button
          onClick={() => setActiveBannerPackage('sub-banner-right')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg mx-1 transition-colors ${
            activeBannerPackage === 'sub-banner-right'
              ? 'bg-emerald-100 text-emerald-700 border-b-2 border-emerald-500'
              : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
          }`}
        >
          Gói Sub Banner Phải
        </button>
        <button
          onClick={() => setActiveBannerPackage('top-employer-logo')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg ml-1 transition-colors ${
            activeBannerPackage === 'top-employer-logo'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500'
              : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
          }`}
        >
          Gói Top Employer Logo
        </button>
      </div>

      {/* Active Package Content */}
      {Object.entries(bannerPackages).map(
        ([key, pkg]) =>
          activeBannerPackage === key && (
            <div
              key={key}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              {/* Package Header */}
              <div
                className={`bg-gradient-to-r ${pkg.gradient} p-6 text-white`}
              >
                <h3 className="text-2xl font-bold">{pkg.title}</h3>
                <p className="text-white/80 mt-1">
                  Quảng cáo hiệu quả, tiếp cận đúng ứng viên
                </p>
              </div>

              {/* Package Content */}
              <div className="p-6 bg-white">
                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-3">Quyền lợi</h4>
                  <ul className="space-y-2">
                    {pkg.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-emerald-500 mr-2">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Table */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">Bảng giá</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                            Thời hạn
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                            Đơn giá
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                            Số lượng
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                            Thành tiền
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {pkg.pricing.map(price => (
                          <tr key={price.period} className="bg-white">
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {price.period}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              {formatPrice(price.price)} VND
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    handleQuantityChange(key, price.period, -1)
                                  }
                                  disabled={
                                    !quantities[key]?.[price.period] ||
                                    quantities[key]?.[price.period] <= 0
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">
                                  {quantities[key]?.[price.period] || 0}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    handleQuantityChange(key, price.period, 1)
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">
                              {formatPrice(
                                calculateTotal(
                                  price.price,
                                  quantities[key]?.[price.period] || 0
                                )
                              )}{' '}
                              VND
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              <Button
                                className="bg-emerald-500 hover:bg-emerald-600"
                                disabled={
                                  !quantities[key]?.[price.period] ||
                                  quantities[key]?.[price.period] <= 0
                                }
                                onClick={() =>
                                  handleAddToCart(
                                    pkg.title,
                                    price.period,
                                    price.price,
                                    quantities[key]?.[price.period] || 0
                                  )
                                }
                              >
                                Mua ngay
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
}
