'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calculator } from 'lucide-react';

const PERSONAL_DEDUCTION = 11000000;
const DEPENDENT_DEDUCTION = 4400000;
const BASE_SALARY = 2340000;

export default function SalaryCalculator() {
  const [calculationType, setCalculationType] =
    useState<string>('gross-to-net');
  const [salary, setSalary] = useState<string>('');
  const [dependents, setDependents] = useState<string>('0');
  const [region, setRegion] = useState<string>('1');
  const [socialInsuranceSalary, setSocialInsuranceSalary] =
    useState<string>('');
  const [calculatedGross, setCalculatedGross] = useState<string>('');
  const [calculatedNet, setCalculatedNet] = useState<string>('');

  const [baseSalary, setBaseSalary] = useState<string>(
    BASE_SALARY.toLocaleString('vi-VN')
  );
  const [personalDeduction, setPersonalDeduction] = useState<string>(
    PERSONAL_DEDUCTION.toLocaleString('vi-VN')
  );

  const SOCIAL_INSURANCE_RATE = 0.08;
  const HEALTH_INSURANCE_RATE = 0.015;
  const UNEMPLOYMENT_INSURANCE_RATE = 0.01;

  const REGIONAL_MIN_WAGES = {
    '1': 4680000,
    '2': 4160000,
    '3': 3640000,
  };

  const TAX_BRACKETS = [
    { threshold: 5000000, rate: 0.05 },
    { threshold: 10000000, rate: 0.1 },
    { threshold: 18000000, rate: 0.15 },
    { threshold: 32000000, rate: 0.2 },
    { threshold: 52000000, rate: 0.25 },
    { threshold: 80000000, rate: 0.3 },
    { threshold: Number.POSITIVE_INFINITY, rate: 0.35 },
  ];

  const calculateNetFromGross = (gross: number) => {
    const numDependents = Number.parseInt(dependents) || 0;
    const siSalary =
      Number.parseFloat(socialInsuranceSalary.replace(/,/g, '')) || gross;
    const currentBaseSalary =
      Number.parseFloat(baseSalary.replace(/,/g, '')) || BASE_SALARY;
    const currentPersonalDeduction =
      Number.parseFloat(personalDeduction.replace(/,/g, '')) ||
      PERSONAL_DEDUCTION;

    const socialInsurance =
      Math.min(siSalary, currentBaseSalary * 20) * SOCIAL_INSURANCE_RATE;
    const healthInsurance =
      Math.min(siSalary, currentBaseSalary * 20) * HEALTH_INSURANCE_RATE;
    const unemploymentInsurance =
      Math.min(
        siSalary,
        REGIONAL_MIN_WAGES[region as keyof typeof REGIONAL_MIN_WAGES] * 20
      ) * UNEMPLOYMENT_INSURANCE_RATE;

    const totalInsurance =
      socialInsurance + healthInsurance + unemploymentInsurance;

    const totalDeduction =
      currentPersonalDeduction + numDependents * DEPENDENT_DEDUCTION;
    let taxableIncome = gross - totalInsurance - totalDeduction;
    taxableIncome = Math.max(0, taxableIncome);

    let tax = 0;
    let remainingIncome = taxableIncome;
    let prevThreshold = 0;

    for (const bracket of TAX_BRACKETS) {
      const taxableAmount = Math.min(
        remainingIncome,
        bracket.threshold - prevThreshold
      );
      tax += taxableAmount * bracket.rate;
      remainingIncome -= taxableAmount;

      if (remainingIncome <= 0) break;
      prevThreshold = bracket.threshold;
    }

    const net = gross - totalInsurance - tax;
    return {
      gross,
      net,
      socialInsurance,
      healthInsurance,
      unemploymentInsurance,
      taxableIncome,
      tax,
    };
  };

  const calculateGrossFromNet = (net: number) => {
    let low = net;
    let high = net * 2;
    const targetNet = net;
    let result = null;

    for (let i = 0; i < 20; i++) {
      const mid = (low + high) / 2;
      const calculation = calculateNetFromGross(mid);

      if (Math.abs(calculation.net - targetNet) < 1000) {
        result = calculation;
        break;
      }

      if (calculation.net > targetNet) {
        high = mid;
      } else {
        low = mid;
      }
    }

    if (!result) {
      result = calculateNetFromGross(low);
    }

    return result;
  };

  const handleCalculate = () => {
    const salaryValue = Number.parseFloat(salary.replace(/,/g, '')) || 0;

    if (salaryValue <= 0) {
      setCalculatedGross('');
      setCalculatedNet('');
      return;
    }

    let result;

    if (calculationType === 'gross-to-net') {
      result = calculateNetFromGross(salaryValue);
    } else {
      result = calculateGrossFromNet(salaryValue);
    }

    setCalculatedGross(result.gross.toLocaleString('vi-VN'));
    setCalculatedNet(result.net.toLocaleString('vi-VN'));
  };

  const formatCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');

    if (value) {
      const number = Number.parseInt(value, 10);
      e.target.value = number.toLocaleString('vi-VN');
    }

    return e.target.value;
  };

  return (
    <section className="py-12 bg-emerald-50">
      <div className="max-w-[1350px] mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-lg border-emerald-100">
          <CardHeader className="text-center space-y-2 pb-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Calculator className="w-6 h-6" />
              Công Cụ Đổi Lương Gross-Net
            </CardTitle>
            <p className="text-sm text-emerald-50 max-w-2xl mx-auto">
              Nhập mức lương để chuyển đổi giữa lương Gross và Net, giúp bạn
              hiểu rõ thu nhập thực tế. Áp dụng mức lương cơ sở mới nhất có hiệu
              lực từ ngày 01/07/2024. (Theo Nghị định số 73/2024/NĐ-CP)
            </p>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left side inputs */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-emerald-700">
                      Chọn loại lương cần chuyển đổi:
                    </Label>
                    <Select
                      value={calculationType}
                      onValueChange={setCalculationType}
                    >
                      <SelectTrigger className="border-emerald-200 focus:ring-emerald-500">
                        <SelectValue placeholder="Thu nhập của bạn" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gross-to-net">
                          Gross sang Net
                        </SelectItem>
                        <SelectItem value="net-to-gross">
                          Net sang Gross
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-emerald-700">
                      {calculationType === 'gross-to-net'
                        ? 'Lương Gross (tổng)'
                        : 'Lương Net (thực lãnh)'}
                    </Label>
                    <Input
                      type="text"
                      placeholder="Nhập mức lương"
                      value={salary}
                      onChange={e => {
                        const formattedValue = formatCurrency(e);
                        setSalary(formattedValue);
                      }}
                      className="border-emerald-200 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Replace the "Lương cơ sở" input field with this editable version: */}
                  <div>
                    <Label className="text-emerald-700">Lương cơ sở</Label>
                    <Input
                      type="text"
                      value={baseSalary}
                      onChange={e => {
                        const formattedValue = formatCurrency(e);
                        setBaseSalary(formattedValue);
                      }}
                      className="border-emerald-200 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Right side inputs */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-emerald-700">
                        Số người phụ thuộc
                      </Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={dependents}
                        onChange={e => setDependents(e.target.value)}
                        className="border-emerald-200 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label className="text-emerald-700">
                        Mức lương đóng BHXH
                      </Label>
                      <Input
                        type="text"
                        placeholder="Nhập mức lương"
                        value={socialInsuranceSalary}
                        onChange={e => {
                          const formattedValue = formatCurrency(e);
                          setSocialInsuranceSalary(formattedValue);
                        }}
                        className="border-emerald-200 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-emerald-700">Khu vực:</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="border-emerald-200 focus:ring-emerald-500">
                        <SelectValue placeholder="Vùng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Vùng 1 (4,680,000đ)</SelectItem>
                        <SelectItem value="2">Vùng 2 (4,160,000đ)</SelectItem>
                        <SelectItem value="3">Vùng 3 (3,640,000đ)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Replace the "Giảm trừ gia cảnh bản thân" input field with this editable version: */}
                  <div>
                    <Label className="text-emerald-700">
                      Giảm trừ gia cảnh bản thân
                    </Label>
                    <Input
                      type="text"
                      value={personalDeduction}
                      onChange={e => {
                        const formattedValue = formatCurrency(e);
                        setPersonalDeduction(formattedValue);
                      }}
                      className="border-emerald-200 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-base"
                  onClick={handleCalculate}
                >
                  Chuyển đổi <Calculator className="ml-2 h-5 w-5" />
                </Button>

                {(calculatedGross || calculatedNet) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <div className="text-orange-600 font-medium mb-1">
                        GROSS
                      </div>
                      <div className="text-xl font-bold">
                        {calculatedGross}đ
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="text-green-600 font-medium mb-1">NET</div>
                      <div className="text-xl font-bold">{calculatedNet}đ</div>
                    </div>
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full h-12 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  Thử công cụ khác ngay <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
