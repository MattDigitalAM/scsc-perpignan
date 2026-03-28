/**
 * Design: "Plomberie Méditerranéen"
 * Page article de blog individuelle avec contenu SEO optimisé
 * Colors: Navy #0A1628, Yellow #06b6d4
 */
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  Clock, Tag, ChevronRight, ArrowRight,
  Phone, AlertCircle, Lightbulb, Share2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPostBySlug, blogPosts, BlogSection } from "@/lib/data";
import NotFound from "./NotFound";
import { useSEO, buildArticleJsonLd, buildFaqJsonLd } from "@/hooks/useSEO";

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
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "h2":
      return (
        <h2 className="font-['Montserrat'] font-black text-2xl text-[#0A1628] mt-10 mb-4 pb-2 border-b-2 border-[#06b6d4]">
          {section.content as string}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-['Montserrat'] font-bold text-lg text-[#0A1628] mt-7 mb-3">
          {section.content as string}
        </h3>
      );
    case "p":
      return (
        <p className="text-gray-600 font-['Inter'] text-base leading-relaxed mb-4">
          {section.content as string}
        </p>
      );
    case "ul":
      return (
        <ul className="mb-5 space-y-2">
          {(section.content as string[]).map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600 font-['Inter'] text-sm">
              <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <div className="my-6 flex gap-4 bg-[#06b6d4]/10 border-l-4 border-[#06b6d4] rounded-r-xl p-5">
          <Lightbulb size={20} className="text-[#06b6d4] flex-shrink-0 mt-0.5" />
          <p className="text-[#0A1628] font-['Inter'] text-sm leading-relaxed">{section.content as string}</p>
        </div>
      );
    case "warning":
      return (
        <div className="my-6 flex gap-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl p-5">
          <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 font-['Inter'] text-sm leading-relaxed">{section.content as string}</p>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "");

  if (!post) return <NotFound />;

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3);

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const displayRelated = relatedPosts.length > 0 ? relatedPosts : otherPosts;

  // FAQ sections extraites du contenu pour JSON-LD
  const faqSections = post.content
    .filter((s) => s.type === "h2" || s.type === "h3")
    .slice(0, 5)
    .map((s) => ({
      question: s.content as string,
      answer: post.excerpt,
    }));

  useSEO({
    title: post.metaTitle,
    description: post.metaDescription,
    canonical: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedAt: post.publishedAt,
    jsonLd: [
      buildArticleJsonLd({
        title: post.title,
        description: post.metaDescription,
        url: `https://plombier-perpignan66.fr/blog/${post.slug}`,
        image: post.image,
        publishedAt: post.publishedAt,
        tags: post.tags,
      }),
      ...(faqSections.length > 0 ? [buildFaqJsonLd(faqSections)] : []),
    ],
  });

  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        {/* Breadcrumb */}
        <div className="bg-[#F4F5F7] border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm font-['Inter'] flex-wrap">
              <Link href="/" className="text-gray-500 hover:text-[#0A1628] transition-colors">Accueil</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <Link href="/blog" className="text-gray-500 hover:text-[#0A1628] transition-colors">Blog</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-[#0A1628] font-medium truncate max-w-xs">{post.title}</span>
            </div>
          </div>
        </div>

        {/* Article hero */}
        <section className="bg-[#0A1628] py-12 lg:py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,197,24,0.6) 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`text-xs font-['Montserrat'] font-semibold px-3 py-1.5 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Clock size={14} />
                  <span>{post.readTime} de lecture</span>
                </div>
                <span className="text-gray-500 text-sm font-['Inter']">{formatDate(post.publishedAt)}</span>
              </div>
              <h1 className="font-['Montserrat'] font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-gray-300 font-['Inter'] text-base leading-relaxed mb-6">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-xs text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    <Tag size={11} />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article image */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl -mt-6 relative z-10">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img src={post.image} alt={post.title} className="w-full h-56 sm:h-72 lg:h-80 object-cover" loading="lazy" />
          </div>
        </div>

        {/* Article content + sidebar */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {/* Main content */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                {post.content.map((section, i) => (
                  <RenderSection key={i} section={section} />
                ))}

                {/* Share */}
                <div className="mt-10 pt-6 border-t border-gray-200 flex items-center gap-4">
                  <span className="text-sm text-gray-500 font-['Montserrat'] font-semibold flex items-center gap-2">
                    <Share2 size={16} />
                    Partager
                  </span>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-[#1877F2] text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">Facebook</a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-[#1DA1F2] text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">Twitter</a>
                </div>
              </motion.article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* CTA card */}
                  <div className="bg-[#0A1628] rounded-2xl p-6 text-white">
                    <div className="w-10 h-10 bg-[#06b6d4] rounded-xl flex items-center justify-center mb-4">
                      <Phone size={20} className="text-[#0A1628]" />
                    </div>
                    <h3 className="font-['Montserrat'] font-bold text-lg mb-2">Besoin d'un plombier ?</h3>
                    <p className="text-gray-400 text-sm font-['Inter'] mb-5">Devis gratuit sous 24h. Intervention rapide dans les Pyrénées-Orientales.</p>
                    <a href="/#contact" className="block text-center bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold py-3 rounded-xl hover:bg-cyan-500 transition-colors text-sm mb-3">
                      Devis gratuit
                    </a>
                    <a href="tel:+33468000000" className="block text-center border border-white/20 text-white font-['Montserrat'] font-semibold py-3 rounded-xl hover:border-[#06b6d4] hover:text-[#06b6d4] transition-colors text-sm">
                      04 68 XX XX XX
                    </a>
                  </div>

                  {/* Related articles */}
                  <div className="bg-[#F4F5F7] rounded-2xl p-5">
                    <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-base mb-4">Articles similaires</h3>
                    <div className="space-y-4">
                      {displayRelated.map((related) => (
                        <Link key={related.slug} href={`/blog/${related.slug}`}>
                          <div className="group flex gap-3 cursor-pointer">
                            <img src={related.image} alt={related.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" loading="lazy" />
                            <div>
                              <p className="text-xs text-gray-500 font-['Inter'] mb-1">{related.category}</p>
                              <h4 className="font-['Montserrat'] font-semibold text-[#0A1628] text-xs leading-snug group-hover:text-[#06b6d4] transition-colors line-clamp-2">
                                {related.title}
                              </h4>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Services links */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-base mb-4">Nos services</h3>
                    <div className="space-y-2">
                      {["Installation sanitaire", "Débouchage", "Dépannage d'urgence", "Chauffe-eau", "Débouchage", "Débouchage de canalisations"].map((service) => (
                        <Link key={service} href="/services">
                          <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#06b6d4] transition-colors cursor-pointer group">
                            <ArrowRight size={13} className="text-[#06b6d4] flex-shrink-0" />
                            <span className="font-['Inter']">{service}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* More articles */}
        <section className="py-12 bg-[#F4F5F7]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-['Montserrat'] font-black text-xl text-[#0A1628]">Plus d'articles</h2>
              <Link href="/blog">
                <span className="flex items-center gap-1 text-[#06b6d4] font-['Montserrat'] font-semibold text-sm hover:underline cursor-pointer">
                  Voir tout <ArrowRight size={14} />
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {displayRelated.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`}>
                  <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <img src={related.image} alt={related.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <div className="p-4">
                      <span className={`text-xs font-['Montserrat'] font-semibold px-2 py-0.5 rounded-full ${categoryColors[related.category] || "bg-gray-100 text-gray-600"}`}>
                        {related.category}
                      </span>
                      <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-sm mt-2 leading-snug group-hover:text-[#06b6d4] transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
