/**
 * Design: "Plomberie Méditerranéen"
 * Blog preview section for the homepage – shows 3 latest articles
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";

const categoryColors: Record<string, string> = {
  "Tarifs & Devis": "bg-blue-100 text-blue-700",
  "Normes & Sécurité": "bg-red-100 text-red-700",
  "Véhicule Plomberie": "bg-green-100 text-green-700",
  "Énergie Solaire": "bg-orange-100 text-orange-700",
  "Conseils Pratiques": "bg-purple-100 text-purple-700",
  "Domotique": "bg-teal-100 text-teal-700",
  "Tableau Plomberie": "bg-indigo-100 text-indigo-700",
  "Construction Neuve": "bg-yellow-100 text-yellow-700",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const featured = blogPosts.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-2">
              Conseils & guides
            </p>
            <h2 className="font-['Montserrat'] font-black text-3xl sm:text-4xl text-[#0A1628]">
              Le blog{" "}
              <span className="relative inline-block">
                plomberie
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#06b6d4] rounded-full" />
              </span>
            </h2>
          </div>
          <Link href="/blog">
            <div className="flex items-center gap-2 text-[#0A1628] font-['Montserrat'] font-semibold text-sm hover:text-[#06b6d4] transition-colors cursor-pointer group">
              Tous les articles
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                  {/* Image */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className={`absolute top-3 left-3 text-xs font-['Montserrat'] font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1 text-gray-400 text-xs font-['Inter']">
                        <Clock size={11} />
                        <span>{post.readTime}</span>
                      </div>
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-400 text-xs font-['Inter']">{formatDate(post.publishedAt)}</span>
                    </div>
                    <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-base mb-2 group-hover:text-[#06b6d4] transition-colors leading-snug flex-1 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 font-['Inter'] text-xs leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-[#06b6d4] font-['Montserrat'] font-semibold text-xs mt-auto">
                      <span>Lire l'article</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
