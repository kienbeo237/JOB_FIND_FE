'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useDashboard } from '@/contexts/dashboard-context';

type QuantityState = {
  [key: string]: {
    [key: string]: number;
  };
};

interface JobPostingServicesProps {
  quantities: QuantityState;
  handleQuantityChange: (
    packageName: string,
    period: string,
    change: number
  ) => void;
  formatPrice: (price: number) => string;
  calculateTotal: (basePrice: number, quantity: number) => number;
}

export function JobPostingServices({
  quantities,
  handleQuantityChange,
  formatPrice,
  calculateTotal,
}: JobPostingServicesProps) {
  const [activePackage, setActivePackage] = useState('premium');
  const [totalItems, setTotalItems] = useState(0);
  const { toast } = useToast();
  const { setActiveTab } = useDashboard();

  const handleAddToCart = (
    packageName: string,
    period: string,
    price: number,
    quantity: number
  ) => {
    if (quantity <= 0) {
      toast({
        title: 'Số lượng không hợp lệ',
        description: 'Vui lòng chọn số lượng lớn hơn 0.',
        variant: 'destructive',
      });
      return;
    }

    const existingCart = JSON.parse(
      localStorage.getItem('jobPostingCart') || '[]'
    );

    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.name === period && item.packageTitle === packageName
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      let benefits: string[] = [];
      Object.values(packageData).forEach(pkg => {
        if (pkg.title === packageName) {
          benefits = pkg.benefits;
        }
      });

      existingCart.push({
        id: Date.now(),
        name: period,
        packageTitle: packageName,
        price: price,
        quantity: quantity,
        description: benefits,
      });
    }

    localStorage.setItem('jobPostingCart', JSON.stringify(existingCart));

    updateTotalItems();

    toast({
      title: 'Đã thêm vào giỏ hàng',
      description: `Đã thêm ${quantity} ${period} vào giỏ hàng.`,
    });

    setActiveTab('cart');
  };

  const updateTotalItems = () => {
    const cart = JSON.parse(localStorage.getItem('jobPostingCart') || '[]');
    const count = cart.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    );
    setTotalItems(count);
  };

  useEffect(() => {
    updateTotalItems();
  }, []);

  const packageData = {
    premium: {
      title: 'Gói PREMIUM',
      description: 'Gói tiết kiệm, dành cho doanh nghiệp tiết kiếm ngân sách',
      gradient: 'from-blue-500 to-blue-600',
      benefits: [
        'Đăng tin tuyển dụng cơ bản',
        'Hiển thị trên trang ngành nghề 30 ngày',
        'Được tặng 30% điểm lọc CV vào tài khoản',
      ],
      pricing: [
        { period: '1 tháng', label: 'Tin tháng (1 tin)', price: 1450000 },
        { period: '5 tháng', label: 'Gói quý (5 tin)', price: 3915000 },
        { period: '12 tháng', label: 'Gói nửa năm (12 tin)', price: 6960000 },
        { period: '25 tháng', label: 'Gói năm (25 tin)', price: 10410000 },
      ],
    },
    premiumPlus: {
      title: 'Gói PREMIUM+',
      description:
        'Gói bán chạy nhất (Gói nâng PREMIUM+), nhiều doanh nghiệp lựa chọn',
      gradient: 'from-purple-500 to-purple-600',
      benefits: [
        'Mỗi tin tuyển dụng hiển thị 30 ngày',
        'Tiêu đề tin in đậm & đỏ',
        'Được làm mới tin 4 ngày 1 lần',
        'Tăng 30% điểm lọc CV',
      ],
      pricing: [
        { period: '1 tháng', label: 'Tin tháng (1 tin)', price: 3625000 },
        { period: '5 tháng', label: 'Gói quý (5 tin)', price: 9787500 },
        { period: '12 tháng', label: 'Gói nửa năm (12 tin)', price: 17400000 },
        { period: '25 tháng', label: 'Gói năm (25 tin)', price: 26100000 },
      ],
    },
    executive: {
      title: 'Gói EXECUTIVE',
      description: 'Gói cao cấp, dành cho doanh nghiệp lớn',
      gradient: 'from-emerald-500 to-emerald-600',
      benefits: [
        'Tin đăng tuyển dụng cao cấp',
        'Hiển thị trang chủ - việc làm tuyển gấp',
        'Hiển thị 30 ngày trên trang ngành nghề',
        'Tiêu đề tin in đậm & đỏ',
        'Được làm mới tin 3 ngày 1 lần',
        'Tăng 30% điểm lọc CV',
        'Được gửi email để xuất việc làm tới ứng viên phù hợp',
      ],
      pricing: [
        { period: '1 tháng', label: 'Tin tháng (1 tin)', price: 8700000 },
        { period: '5 tháng', label: 'Gói quý (5 tin)', price: 23490000 },
        { period: '12 tháng', label: 'Gói nửa năm (12 tin)', price: 41760000 },
        { period: '25 tháng', label: 'Gói năm (25 tin)', price: 62640000 },
      ],
    },
    brand: {
      title: 'Gói BRAND',
      description: 'Gói cao cấp nhất, dành cho doanh nghiệp hàng đầu',
      gradient: 'from-amber-500 to-amber-600',
      benefits: [
        'Tin đăng tuyển dụng cao cấp',
        'Được đăng tin cho cơ sở khác cùng nhà đầu tư và thương hiệu',
        'Được hiển thị 10 ngày trên sub-banner bên phải trang chủ',
        'Hiển thị tin trên trang chủ: việc làm hot & việc làm tuyển gấp',
        'Tiêu đề tin in đậm & đỏ',
        'Gửi email để xuất tới 400 ứng viên phù hợp',
        'Được share tin trên facebook và tiktok',
      ],
      pricing: [
        { period: '1 tháng', label: 'Tin tháng (1 tin)', price: 13050000 },
        { period: '5 tháng', label: 'Gói quý (5 tin)', price: 35235000 },
        { period: '12 tháng', label: 'Gói nửa năm (12 tin)', price: 62640000 },
        { period: '25 tháng', label: 'Gói năm (25 tin)', price: 93960000 },
      ],
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Gói Dịch Vụ Đăng Tin
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

      {/* Package Selection Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-2 border-b">
        <button
          onClick={() => setActivePackage('premium')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg mr-1 transition-colors ${
            activePackage === 'premium'
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500'
              : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
          }`}
        >
          Gói PREMIUM
        </button>
        <button
          onClick={() => setActivePackage('premiumPlus')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg mx-1 transition-colors ${
            activePackage === 'premiumPlus'
              ? 'bg-purple-100 text-purple-700 border-b-2 border-purple-500'
              : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
          }`}
        >
          Gói PREMIUM+
        </button>
        <button
          onClick={() => setActivePackage('executive')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg mx-1 transition-colors ${
            activePackage === 'executive'
              ? 'bg-emerald-100 text-emerald-700 border-b-2 border-emerald-500'
              : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
          }`}
        >
          Gói EXECUTIVE
        </button>
        <button
          onClick={() => setActivePackage('brand')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg ml-1 transition-colors ${
            activePackage === 'brand'
              ? 'bg-amber-100 text-amber-700 border-b-2 border-amber-500'
              : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
          }`}
        >
          Gói BRAND
        </button>
      </div>

      {/* Package Content */}
      {Object.entries(packageData).map(
        ([key, pkg]) =>
          activePackage === key && (
            <div
              key={key}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${pkg.gradient} p-4`}>
                <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                <p className="text-white/80 text-sm mt-1">{pkg.description}</p>
              </div>

              <div className="p-4 bg-white">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900">Quyền lợi:</h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    {pkg.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`text-${
                            key === 'premium'
                              ? 'blue'
                              : key === 'premiumPlus'
                              ? 'purple'
                              : key === 'executive'
                              ? 'emerald'
                              : 'amber'
                          }-500 mr-2`}
                        >
                          ✓
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">
                          Thời gian
                        </th>
                        <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">
                          Giá (VND)
                        </th>
                        <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">
                          Số lượng
                        </th>
                        <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">
                          Thành tiền
                        </th>
                        <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pkg.pricing.map(price => (
                        <tr key={price.period} className="border-b">
                          <td className="py-3 px-3 text-sm">{price.label}</td>
                          <td className="py-3 px-3 text-sm">
                            {formatPrice(price.price)} VND
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  handleQuantityChange(key, price.period, -1)
                                }
                                disabled={
                                  !(quantities[key]?.[price.period] || 0)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">
                                {quantities[key]?.[price.period] || 0}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  handleQuantityChange(key, price.period, 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-sm font-medium">
                            {formatPrice(
                              calculateTotal(
                                price.price,
                                quantities[key]?.[price.period] || 0
                              )
                            )}{' '}
                            VND
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-8"
                                onClick={() =>
                                  handleAddToCart(
                                    pkg.title,
                                    price.label,
                                    price.price,
                                    quantities[key]?.[price.period] || 0
                                  )
                                }
                                disabled={
                                  !(quantities[key]?.[price.period] || 0)
                                }
                              >
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                Thêm vào giỏ
                              </Button>
                              <Button
                                size="sm"
                                className="text-xs h-8 bg-orange-500 hover:bg-orange-600"
                                disabled={
                                  !(quantities[key]?.[price.period] || 0)
                                }
                              >
                                Mua ngay
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
}
