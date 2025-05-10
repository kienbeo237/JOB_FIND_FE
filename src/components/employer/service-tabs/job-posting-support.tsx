"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart } from "lucide-react"

type QuantityState = {
  [key: string]: {
    [key: string]: number
  }
}

interface JobPostingSupportProps {
  quantities: QuantityState
  handleQuantityChange: (packageName: string, period: string, change: number) => void
  formatPrice: (price: number) => string
  calculateTotal: (basePrice: number, quantity: number) => number
}

export function JobPostingSupport({
  quantities,
  handleQuantityChange,
  formatPrice,
  calculateTotal,
}: JobPostingSupportProps) {
  const [activePackage, setActivePackage] = useState("lightUp")

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Gói Bổ Trợ Đăng Tuyển</h2>
      </div>

      {/* Package Selection Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-2 border-b">
        <button
          onClick={() => setActivePackage("lightUp")}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg mr-1 transition-colors ${
            activePackage === "lightUp"
              ? "bg-rose-100 text-rose-700 border-b-2 border-rose-500"
              : "text-gray-700 hover:text-rose-600 hover:bg-rose-50"
          }`}
        >
          Gói LIGHT UP
        </button>
        <button
          onClick={() => setActivePackage("urgent")}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg mx-1 transition-colors ${
            activePackage === "urgent"
              ? "bg-red-100 text-red-700 border-b-2 border-red-500"
              : "text-gray-700 hover:text-red-600 hover:bg-red-50"
          }`}
        >
          Gói URGENT
        </button>
        <button
          onClick={() => setActivePackage("hotJob")}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg mx-1 transition-colors ${
            activePackage === "hotJob"
              ? "bg-orange-100 text-orange-700 border-b-2 border-orange-500"
              : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
          }`}
        >
          Gói HOT JOB
        </button>
        <button
          onClick={() => setActivePackage("homepage")}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg ml-1 transition-colors ${
            activePackage === "homepage"
              ? "bg-cyan-100 text-cyan-700 border-b-2 border-cyan-500"
              : "text-gray-700 hover:text-cyan-600 hover:bg-cyan-50"
          }`}
        >
          Gói HOMEPAGE
        </button>
      </div>

      {/* LIGHT-UP Package */}
      {activePackage === "lightUp" && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4">
            <h3 className="text-xl font-bold text-white">Gói LIGHT UP</h3>
            <p className="text-rose-100 text-sm mt-1">Tăng sự chú ý cho tin tuyển dụng</p>
          </div>

          <div className="p-4 bg-white">
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900">Quyền lợi:</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">✓</span>
                  <span>Tin đăng được in đậm & đỏ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">✓</span>
                  <span>Thu hút sự chú ý của ứng viên</span>
                </li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Thời gian</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Giá (VNĐ)</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Số lượng</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Thành tiền</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-3 text-sm">30 ngày</td>
                    <td className="py-3 px-3 text-sm">1.200.000 VND</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange("lightUp", "30", -1)}
                          disabled={!(quantities.lightUp?.["30"] || 0)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{quantities.lightUp?.["30"] || 0}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange("lightUp", "30", 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm font-medium">
                      {formatPrice(calculateTotal(1200000, quantities.lightUp?.["30"] || 0))}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs h-8">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Thêm vào giỏ
                        </Button>
                        <Button size="sm" className="text-xs h-8 bg-orange-500 hover:bg-orange-600">
                          Mua ngay
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* URGENT Package */}
      {activePackage === "urgent" && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
            <h3 className="text-xl font-bold text-white">Gói URGENT</h3>
            <p className="text-red-100 text-sm mt-1">Đánh dấu tin tuyển dụng gấp</p>
          </div>

          <div className="p-4 bg-white">
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900">Quyền lợi:</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✓</span>
                  <span>Được gắn nhãn việc làm tuyển gấp</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✓</span>
                  <span>Thu hút sự chú ý của ứng viên</span>
                </li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Thời gian</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Giá (VNĐ)</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Số lượng</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Thành tiền</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-3 text-sm">30 ngày</td>
                    <td className="py-3 px-3 text-sm">1.450.000 VND</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange("urgent", "30", -1)}
                          disabled={!(quantities.urgent?.["30"] || 0)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{quantities.urgent?.["30"] || 0}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange("urgent", "30", 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm font-medium">
                      {formatPrice(calculateTotal(1450000, quantities.urgent?.["30"] || 0))}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs h-8">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Thêm vào giỏ
                        </Button>
                        <Button size="sm" className="text-xs h-8 bg-orange-500 hover:bg-orange-600">
                          Mua ngay
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* HOT JOB Package */}
      {activePackage === "hotJob" && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
            <h3 className="text-xl font-bold text-white">Gói HOT JOB</h3>
            <p className="text-orange-100 text-sm mt-1">Đánh dấu tin tuyển dụng hot</p>
          </div>

          <div className="p-4 bg-white">
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900">Quyền lợi:</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>Được gắn nhãn việc làm hot lên tin</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  <span>Gia tăng chú ý từ ứng viên tiềm năng</span>
                </li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Thời gian</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Giá (VNĐ)</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Số lượng</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Thành tiền</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-3 text-sm">30 ngày</td>
                    <td className="py-3 px-3 text-sm">1.450.000 VND</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange("hotJob", "30", -1)}
                          disabled={!(quantities.hotJob?.["30"] || 0)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{quantities.hotJob?.["30"] || 0}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange("hotJob", "30", 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm font-medium">
                      {formatPrice(calculateTotal(1450000, quantities.hotJob?.["30"] || 0))}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs h-8">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Thêm vào giỏ
                        </Button>
                        <Button size="sm" className="text-xs h-8 bg-orange-500 hover:bg-orange-600">
                          Mua ngay
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* HOMEPAGE Package */}
      {activePackage === "homepage" && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4">
            <h3 className="text-xl font-bold text-white">Gói HOMEPAGE</h3>
            <p className="text-cyan-100 text-sm mt-1">Hiển thị tin tuyển dụng trên trang chủ</p>
          </div>

          <div className="p-4 bg-white">
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900">Quyền lợi:</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Được hiện thị tin lên trang chủ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">✓</span>
                  <span>Gia tăng chú ý từ ứng viên tiềm năng</span>
                </li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Thời gian</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Giá (VNĐ)</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Số lượng</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Thành tiền</th>
                    <th className="py-2 px-3 text-left text-sm font-medium text-gray-700 border-b">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-3 text-sm">5 ngày</td>
                    <td className="py-3 px-3 text-sm">3.200.000 VND</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange("homepage", "5", -1)}
                          disabled={!(quantities.homepage?.["5"] || 0)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{quantities.homepage?.["5"] || 0}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange("homepage", "5", 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm font-medium">
                      {formatPrice(calculateTotal(3200000, quantities.homepage?.["5"] || 0))}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs h-8">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Thêm vào giỏ
                        </Button>
                        <Button size="sm" className="text-xs h-8 bg-orange-500 hover:bg-orange-600">
                          Mua ngay
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-3 text-sm">10 ngày</td>
                    <td className="py-3 px-3 text-sm">4.200.000 VND</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange("homepage", "10", -1)}
                          disabled={!(quantities.homepage?.["10"] || 0)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{quantities.homepage?.["10"] || 0}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange("homepage", "10", 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm font-medium">
                      {formatPrice(calculateTotal(4200000, quantities.homepage?.["10"] || 0))}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs h-8">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Thêm vào giỏ
                        </Button>
                        <Button size="sm" className="text-xs h-8 bg-orange-500 hover:bg-orange-600">
                          Mua ngay
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-sm">15 ngày</td>
                    <td className="py-3 px-3 text-sm">6.600.000 VND</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange("homepage", "15", -1)}
                          disabled={!(quantities.homepage?.["15"] || 0)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{quantities.homepage?.["15"] || 0}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange("homepage", "15", 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm font-medium">
                      {formatPrice(calculateTotal(6600000, quantities.homepage?.["15"] || 0))}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs h-8">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Thêm vào giỏ
                        </Button>
                        <Button size="sm" className="text-xs h-8 bg-orange-500 hover:bg-orange-600">
                          Mua ngay
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
