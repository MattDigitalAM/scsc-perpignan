/**
 * Design: "Plomberie Méditerranéen"
 * Page liste du blog SEO
 * Colors: Navy #0A1628, Yellow #06b6d4
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, Tag, ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/data";

const categories = ["Tous", "Tarifs & Devis", "Normes & Sécurité", "Véhicule Plomberie", "Énergie Solaire", "Conseils Pratiques", "Domotique", "Tableau Plomberie", "Construction Neuve"];

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
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogListPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        {/* Breadcrumb */}
        <div className="bg-[#F4F5F7] border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm font-['Inter']">
              <Link href="/" className="text-gray-500 hover:text-[#0A1628] transition-colors">Accueil</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-[#0A1628] font-medium">Blog</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-[#0A1628] py-14 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,197,24,0.6) 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-3">Conseils & Actualités</p>
              <h1 className="font-['Montserrat'] font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                Blog Plomberie
                <br />
                <span className="text-[#06b6d4]">Perpignan & Pyrénées-Orientales</span>
              </h1>
              <p className="text-gray-300 font-['Inter'] text-lg max-w-2xl mx-auto">
                Conseils pratiques, guides techniques et actualités sur le plombier, la domotique et les énergies renouvelables par votre plombier local.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories filter */}
        <div className="bg-white border-b border-gray-200 sticky top-16 lg:top-20 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-['Montserrat'] font-semibold transition-colors ${
                    cat === "Tous"
                      ? "bg-[#0A1628] text-white"
                      : "bg-[#F4F5F7] text-gray-600 hover:bg-[#0A1628] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="py-12 lg:py-20 bg-[#F4F5F7]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Featured article */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <Link href={`/blog/${featured.slug}`}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer lg:flex">
                  <div className="lg:w-1/2 relative overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-56 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold text-xs px-3 py-1.5 rounded-full">
                        À la une
                      </span>
                    </div>
                  </div>
                  <div className="lg:w-1/2 p-7 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-['Montserrat'] font-semibold px-3 py-1 rounded-full ${categoryColors[featured.category] || "bg-gray-100 text-gray-600"}`}>
                        {featured.category}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Clock size={12} />
                        <span>{featured.readTime} de lecture</span>
                      </div>
                    </div>
                    <h2 className="font-['Montserrat'] font-black text-xl lg:text-2xl text-[#0A1628] mb-3 group-hover:text-[#06b6d4] transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 font-['Inter'] text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs font-['Inter']">{formatDate(featured.publishedAt)}</span>
                      <div className="flex items-center gap-1 text-[#06b6d4] font-['Montserrat'] font-semibold text-sm">
                        <span>Lire l'article</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Grid of articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                      {/* Image */}
                      <div className="relative overflow-hidden h-44">
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
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Clock size={11} />
                            <span>{post.readTime}</span>
                          </div>
                          <span className="text-gray-300">·</span>
                          <span className="text-gray-400 text-xs font-['Inter']">{formatDate(post.publishedAt)}</span>
                        </div>
                        <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-base mb-2 group-hover:text-[#06b6d4] transition-colors leading-snug flex-1">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 font-['Inter'] text-xs leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="flex items-center gap-1 text-xs text-gray-400 bg-[#F4F5F7] px-2 py-0.5 rounded-full">
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="py-14 bg-[#0A1628]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Montserrat'] font-black text-2xl sm:text-3xl text-white mb-3">
              Un projet plomberie à Perpignan ?
            </h2>
            <p className="text-gray-400 font-['Inter'] mb-6">Nos experts vous conseillent et vous établissent un devis gratuit.</p>
            <a href="/#contact" className="inline-flex items-center gap-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold px-8 py-3.5 rounded-xl hover:bg-cyan-500 transition-colors">
              Demander un devis gratuit
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
