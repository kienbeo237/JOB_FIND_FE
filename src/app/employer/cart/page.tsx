"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, ShoppingBag, Trash2, Plus, Minus, Info, CreditCard, Building, BanknoteIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useDashboard } from "@/contexts/dashboard-context"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface CartItem {
  id: number
  name: string
  packageTitle: string
  price: number
  quantity: number
  description?: string[]
}

export default function CartPage() {
  const [activeTab, setActiveTab] = useState("cart")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit-card")
  const [activeProductDescription, setActiveProductDescription] = useState<number | null>(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const { toast } = useToast()
  const { setActiveTab: setDashboardTab } = useDashboard()

  useEffect(() => {
    const loadCartItems = () => {
      const jobPostingItems = JSON.parse(localStorage.getItem("jobPostingCart") || "[]")
      const cvFilteringItems = JSON.parse(localStorage.getItem("cvFilteringCart") || "[]")
      const bannerItems = JSON.parse(localStorage.getItem("bannerCart") || "[]")

      const allItems = [...jobPostingItems, ...cvFilteringItems, ...bannerItems]

      setCartItems(allItems)

      if (allItems.length > 0) {
        setActiveProductDescription(allItems[0].id)
      }
    }

    loadCartItems()
  }, [])

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateVAT = () => {
    return calculateSubtotal() * 0.1
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT()
  }

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const handleQuantityChange = (id: number, change: number) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    })

    setCartItems(updatedItems)

    updateLocalStorage(updatedItems)
  }

  const updateLocalStorage = (items: CartItem[]) => {
    const jobPostingItems = items.filter(
      (item) =>
        item.packageTitle.includes("PREMIUM") ||
        item.packageTitle.includes("EXECUTIVE") ||
        item.packageTitle.includes("BRAND"),
    )

    const cvFilteringItems = items.filter((item) => item.packageTitle.includes("LỌC CV"))

    const bannerItems = items.filter(
      (item) =>
        item.packageTitle.includes("Banner") ||
        item.packageTitle.includes("Sub Banner") ||
        item.packageTitle.includes("Top Employer"),
    )

    localStorage.setItem("jobPostingCart", JSON.stringify(jobPostingItems))
    localStorage.setItem("cvFilteringCart", JSON.stringify(cvFilteringItems))
    localStorage.setItem("bannerCart", JSON.stringify(bannerItems))
  }

  const handleRemoveItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedItems)

    if (id === activeProductDescription && updatedItems.length > 0) {
      setActiveProductDescription(updatedItems[0].id)
    } else if (updatedItems.length === 0) {
      setActiveProductDescription(null)
    }

    updateLocalStorage(updatedItems)

    toast({
      title: "Đã xóa sản phẩm",
      description: "Sản phẩm đã được xóa khỏi giỏ hàng.",
    })
  }

  const handleClearCart = () => {
    setCartItems([])
    setActiveProductDescription(null)

    localStorage.removeItem("jobPostingCart")
    localStorage.removeItem("cvFilteringCart")
    localStorage.removeItem("bannerCart")

    toast({
      title: "Đã xóa giỏ hàng",
      description: "Tất cả sản phẩm đã được xóa khỏi giỏ hàng.",
    })
  }

  const handleContinueShopping = () => {
    setDashboardTab("packages")
  }

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Giỏ hàng trống",
        description: "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.",
        variant: "destructive",
      })
      return
    }

    setActiveTab("payment")
  }

  const handlePayment = () => {
    setPaymentSuccess(true)

    setCartItems([])
    localStorage.removeItem("jobPostingCart")
    localStorage.removeItem("cvFilteringCart")
    localStorage.removeItem("bannerCart")

    toast({
      title: "Thanh toán thành công",
      description: "Đơn hàng của bạn đã được xử lý thành công.",
    })
  }

  if (paymentSuccess) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-center mb-2">Thanh toán thành công!</h2>
            <p className="text-gray-500 text-center mb-8">
              Cảm ơn bạn đã mua dịch vụ. Đơn hàng của bạn đã được xử lý thành công.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => setDashboardTab("dashboard")}>
                Về trang tổng quan
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setDashboardTab("packages")
                  setPaymentSuccess(false)
                }}
              >
                Tiếp tục mua hàng
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Giỏ hàng & Thanh toán</h2>
            <p className="text-gray-500 mt-1">Quản lý giỏ hàng và thanh toán dịch vụ</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gray-100 p-1 mb-4 sm:mb-6 grid grid-cols-2">
              <TabsTrigger value="cart" className="data-[state=active]:bg-white">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Giỏ hàng
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-white">
                <CreditCard className="h-4 w-4 mr-2" />
                Thanh toán
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cart" className="space-y-4 sm:space-y-6">
              {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardContent className="p-0">
                        <div className="p-4 border-b bg-gray-50">
                          <div className="grid grid-cols-12 gap-4 font-medium text-gray-700">
                            <div className="col-span-5">Sản phẩm</div>
                            <div className="col-span-2 text-center">Đơn giá</div>
                            <div className="col-span-2 text-center">Số lượng</div>
                            <div className="col-span-2 text-center">Thành tiền</div>
                            <div className="col-span-1 text-center">Xóa</div>
                          </div>
                        </div>

                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className={`p-4 border-b ${item.id === activeProductDescription ? "bg-green-50" : ""}`}
                            onClick={() => setActiveProductDescription(item.id)}
                          >
                            <div className="grid grid-cols-12 gap-4 items-center">
                              <div className="col-span-5">
                                <p className="font-medium text-gray-800">{item.name}</p>
                                <p className="text-sm text-gray-600">{item.packageTitle}</p>
                                <button
                                  className="text-green-600 text-sm hover:underline mt-1 flex items-center"
                                  onClick={() => setActiveProductDescription(item.id)}
                                >
                                  <Info className="h-3 w-3 mr-1" />
                                  Xem chi tiết
                                </button>
                              </div>
                              <div className="col-span-2 text-center">{formatPrice(item.price)} VND</div>
                              <div className="col-span-2">
                                <div className="flex items-center justify-center">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleQuantityChange(item.id, -1)
                                    }}
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-10 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleQuantityChange(item.id, 1)
                                    }}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="col-span-2 text-center font-medium">
                                {formatPrice(item.price * item.quantity)} VND
                              </div>
                              <div className="col-span-1 text-center">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-500 hover:text-red-500"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveItem(item.id)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="p-4 bg-gray-50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Tạm tính:</span>
                            <span className="font-medium">{formatPrice(calculateSubtotal())} VND</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">VAT (10%):</span>
                            <span className="font-medium">{formatPrice(calculateVAT())} VND</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>Tổng cộng:</span>
                            <span className="text-green-600">{formatPrice(calculateTotal())} VND</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={handleContinueShopping}>
                        Tiếp tục mua hàng
                      </Button>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          onClick={handleClearCart}
                        >
                          Xóa giỏ hàng
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={handleProceedToCheckout}>
                          Tiến hành thanh toán
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <Card>
                      <CardContent className="p-4">
                        {activeProductDescription !== null &&
                        cartItems.find((item) => item.id === activeProductDescription) ? (
                          <>
                            <h3 className="text-lg font-bold text-gray-800 mb-4">
                              {cartItems.find((item) => item.id === activeProductDescription)?.packageTitle}
                            </h3>

                            <div className="bg-green-50 p-3 rounded-md text-center mb-4">
                              <span className="text-xl font-bold text-green-600">
                                {formatPrice(
                                  cartItems.find((item) => item.id === activeProductDescription)?.price || 0,
                                )}{" "}
                                VND
                              </span>
                            </div>

                            <div className="space-y-2 text-sm text-gray-700 mb-4">
                              {cartItems
                                .find((item) => item.id === activeProductDescription)
                                ?.description?.map((desc, index) => (
                                  <div key={index} className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>{desc}</span>
                                  </div>
                                )) || (
                                <div className="text-gray-500 italic">
                                  Không có thông tin chi tiết cho sản phẩm này.
                                </div>
                              )}
                            </div>

                            <Separator className="my-4" />

                            <div className="text-sm text-gray-600">
                              <p className="mb-2">
                                Thời hạn: {cartItems.find((item) => item.id === activeProductDescription)?.name}
                              </p>
                              <p>
                                Số lượng: {cartItems.find((item) => item.id === activeProductDescription)?.quantity}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                            <Info className="h-12 w-12 text-gray-300 mb-4" />
                            <p>Chọn một sản phẩm từ giỏ hàng để xem chi tiết</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 flex flex-col items-center justify-center">
                    <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Giỏ hàng của bạn đang trống</h3>
                    <p className="text-gray-500 mb-6 text-center">
                      Hãy thêm sản phẩm vào giỏ hàng để tiến hành thanh toán
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700" onClick={handleContinueShopping}>
                      Đi đến trang mua dịch vụ
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="payment" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card className="mb-6">
                    <CardContent className="p-0">
                      <div className="p-4 border-b bg-gray-50">
                        <h3 className="font-medium text-gray-800">Sản phẩm đã chọn</h3>
                      </div>

                      <div className="p-4">
                        <table className="w-full">
                          <thead className="text-xs text-gray-700 border-b">
                            <tr>
                              <th className="pb-2 text-left">Sản phẩm</th>
                              <th className="pb-2 text-right">Số lượng</th>
                              <th className="pb-2 text-right">Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {cartItems.map((item) => (
                              <tr key={item.id} className="text-sm">
                                <td className="py-3">
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-gray-500">{item.packageTitle}</div>
                                </td>
                                <td className="py-3 text-right">{item.quantity}</td>
                                <td className="py-3 text-right font-medium">
                                  {formatPrice(item.price * item.quantity)} VND
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="text-sm font-medium">
                            <tr className="border-t">
                              <td className="pt-3">Tạm tính</td>
                              <td></td>
                              <td className="pt-3 text-right">{formatPrice(calculateSubtotal())} VND</td>
                            </tr>
                            <tr>
                              <td className="py-1">VAT (10%)</td>
                              <td></td>
                              <td className="py-1 text-right">{formatPrice(calculateVAT())} VND</td>
                            </tr>
                            <tr className="border-t">
                              <td className="pt-3 text-base">Tổng cộng</td>
                              <td></td>
                              <td className="pt-3 text-right text-green-600 text-base">
                                {formatPrice(calculateTotal())} VND
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Phương thức thanh toán</h3>

                      <RadioGroup
                        value={selectedPaymentMethod}
                        onValueChange={setSelectedPaymentMethod}
                        className="space-y-3"
                      >
                        <div
                          className={`flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50 ${
                            selectedPaymentMethod === "credit-card" ? "border-green-500 bg-green-50" : ""
                          }`}
                        >
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex items-center cursor-pointer flex-1">
                            <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                            <span>Thẻ tín dụng / Thẻ ghi nợ quốc tế</span>
                            <div className="ml-auto flex items-center space-x-2">
                              <img src="/visa-logo-generic.png" alt="Visa" className="h-6" />
                              <img src="/mastercard-logo.png" alt="Mastercard" className="h-6" />
                              <img src="/american-express-logo.png" alt="Amex" className="h-6" />
                            </div>
                          </Label>
                        </div>

                        <div
                          className={`flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50 ${
                            selectedPaymentMethod === "atm-card" ? "border-green-500 bg-green-50" : ""
                          }`}
                        >
                          <RadioGroupItem value="atm-card" id="atm-card" />
                          <Label htmlFor="atm-card" className="flex items-center cursor-pointer flex-1">
                            <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                            <span>Thẻ ATM nội địa / Internet Banking</span>
                            <div className="ml-auto flex items-center space-x-2">
                              <img src="/vietcombank-logo.png" alt="Vietcombank" className="h-5" />
                              <img src="/techcombank-logo.png" alt="Techcombank" className="h-5" />
                              <span className="text-sm text-gray-500">+15</span>
                            </div>
                          </Label>
                        </div>

                        <div
                          className={`flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50 ${
                            selectedPaymentMethod === "bank-transfer" ? "border-green-500 bg-green-50" : ""
                          }`}
                        >
                          <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                          <Label htmlFor="bank-transfer" className="flex items-center cursor-pointer">
                            <BanknoteIcon className="h-5 w-5 mr-2 text-gray-600" />
                            <span>Chuyển khoản ngân hàng</span>
                          </Label>
                        </div>

                        <div
                          className={`flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-50 ${
                            selectedPaymentMethod === "company-invoice" ? "border-green-500 bg-green-50" : ""
                          }`}
                        >
                          <RadioGroupItem value="company-invoice" id="company-invoice" />
                          <Label htmlFor="company-invoice" className="flex items-center cursor-pointer">
                            <Building className="h-5 w-5 mr-2 text-gray-600" />
                            <span>Xuất hóa đơn cho công ty</span>
                          </Label>
                        </div>
                      </RadioGroup>

                      {selectedPaymentMethod === "credit-card" && (
                        <div className="mt-6 space-y-4 border-t pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Số thẻ</Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Ngày hết hạn</Label>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">Mã bảo mật (CVV)</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-name">Tên chủ thẻ</Label>
                            <Input id="card-name" placeholder="NGUYEN VAN A" />
                          </div>
                        </div>
                      )}

                      {selectedPaymentMethod === "bank-transfer" && (
                        <div className="mt-6 space-y-4 border-t pt-4">
                          <div className="bg-blue-50 p-4 rounded-md text-sm">
                            <p className="font-medium text-blue-800 mb-2">Thông tin chuyển khoản:</p>
                            <p className="mb-1">
                              <span className="font-medium">Ngân hàng:</span> Vietcombank
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">Số tài khoản:</span> 1234567890
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">Chủ tài khoản:</span> CÔNG TY TNHH JOBFIND
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">Nội dung:</span> [Tên công ty] thanh toán dịch vụ JobFind
                            </p>
                            <p className="mt-2 text-blue-700">
                              Chúng tôi sẽ liên hệ xác nhận và kích hoạt dịch vụ trong vòng 24 giờ sau khi nhận được
                              thanh toán.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedPaymentMethod === "company-invoice" && (
                        <div className="mt-6 space-y-4 border-t pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="company-name">Tên công ty</Label>
                            <Input id="company-name" placeholder="Công ty TNHH ABC" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tax-code">Mã số thuế</Label>
                            <Input id="tax-code" placeholder="0123456789" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company-address">Địa chỉ công ty</Label>
                            <Input id="company-address" placeholder="123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contact-email">Email liên hệ</Label>
                            <Input id="contact-email" placeholder="contact@company.com" />
                          </div>
                        </div>
                      )}

                      <div className="mt-6 pt-4 border-t">
                        <div className="flex items-center space-x-2 mb-6">
                          <Checkbox id="terms" />
                          <label
                            htmlFor="terms"
                            className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Tôi đồng ý với{" "}
                            <a href="#" className="text-green-600 hover:underline">
                              Điều khoản dịch vụ
                            </a>{" "}
                            và{" "}
                            <a href="#" className="text-green-600 hover:underline">
                              Chính sách bảo mật
                            </a>
                          </label>
                        </div>

                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setActiveTab("cart")}>
                            Quay lại giỏ hàng
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700" onClick={handlePayment}>
                            Hoàn tất thanh toán
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-4">Tổng đơn hàng</h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tạm tính:</span>
                          <span>{formatPrice(calculateSubtotal())} VND</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">VAT (10%):</span>
                          <span>{formatPrice(calculateVAT())} VND</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium">
                          <span>Tổng cộng:</span>
                          <span className="text-green-600">{formatPrice(calculateTotal())} VND</span>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-3">
                        <h4 className="font-medium text-sm mb-2">Phương thức thanh toán đã chọn</h4>

                        <div
                          className={`flex items-center p-3 border rounded-md ${
                            selectedPaymentMethod === "credit-card"
                              ? "bg-blue-50 border-blue-200"
                              : selectedPaymentMethod === "atm-card"
                                ? "bg-green-50 border-green-200"
                                : selectedPaymentMethod === "bank-transfer"
                                  ? "bg-amber-50 border-amber-200"
                                  : "bg-purple-50 border-purple-200"
                          }`}
                        >
                          {selectedPaymentMethod === "credit-card" && (
                            <>
                              <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                              <span className="text-sm">Thẻ tín dụng / Thẻ ghi nợ quốc tế</span>
                            </>
                          )}
                          {selectedPaymentMethod === "atm-card" && (
                            <>
                              <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                              <span className="text-sm">Thẻ ATM nội địa / Internet Banking</span>
                            </>
                          )}
                          {selectedPaymentMethod === "bank-transfer" && (
                            <>
                              <BanknoteIcon className="h-5 w-5 mr-2 text-amber-600" />
                              <span className="text-sm">Chuyển khoản ngân hàng</span>
                            </>
                          )}
                          {selectedPaymentMethod === "company-invoice" && (
                            <>
                              <Building className="h-5 w-5 mr-2 text-purple-600" />
                              <span className="text-sm">Xuất hóa đơn cho công ty</span>
                            </>
                          )}
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="text-sm text-gray-500 space-y-2">
                        <p>Cần hỗ trợ? Liên hệ với chúng tôi:</p>
                        <p className="flex items-center">
                          <span className="font-medium mr-1">Hotline:</span>
                          <a href="tel:02839258456" className="text-green-600 hover:underline">
                            (028) 3925 8456
                          </a>
                        </p>
                        <p className="flex items-center">
                          <span className="font-medium mr-1">Email:</span>
                          <a href="mailto:support@jobfind.vn" className="text-green-600 hover:underline">
                            support@jobfind.vn
                          </a>
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t flex items-center justify-center">
                        <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50">
                          Giao dịch được bảo mật
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
