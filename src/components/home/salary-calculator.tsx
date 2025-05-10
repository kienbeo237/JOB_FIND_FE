"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Calculator } from "lucide-react"

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<string>("")
  const [calculatedNet, setCalculatedNet] = useState<string>("")
  const [calculatedGross, setCalculatedGross] = useState<string>("")

  const calculateNetFromGross = (gross: number) => {
    return gross * 0.8
  }

  const handleCalculate = () => {
    const gross = Number.parseFloat(grossSalary)
    if (!isNaN(gross)) {
      const net = calculateNetFromGross(gross)
      setCalculatedGross(gross.toLocaleString("vi-VN"))
      setCalculatedNet(net.toLocaleString("vi-VN"))
    }
  }

  return (
    <section className="py-12 bg-emerald-50">
      <div className="max-w-[1350px] mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center space-y-2 pb-4">
            <CardTitle className="text-2xl font-bold text-emerald-600 flex items-center justify-center gap-2">
              <Calculator className="w-6 h-6" />
              Công Cụ Đổi Lương Gross-Net
            </CardTitle>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Nhập mức lương để chuyển đổi giữa lương Gross và Net, giúp bạn hiểu rõ thu nhập thực tế. Áp dụng mức lương
              cơ sở mới nhất có hiệu lực từ ngày 01/07/2024. (Theo Nghị định số 73/2024/NĐ-CP)
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side inputs */}
                <div className="space-y-4">
                  <div>
                    <Label>Người phụ thuộc</Label>
                    <Input
                      type="text"
                      placeholder="4,400,000đ"
                      value={grossSalary}
                      onChange={(e) => setGrossSalary(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Lương cơ sở</Label>
                    <Input type="text" placeholder="2,340,000đ" />
                  </div>
                  <div>
                    <Label>Giảm trừ gia cảnh bản thân</Label>
                    <Input type="text" placeholder="11,000,000đ" />
                  </div>
                </div>

                {/* Right side inputs */}
                <div className="space-y-4">
                  <div>
                    <Label>Chọn loại lương cần chuyển đổi:</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Thu nhập của bạn" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gross-to-net">Gross sang Net</SelectItem>
                        <SelectItem value="net-to-gross">Net sang Gross</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Số người phụ thuộc</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div>
                      <Label>Mức lương đóng BHXH</Label>
                      <Input type="text" placeholder="Nhập mức lương" />
                    </div>
                  </div>

                  <div>
                    <Label>Khu vực:</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Vùng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Vùng 1</SelectItem>
                        <SelectItem value="2">Vùng 2</SelectItem>
                        <SelectItem value="3">Vùng 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-base" onClick={handleCalculate}>
                  Chuyển đổi <Calculator className="ml-2 h-5 w-5" />
                </Button>

                {(calculatedGross || calculatedNet) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-orange-600 font-medium mb-1">GROSS</div>
                      <div className="text-xl font-bold">{calculatedGross}đ</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-green-600 font-medium mb-1">NET</div>
                      <div className="text-xl font-bold">{calculatedNet}đ</div>
                    </div>
                  </div>
                )}

                <Button variant="outline" className="w-full h-12">
                  Thử công cụ khác ngay <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
