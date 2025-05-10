"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, ShoppingCart } from "lucide-react"

interface PricingItem {
  period: string
  price: string
  priceValue: number
  quantity: number
  total: string
}

interface JobPostingPackageProps {
  title: string
  benefits: string[]
  description?: string
  pricing: PricingItem[]
  packageTitle: string
  onAddToCart: (packageInfo: any, quantity: number) => void
}

const JobPostingPackage: React.FC<JobPostingPackageProps> = ({
  title,
  benefits,
  description,
  pricing,
  packageTitle,
  onAddToCart,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [totals, setTotals] = useState<Record<string, string>>({})

  useEffect(() => {
    // Initialize quantities and totals
    const initialQuantities: Record<string, number> = {}
    const initialTotals: Record<string, string> = {}

    pricing.forEach((item) => {
      initialQuantities[item.period] = 0
      initialTotals[item.period] = "VND 0"
    })

    setQuantities(initialQuantities)
    setTotals(initialTotals)
  }, [pricing])

  const handleQuantityChange = (period: string, value: number) => {
    if (value < 0) value = 0

    const updatedQuantities = { ...quantities, [period]: value }
    setQuantities(updatedQuantities)

    // Update totals
    const priceItem = pricing.find((item) => item.period === period)
    if (priceItem) {
      const total = priceItem.priceValue * value
      const formattedTotal = `VND ${total.toLocaleString()}`
      setTotals({ ...totals, [period]: formattedTotal })
    }
  }

  const handleAddToCart = (period: string) => {
    const quantity = quantities[period] || 0
    const packageInfo = pricing.find((item) => item.period === period)

    if (packageInfo) {
      const packageData = {
        ...packageInfo,
        packageTitle,
        benefits,
      }

      onAddToCart(packageData, quantity)
    }
  }

  return (
    <Card className="border-gray-200">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Quyền lợi:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-gray-600">
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium text-gray-600">Thời gian</th>
                <th className="text-left py-3 font-medium text-gray-600">Giá (VND)</th>
                <th className="text-left py-3 font-medium text-gray-600">Số lượng</th>
                <th className="text-left py-3 font-medium text-gray-600">Thành tiền</th>
                <th className="text-left py-3 font-medium text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4">{item.period}</td>
                  <td className="py-4">{item.price}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.period, (quantities[item.period] || 0) - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{quantities[item.period] || 0}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.period, (quantities[item.period] || 0) + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-4">{totals[item.period] || "VND 0"}</td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                        onClick={() => handleAddToCart(item.period)}
                        disabled={(quantities[item.period] || 0) <= 0}
                      >
                        <ShoppingCart className="mr-1 h-4 w-4" />
                        Thêm vào giỏ
                      </Button>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                        disabled={(quantities[item.period] || 0) <= 0}
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
      </CardContent>
    </Card>
  )
}

export default JobPostingPackage
