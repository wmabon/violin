"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Award, Music2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const credentials = [
  {
    icon: GraduationCap,
    title: "Belmont University Performance Major",
    description: "Pursuing a Bachelor of Music Performance (Violin) from Belmont University",
  },
  {
    icon: Award,
    title: "Award Winner",
    description: "Multiple competition prizes and recognitions",
  },
  {
    icon: Music2,
    title: "Orchestra Experience",
    description: "Performed with Boston Pops Conductor Keith Lockhart; toured with Andrea Bocelli across the Southeast U.S.",
  },
];

export function AboutPreview() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=2070')",
                }}
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -right-4 -bottom-4 lg:-right-8 lg:-bottom-8 bg-white rounded-xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <Music2 className="h-8 w-8 text-amber-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-900">12+</div>
                  <div className="text-stone-500">Years of Experience</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-6">
              Meet Harrison
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
              With over 12 years of performance experience, I bring a unique
              blend of classical training and musicality to every event. My
              journey began under the tutelage of the renown Nonnie Detrick and
              I am presently studying performance at Belmont University, where I
              am honing my craft under world-renowned masters.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              Today, I specialize in creating bespoke musical experiences for
              discerning clients who understand that live music transforms any
              occasion from ordinary to extraordinary. Every performance is
              tailored to reflect your unique vision and to create lasting
              memories.
            </p>

            {/* Credentials */}
            <div className="space-y-4 mb-8">
              {credentials.map((credential) => (
                <div
                  key={credential.title}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <credential.icon className="h-5 w-5 text-amber-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900">
                      {credential.title}
                    </div>
                    <div className="text-stone-500 text-sm">
                      {credential.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button size="lg">
                Read Full Bio
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
