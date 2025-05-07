'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const featuredJobs = [
  {
    id: 1,
    title: 'Tuyển dụng: Lập trình viên Frontend React',
    company: 'TechSolify',
    description: 'Môi trường làm việc năng động, sáng tạo',
    image: '/placeholder.svg?height=300&width=600',
  },
  {
    id: 2,
    title: 'Tuyển dụng: Digital Marketing Executive',
    company: 'BeeMedia',
    description: 'Đãi ngộ cao, phát triển cùng đội nhóm trẻ năng động',
    image: '/placeholder.svg?height=300&width=600',
  },
];

export default function FeaturedJobs() {
  return (
    <section className="mb-12">
      <div className="grid gap-6 md:grid-cols-2">
        {featuredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Link href={`/viec-lam/${job.id}`}>
              <Card className="group overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={job.image || '/placeholder.svg'}
                    alt={job.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-white/80">
                      {job.company} - {job.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
