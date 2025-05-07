"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator } from "lucide-react"

export default function SalaryCalculator() {
  const [dependents, setDependents] = useState("0")
  const [grossSalary, setGrossSalary] = useState("4400000")
  const [baseSalary, setBaseSalary] = useState("2340000")
  const [personalDeduction, setPersonalDeduction] = useState("11000000")
  const [region, setRegion] = useState("Vùng")

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    // Calculation logic would go here
    console.log({ dependents, grossSalary, baseSalary, personalDeduction, region })
  }

  return (
    <section className="mb-12">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <Calculator className="h-6 w-6 text-emerald-600" />
          </div>
          <CardTitle className="text-xl">Công Cụ Đổi Lương Gross-Net</CardTitle>
          <CardDescription>
            Nhập mức lương để chuyển đổi giữa lương Gross và Net, giúp bạn hiểu rõ thu nhập thực tế. Áp dụng mức lương
            cơ sở mới nhất có hiệu lực từ ngày 01/07/2024. (Theo Nghị định số 73/2024/NĐ-CP)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dependents">Người phụ thuộc</Label>
              <Input id="dependents" type="text" value={dependents} onChange={(e) => setDependents(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary-type">Chọn loại lương cần chuyển đổi:</Label>
              <Select defaultValue="income">
                <SelectTrigger id="salary-type">
                  <SelectValue placeholder="Thu nhập của bạn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Thu nhập của bạn</SelectItem>
                  <SelectItem value="gross">Lương Gross</SelectItem>
                  <SelectItem value="net">Lương Net</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="base-salary">Lương cơ sở</Label>
              <Input id="base-salary" type="text" value={baseSalary} onChange={(e) => setBaseSalary(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dependents-count">Số người phụ thuộc</Label>
              <Input
                id="dependents-count"
                type="text"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personal-deduction">Giảm trừ gia cảnh bản thân</Label>
              <Input
                id="personal-deduction"
                type="text"
                value={personalDeduction}
                onChange={(e) => setPersonalDeduction(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Khu vực:</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger id="region">
                  <SelectValue placeholder="Vùng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="region1">Vùng 1</SelectItem>
                  <SelectItem value="region2">Vùng 2</SelectItem>
                  <SelectItem value="region3">Vùng 3</SelectItem>
                  <SelectItem value="region4">Vùng 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Chuyển đổi
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Button variant="link" className="text-emerald-600">
              Thử công cụ khác ngay
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
