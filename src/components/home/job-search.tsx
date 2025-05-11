'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin, Building2 } from 'lucide-react';

export default function JobSearch() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full bg-white py-6 border-b">
      <div className="max-w-[1350px] mx-auto px-4">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm tên công việc..."
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 pl-10">
                    <SelectValue placeholder="Tất cả địa điểm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả địa điểm</SelectItem>
                    <SelectItem value="hanoi">Hà Nội</SelectItem>
                    <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                    <SelectItem value="danang">Đà Nẵng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 pl-10">
                    <SelectValue placeholder="Tất cả ngành nghề" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả ngành nghề</SelectItem>
                    <SelectItem value="it">Công nghệ thông tin</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="finance">Tài chính - Kế toán</SelectItem>
                    <SelectItem value="construction">Xây dựng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="md:col-span-1">
              <Button
                type="submit"
                onClick={handleSearch}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
