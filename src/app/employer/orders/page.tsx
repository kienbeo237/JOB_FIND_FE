'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Search, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Order {
  id: string;
  orderType: string;
  date: string;
  amount: number;
  paymentAmount: number | null;
  paymentDate: string | null;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  expirationDate: string;
  creator: string;
}

const OrderItem = ({
  order,
  onViewDetails,
}: {
  order: Order;
  onViewDetails: (order: Order) => void;
}) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-green-600 font-medium">{order.id}</td>
      <td className="px-4 py-3">
        <div>
          <p>{order.orderType}</p>
          <p className="text-xs text-gray-500">{order.date}</p>
        </div>
      </td>
      <td className="px-4 py-3">
        <div>
          {new Intl.NumberFormat('vi-VN').format(order.amount)}
          <span className="text-xs text-gray-500 ml-1">VND</span>
          <p className="text-xs text-gray-500">(Có VAT)</p>
        </div>
      </td>
      <td className="px-4 py-3">
        <div>
          {order.paymentAmount ? (
            <>
              {new Intl.NumberFormat('vi-VN').format(order.paymentAmount)}
              <span className="text-xs text-gray-500 ml-1">VND</span>
              <p className="text-xs text-gray-500">{order.paymentDate}</p>
            </>
          ) : (
            <Badge
              variant="outline"
              className="bg-red-50 text-red-600 border-red-200"
            >
              Chưa thanh toán
            </Badge>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        {order.status === 'completed' && (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Hoàn thành
          </Badge>
        )}
        {order.status === 'cancelled' && (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Bị huỷ
          </Badge>
        )}
        {order.status === 'pending' && (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Chờ xử lý
          </Badge>
        )}
        {order.status === 'processing' && (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Đang xử lý
          </Badge>
        )}
      </td>
      <td className="px-4 py-3">
        <div>
          <p>Hạn kích hoạt:</p>
          <p
            className={`text-sm ${
              new Date(order.expirationDate.split('/').reverse().join('-')) <
              new Date()
                ? 'text-red-600'
                : 'text-green-600'
            }`}
          >
            {order.expirationDate}
          </p>
        </div>
      </td>
      <td className="px-4 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails(order)}>
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem>Theo dõi dịch vụ</DropdownMenuItem>
            <DropdownMenuItem>Đánh giá đơn hàng</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

const OrderDetails = ({
  order,
  onBack,
}: {
  order: Order;
  onBack: () => void;
}) => {
  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          className="flex items-center text-gray-600"
          onClick={onBack}
        >
          <ChevronLeft size={20} className="mr-1" />
          Quay lại
        </Button>
        <h2 className="text-xl font-bold ml-4">Chi tiết đơn hàng</h2>
        <Button variant="outline" className="ml-auto">
          Đánh giá đơn hàng
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 mb-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600">Mã đơn hàng:</p>
              <p className="font-medium text-green-600">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ngày tạo đơn:</p>
              <p className="font-medium">{order.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Ngày hoàn thành thanh toán:
              </p>
              <p className="font-medium">
                {order.paymentDate || 'Chưa thanh toán'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Người tạo đơn:</p>
              <p className="font-medium">{order.creator}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Trạng thái đơn hàng:</p>
              <p
                className={`font-medium ${
                  order.status === 'completed'
                    ? 'text-green-600'
                    : order.status === 'cancelled'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}
              >
                {order.status === 'completed'
                  ? 'Hoàn thành'
                  : order.status === 'cancelled'
                  ? 'Bị huỷ'
                  : order.status === 'processing'
                  ? 'Đang xử lý'
                  : 'Chờ xử lý'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Trạng thái thanh toán:</p>
              <p
                className={`font-medium ${
                  order.paymentAmount ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {order.paymentAmount
                  ? `${new Intl.NumberFormat('vi-VN').format(
                      order.paymentAmount
                    )} VND`
                  : 'Chưa thanh toán'}
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 uppercase mb-4">
          THÔNG TIN ĐƠN HÀNG
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-gray-600">Tên dịch vụ</th>
                <th className="px-4 py-3 text-gray-600 text-center">
                  Số lượng
                </th>
                <th className="px-4 py-3 text-gray-600 text-right">Đơn giá</th>
                <th className="px-4 py-3 text-gray-600 text-right">Số tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3">Đăng tin tuyển dụng (TOP PRO)</td>
                <td className="px-4 py-3 text-center">3</td>
                <td className="px-4 py-3 text-right">5,440,000</td>
                <td className="px-4 py-3 text-right">16,320,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-2 text-right">
          <div className="flex justify-end">
            <span className="w-48 text-gray-600">Tổng giá trị đơn hàng:</span>
            <span className="w-32 font-medium">16,320,000 VND</span>
          </div>
          <div className="flex justify-end text-green-600">
            <span className="w-48">Giảm giá:</span>
            <span className="w-32 font-medium">-5,712,000 VND</span>
          </div>
          <div className="flex justify-end text-xs text-gray-500">
            <span className="w-48">
              *Giá trị chiết khấu của mỗi dịch vụ tối đa 50% giá niêm yết
            </span>
            <span className="w-32"></span>
          </div>
          <div className="flex justify-end">
            <span className="w-48 text-gray-600">
              Tổng tiền chưa bao gồm VAT:
            </span>
            <span className="w-32 font-medium">10,608,000 VND</span>
          </div>
          <div className="flex justify-end">
            <span className="w-48 text-gray-600">VAT (8%):</span>
            <span className="w-32 font-medium">848,640 VND</span>
          </div>
          <div className="flex justify-end pt-2 border-t mt-2">
            <span className="w-48 text-gray-600 font-bold">
              Tổng số tiền thanh toán:
            </span>
            <span className="w-32 font-bold text-green-600">
              11,456,640 VND
            </span>
          </div>
          <div className="flex justify-end text-xs">
            <span className="w-48 text-gray-500">(Đã bao gồm VAT)</span>
            <span className="w-32"></span>
          </div>
          <div className="flex justify-end items-center">
            <span className="w-48 text-gray-600">Số Top Point nhận được:</span>
            <div className="w-32 flex items-center">
              <span className="font-medium text-green-600">+106</span>
              <span className="ml-1 bg-yellow-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                P
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
          Thông tin xuất hóa đơn điện tử
          <Badge className="ml-2 bg-green-500">Đã duyệt</Badge>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Mã số thuế:</p>
            <p className="font-medium">0314118362</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">
              Tên công ty / Hộ kinh doanh:
            </p>
            <p className="font-medium">CÔNG TY TNHH MILENSEA RETAIL</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600 mb-1">Địa chỉ công ty:</p>
            <p className="font-medium">
              Phòng 1701, Tầng 17 Khu văn phòng, Tòa nhà Pearl Plaza, 561A Điện
              Biên Phủ, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh, Việt
              Nam
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Email nhận HĐĐT:</p>
            <p className="font-medium">hr2.hcm@milensea.com.vn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    {
      id: '126530',
      orderType: 'Nhân viên tư vấn',
      date: '25/02/2025',
      amount: 11456640,
      paymentAmount: 11456640,
      paymentDate: '26/02/2025',
      status: 'completed',
      expirationDate: '26/02/2026',
      creator: 'Nhân viên tư vấn',
    },
    {
      id: '121765',
      orderType: 'Nhà tuyển dụng',
      date: '03/01/2025',
      amount: 1080000,
      paymentAmount: null,
      paymentDate: null,
      status: 'cancelled',
      expirationDate: '03/01/2026',
      creator: 'Nhà tuyển dụng',
    },
    {
      id: '105160',
      orderType: 'Nhân viên tư vấn',
      date: '03/06/2024',
      amount: 11456640,
      paymentAmount: 11456640,
      paymentDate: '04/06/2024',
      status: 'completed',
      expirationDate: '04/06/2025',
      creator: 'Nhân viên tư vấn',
    },
    {
      id: '103210',
      orderType: 'Nhân viên tư vấn',
      date: '13/05/2024',
      amount: 11456640,
      paymentAmount: null,
      paymentDate: null,
      status: 'cancelled',
      expirationDate: '13/05/2025',
      creator: 'Nhân viên tư vấn',
    },
    {
      id: '96522',
      orderType: 'Nhân viên tư vấn',
      date: '04/03/2024',
      amount: 8225280,
      paymentAmount: 8225280,
      paymentDate: '19/03/2024',
      status: 'completed',
      expirationDate: '19/03/2025',
      creator: 'Nhân viên tư vấn',
    },
  ];

  const filterOrders = () => {
    if (activeTab === 'all') return orders;
    if (activeTab === 'pending')
      return orders.filter(order => order.status === 'pending');
    if (activeTab === 'processing')
      return orders.filter(order => order.status === 'processing');
    if (activeTab === 'completed')
      return orders.filter(order => order.status === 'completed');
    if (activeTab === 'cancelled')
      return orders.filter(order => order.status === 'cancelled');
    return orders;
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  const completedCount = orders.filter(
    order => order.status === 'completed'
  ).length;
  const cancelledCount = orders.filter(
    order => order.status === 'cancelled'
  ).length;
  const pendingCount = orders.filter(
    order => order.status === 'pending'
  ).length;
  const processingCount = orders.filter(
    order => order.status === 'processing'
  ).length;

  return (
    <div className="p-6">
      {selectedOrder ? (
        <OrderDetails order={selectedOrder} onBack={handleBackToList} />
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Theo dõi đơn hàng</h1>
            <p className="text-gray-600">
              Quản lý và theo dõi trạng thái các đơn hàng của bạn
            </p>
          </div>

          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <div className="border-b p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={activeTab === 'all' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('all')}
                    className={
                      activeTab === 'all'
                        ? 'bg-green-600 hover:bg-green-700'
                        : ''
                    }
                  >
                    Tất cả{' '}
                    <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                      {orders.length}
                    </span>
                  </Button>
                  <Button
                    variant={activeTab === 'pending' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('pending')}
                    className={
                      activeTab === 'pending'
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : ''
                    }
                  >
                    Đang chờ duyệt{' '}
                    <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                      {pendingCount}
                    </span>
                  </Button>
                  <Button
                    variant={activeTab === 'processing' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('processing')}
                    className={
                      activeTab === 'processing'
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : ''
                    }
                  >
                    Đang chạy dịch vụ{' '}
                    <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                      {processingCount}
                    </span>
                  </Button>
                  <Button
                    variant={activeTab === 'completed' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('completed')}
                    className={
                      activeTab === 'completed'
                        ? 'bg-green-600 hover:bg-green-700'
                        : ''
                    }
                  >
                    Hoàn thành{' '}
                    <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                      {completedCount}
                    </span>
                  </Button>
                  <Button
                    variant={activeTab === 'cancelled' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('cancelled')}
                    className={
                      activeTab === 'cancelled'
                        ? 'bg-red-500 hover:bg-red-600'
                        : ''
                    }
                  >
                    Bị huỷ{' '}
                    <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                      {cancelledCount}
                    </span>
                  </Button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Mã đơn hàng"
                    className="px-4 py-2 pr-10 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <Search
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">
                      Mã
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">
                      Tạo đơn hàng
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">
                      Giá trị đơn hàng
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">
                      Trạng thái thanh toán
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">
                      Trạng thái đơn hàng
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">
                      Kích hoạt dịch vụ
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-gray-600">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filterOrders().map(order => (
                    <OrderItem
                      key={order.id}
                      order={order}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
