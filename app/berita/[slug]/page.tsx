"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  Eye,
  Tag,
  ExternalLink,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface Berita {
  id: string;
  judul: string;
  slug: string;
  konten: string;
  ringkasan: string | null;
  kategori: string;
  gambarUtama: string | null;
  tags: string[];
  sourceUrl: string | null;
  isExternal: boolean;
  views: number;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  admin: {
    nama: string;
    username: string;
  };
}

export default function BeritaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [berita, setBerita] = useState<Berita | null>(null);
  const [relatedBerita, setRelatedBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBerita();
    }
  }, [slug]);

  const fetchBerita = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/berita/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          router.push("/berita");
          return;
        }
        throw new Error("Gagal mengambil data berita");
      }

      const data = await response.json();
      setBerita(data);

      // Fetch related berita
      const relatedResponse = await fetch(
        `/api/berita?kategori=${data.kategori}&limit=3`
      );
      if (relatedResponse.ok) {
        const relatedData = await relatedResponse.json();
        setRelatedBerita(
          relatedData.filter((item: Berita) => item.slug !== slug)
        );
      }
    } catch (error) {
      console.error("Error fetching berita:", error);
      router.push("/berita");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = berita?.judul || "";

    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link berhasil disalin!");
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-96 bg-slate-200 rounded-2xl mb-8"></div>
              <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!berita) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push("/berita")}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Berita
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Featured Image */}
              {berita.gambarUtama && (
                <div className="relative h-96 w-full">
                  <Image
                    src={berita.gambarUtama}
                    alt={berita.judul}
                    fill
                    className="object-cover"
                    priority
                  />
                  {berita.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold">
                      Featured
                    </div>
                  )}
                </div>
              )}

              {/* Article Content */}
              <div className="p-8">
                {/* Category Badge */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold">
                    {berita.kategori}
                  </span>
                  {berita.isExternal && berita.sourceUrl && (
                    <a
                      href={berita.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Sumber Eksternal
                    </a>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {berita.judul}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-gray-600 mb-6 pb-6 border-b">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>
                      {berita.publishedAt
                        ? format(new Date(berita.publishedAt), "dd MMMM yyyy", {
                            locale: idLocale,
                          })
                        : format(new Date(berita.createdAt), "dd MMMM yyyy", {
                            locale: idLocale,
                          })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span>{berita.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>oleh {berita.admin.nama}</span>
                  </div>
                </div>

                {/* Summary */}
                {berita.ringkasan && (
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                    <p className="text-gray-700 italic">{berita.ringkasan}</p>
                  </div>
                )}

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none mb-8"
                  dangerouslySetInnerHTML={{
                    __html: berita.konten.replace(/\n/g, "<br/>"),
                  }}
                />

                {/* Tags */}
                {berita.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Tag className="w-5 h-5 text-gray-600" />
                    {berita.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Share */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-semibold">
                      Bagikan Artikel:
                    </span>
                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>Bagikan</span>
                      </button>

                      {showShareMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                          <button
                            onClick={() => handleShare("facebook")}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                          >
                            <Facebook className="w-5 h-5 text-blue-600" />
                            Facebook
                          </button>
                          <button
                            onClick={() => handleShare("twitter")}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                          >
                            <Twitter className="w-5 h-5 text-sky-500" />
                            Twitter
                          </button>
                          <button
                            onClick={() => handleShare("linkedin")}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                          >
                            <Linkedin className="w-5 h-5 text-blue-700" />
                            LinkedIn
                          </button>
                          <button
                            onClick={() => handleShare("copy")}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                          >
                            <LinkIcon className="w-5 h-5 text-gray-600" />
                            Salin Link
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Related Articles */}
              {relatedBerita.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Artikel Terkait
                  </h3>
                  <div className="space-y-4">
                    {relatedBerita.map((related) => (
                      <Link
                        key={related.id}
                        href={`/berita/${related.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-4">
                          {related.gambarUtama && (
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image
                                src={related.gambarUtama}
                                alt={related.judul}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {related.judul}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {related.publishedAt
                                  ? format(
                                      new Date(related.publishedAt),
                                      "dd MMM yyyy",
                                      { locale: idLocale }
                                    )
                                  : format(
                                      new Date(related.createdAt),
                                      "dd MMM yyyy",
                                      { locale: idLocale }
                                    )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Jelajahi Lebih Banyak
                </h3>
                <p className="text-white/90 mb-6">
                  Temukan berita dan artikel menarik lainnya tentang Pangandaran
                </p>
                <button
                  onClick={() => router.push("/berita")}
                  className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Lihat Semua Berita
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
