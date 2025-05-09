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
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JobSearch() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative -mt-8 mb-12 rounded-lg bg-white p-6 shadow-lg"
    >
      <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-4">
        <div className="relative">
          <Input
            placeholder="Tìm kiếm tên công việc..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Tất cả địa điểm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả địa điểm</SelectItem>
            <SelectItem value="hanoi">Hà Nội</SelectItem>
            <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
            <SelectItem value="danang">Đà Nẵng</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Tất cả ngành nghề" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả ngành nghề</SelectItem>
            <SelectItem value="it">IT - Phần mềm</SelectItem>
            <SelectItem value="finance">Tài chính</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="construction">Xây dựng</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          <Search className="mr-2 h-4 w-4" />
          Tìm kiếm
        </Button>
      </form>
    </motion.div>
  );
}
