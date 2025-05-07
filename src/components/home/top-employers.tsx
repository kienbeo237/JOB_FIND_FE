"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const employers = [
  { id: 1, name: "Meta", logo: "/placeholder.svg?height=60&width=120" },
  { id: 2, name: "Amazon", logo: "/placeholder.svg?height=60&width=120" },
  { id: 3, name: "Techcombank", logo: "/placeholder.svg?height=60&width=120" },
  { id: 4, name: "Microsoft", logo: "/placeholder.svg?height=60&width=120" },
  { id: 5, name: "Canon", logo: "/placeholder.svg?height=60&width=120" },
  { id: 6, name: "Google", logo: "/placeholder.svg?height=60&width=120" },
]

export default function TopEmployers() {
  return (
    <section className="mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-2xl font-bold text-center text-gray-900"
      >
        Nhà tuyển dụng hàng đầu
      </motion.h2>

      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-2 max-w-6xl">
          {employers.map((employer, index) => (
            <motion.div
              key={employer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/nha-tuyen-dung/${employer.id}`}
                className="flex h-20 w-40 items-center justify-center rounded-lg border bg-white p-4 transition-all hover:border-emerald-600/50 hover:shadow-md"
              >
                <Image
                  src={employer.logo || "/placeholder.svg"}
                  alt={employer.name}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
