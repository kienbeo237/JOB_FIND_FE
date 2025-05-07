"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Briefcase, Building2, Code2, DollarSign, HardHat, Layers, ShoppingBag, Wallet } from "lucide-react"

const categories = [
  { id: "all", name: "Tất cả", icon: <Briefcase className="h-5 w-5" /> },
  { id: "banking", name: "Ngân hàng", icon: <Wallet className="h-5 w-5" /> },
  { id: "realestate", name: "Bất động sản", icon: <Building2 className="h-5 w-5" /> },
  { id: "it", name: "IT - Phần mềm", icon: <Code2 className="h-5 w-5" /> },
  { id: "construction", name: "Xây dựng", icon: <HardHat className="h-5 w-5" /> },
  { id: "metaverse", name: "Metaverse", icon: <Layers className="h-5 w-5" /> },
  { id: "finance", name: "Tài chính", icon: <DollarSign className="h-5 w-5" /> },
  { id: "retail", name: "Bán lẻ - Hàng tiêu dùng", icon: <ShoppingBag className="h-5 w-5" /> },
]

export default function JobCategories() {
  return (
    <section className="mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full border-gray-200 hover:border-emerald-600 hover:text-emerald-600"
            >
              {category.icon}
              {category.name}
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
