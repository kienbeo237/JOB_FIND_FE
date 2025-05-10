"use client"
import Image from "next/image"
import Link from "next/link"

const employers = [
  {
    id: 1,
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
    link: "#",
  },
  {
    id: 2,
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    link: "#",
  },
  {
    id: 3,
    name: "Techcombank",
    logo: "https://upload.wikimedia.org/wikipedia/vi/7/7c/Techcombank_logo.png",
    link: "#",
  },
  {
    id: 4,
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    link: "#",
  },
  {
    id: 5,
    name: "Canon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Canon_logo.svg",
    link: "#",
  },
  {
    id: 6,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    link: "#",
  },
]

export default function TopEmployers() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1350px] mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Nhà tuyển dụng hàng đầu</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {employers.map((employer) => (
            <Link
              key={employer.id}
              href={employer.link}
              className="flex items-center justify-center p-6 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow group"
            >
              <Image
                src={employer.logo || "/placeholder.svg"}
                alt={employer.name}
                width={120}
                height={40}
                className="max-h-8 w-auto group-hover:scale-105 transition-transform"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
