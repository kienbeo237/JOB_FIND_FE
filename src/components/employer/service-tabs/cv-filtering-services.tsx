'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useDashboard } from '@/contexts/dashboard-context';

type QuantityState = {
  [key: string]: {
    [key: string]: number;
  };
};

interface CvFilteringServicesProps {
  quantities: QuantityState;
  handleQuantityChange: (
    packageName: string,
    period: string,
    change: number
  ) => void;
  formatPrice: (price: number) => string;
  calculateTotal: (basePrice: number, quantity: number) => number;
}

export function CvFilteringServices({
  quantities,
  handleQuantityChange,
  formatPrice,
  calculateTotal,
}: CvFilteringServicesProps) {
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
      localStorage.getItem('cvFilteringCart') || '[]'
    );

    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.name === period && item.packageTitle === packageName
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({
        id: Date.now(),
        name: period,
        packageTitle: packageName,
        price: price,
        quantity: quantity,
        description: [
          'Lọc hồ sơ cho vị trí mong muốn',
          'Đặc quyền tìm kiếm hồ sơ có video và audio',
          'Tiếp cận ứng viên chất lượng nhanh chóng',
          'Tiết kiệm thời gian tuyển dụng',
        ],
      });
    }

    localStorage.setItem('cvFilteringCart', JSON.stringify(existingCart));

    updateTotalItems();

    toast({
      title: 'Đã thêm vào giỏ hàng',
      description: `Đã thêm ${quantity} ${period} vào giỏ hàng.`,
    });

    // Change to cart tab
    setActiveTab('cart');
  };

  const updateTotalItems = () => {
    const cart = JSON.parse(localStorage.getItem('cvFilteringCart') || '[]');
    const count = cart.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    );
    setTotalItems(count);
  };

  useEffect(() => {
    updateTotalItems();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Gói Lọc CV</h2>

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

      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-6 text-white">
          <h3 className="text-2xl font-bold">Gói LỌC CV</h3>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Quyền lợi</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Lọc hồ s�� cho vị trí mong muốn</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Đặc quyền tìm kiếm hồ sơ có video và audio</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Bảng giá</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời hạn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đơn giá
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thành tiền
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      1 tháng (100 điểm)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      2.600.000 VND
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            handleQuantityChange('cv-filter', '1-month', -1)
                          }
                          disabled={
                            !quantities['cv-filter']?.['1-month'] ||
                            quantities['cv-filter']?.['1-month'] <= 0
                          }
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">
                          {quantities['cv-filter']?.['1-month'] || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            handleQuantityChange('cv-filter', '1-month', 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice(
                        calculateTotal(
                          2600000,
                          quantities['cv-filter']?.['1-month'] || 0
                        )
                      )}{' '}
                      VND
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600"
                        disabled={
                          !quantities['cv-filter']?.['1-month'] ||
                          quantities['cv-filter']?.['1-month'] <= 0
                        }
                        onClick={() =>
                          handleAddToCart(
                            'Gói LỌC CV',
                            '1 tháng (100 điểm)',
                            2600000,
                            quantities['cv-filter']?.['1-month'] || 0
                          )
                        }
                      >
                        Mua ngay
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      3 tháng (300 điểm)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      6.600.000 VND
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            handleQuantityChange('cv-filter', '3-month', -1)
                          }
                          disabled={
                            !quantities['cv-filter']?.['3-month'] ||
                            quantities['cv-filter']?.['3-month'] <= 0
                          }
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">
                          {quantities['cv-filter']?.['3-month'] || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            handleQuantityChange('cv-filter', '3-month', 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice(
                        calculateTotal(
                          6600000,
                          quantities['cv-filter']?.['3-month'] || 0
                        )
                      )}{' '}
                      VND
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600"
                        disabled={
                          !quantities['cv-filter']?.['3-month'] ||
                          quantities['cv-filter']?.['3-month'] <= 0
                        }
                        onClick={() =>
                          handleAddToCart(
                            'Gói LỌC CV',
                            '3 tháng (300 điểm)',
                            6600000,
                            quantities['cv-filter']?.['3-month'] || 0
                          )
                        }
                      >
                        Mua ngay
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      6 tháng (600 điểm)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      12.600.000 VND
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            handleQuantityChange('cv-filter', '6-month', -1)
                          }
                          disabled={
                            !quantities['cv-filter']?.['6-month'] ||
                            quantities['cv-filter']?.['6-month'] <= 0
                          }
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">
                          {quantities['cv-filter']?.['6-month'] || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            handleQuantityChange('cv-filter', '6-month', 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice(
                        calculateTotal(
                          12600000,
                          quantities['cv-filter']?.['6-month'] || 0
                        )
                      )}{' '}
                      VND
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600"
                        disabled={
                          !quantities['cv-filter']?.['6-month'] ||
                          quantities['cv-filter']?.['6-month'] <= 0
                        }
                        onClick={() =>
                          handleAddToCart(
                            'Gói LỌC CV',
                            '6 tháng (600 điểm)',
                            12600000,
                            quantities['cv-filter']?.['6-month'] || 0
                          )
                        }
                      >
                        Mua ngay
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      12 tháng (1200 điểm)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      18.600.000 VND
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            handleQuantityChange('cv-filter', '12-month', -1)
                          }
                          disabled={
                            !quantities['cv-filter']?.['12-month'] ||
                            quantities['cv-filter']?.['12-month'] <= 0
                          }
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">
                          {quantities['cv-filter']?.['12-month'] || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            handleQuantityChange('cv-filter', '12-month', 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice(
                        calculateTotal(
                          18600000,
                          quantities['cv-filter']?.['12-month'] || 0
                        )
                      )}{' '}
                      VND
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600"
                        disabled={
                          !quantities['cv-filter']?.['12-month'] ||
                          quantities['cv-filter']?.['12-month'] <= 0
                        }
                        onClick={() =>
                          handleAddToCart(
                            'Gói LỌC CV',
                            '12 tháng (1200 điểm)',
                            18600000,
                            quantities['cv-filter']?.['12-month'] || 0
                          )
                        }
                      >
                        Mua ngay
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
