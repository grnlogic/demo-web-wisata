"use client";

import { useEffect, useMemo, useState } from "react";
import { Star, LogIn, Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

interface ReviewItem {
  id: string;
  userId: string;
  userName: string | null;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsResponse {
  reviews: ReviewItem[];
  averageRating: number;
  totalReview: number;
}

interface Props {
  slug: string;
}

export default function DestinasiReviews({ slug }: Props) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [reviewsData, setReviewsData] = useState<ReviewsResponse | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/destinasi/${slug}/reviews`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Gagal memuat review");
      }
      setReviewsData(json.data);
    } catch (err: any) {
      setError(err.message || "Gagal memuat review");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const userReview = useMemo(() => {
    if (!reviewsData || !session?.user?.id) return null;
    return (
      reviewsData.reviews.find((r) => r.userId === session.user.id) || null
    );
  }, [reviewsData, session?.user?.id]);

  const isUserRole = session?.user?.role === "USER";

  useEffect(() => {
    if (userReview) {
      setRating(userReview.rating);
      setComment(userReview.comment);
    } else {
      setRating(5);
      setComment("");
    }
  }, [userReview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      signIn();
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/destinasi/${slug}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, comment }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Gagal menyimpan review");
      }

      setSuccess("Review tersimpan");
      setReviewsData((prev) => {
        const mergedReviews = [
          ...(prev?.reviews || []).filter((r) => r.userId !== session.user?.id),
          json.data.review,
        ].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return {
          reviews: mergedReviews,
          averageRating: json.data.averageRating,
          totalReview: json.data.totalReview,
        };
      });
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan review");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (value: number, size: "sm" | "lg" = "lg") => {
    const classes = size === "lg" ? "h-6 w-6" : "h-4 w-4";
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${classes} ${
              i <= value ? "fill-amber-400 text-amber-400" : "text-slate-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Ulasan & Rating</h2>
          <p className="text-slate-500 text-sm">
            Beri komentar dan nilai destinasi ini. Login diperlukan.
          </p>
        </div>
        {reviewsData && (
          <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-xl">
            {renderStars(Math.round(reviewsData.averageRating || 0), "sm")}
            <div>
              <div className="text-2xl font-bold text-slate-800 leading-none">
                {reviewsData.averageRating?.toFixed(1) || "0.0"}
              </div>
              <p className="text-xs text-slate-500">
                {reviewsData.totalReview} ulasan
              </p>
            </div>
          </div>
        )}
      </div>

      {status === "loading" && (
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Mengecek sesi...
        </div>
      )}

      {!session && status === "unauthenticated" && (
        <div className="border border-dashed border-slate-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800">
              Login untuk berkomentar
            </p>
            <p className="text-sm text-slate-500">
              Komentar dan rating hanya untuk pengguna terdaftar.
            </p>
          </div>
          <button
            onClick={() => signIn()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            <LogIn className="h-4 w-4" /> Masuk
          </button>
        </div>
      )}

      {session && !isUserRole && (
        <div className="border border-dashed border-amber-200 bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
          Akun admin tidak dapat mengirim review. Gunakan akun pengguna biasa
          untuk memberi rating dan komentar.
        </div>
      )}

      {session && isUserRole && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-700">Rating Anda:</span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setRating(value)}
                  className={`rounded-full p-2 transition border ${
                    rating >= value
                      ? "bg-amber-100 border-amber-300"
                      : "border-slate-200 hover:border-amber-200"
                  }`}
                  aria-label={`Pilih rating ${value}`}
                >
                  <Star
                    className={`h-5 w-5 ${
                      rating >= value
                        ? "fill-amber-400 text-amber-500"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Komentar
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Bagikan pengalaman atau tips untuk pengunjung lain"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
              rows={4}
              required
              minLength={3}
              maxLength={1000}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          {success && (
            <div className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
              {success}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Simpan Review
            </button>
            {userReview && (
              <span className="text-xs text-slate-500">
                Anda sudah memberi review, kiriman ini akan memperbarui
                penilaian sebelumnya.
              </span>
            )}
          </div>
        </form>
      )}

      <div className="border-t border-slate-100 pt-4 space-y-4">
        {loading ? (
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Memuat ulasan...
          </div>
        ) : !reviewsData || reviewsData.totalReview === 0 ? (
          <p className="text-sm text-slate-500">
            Belum ada ulasan. Jadilah yang pertama!
          </p>
        ) : (
          reviewsData.reviews.map((review) => (
            <div
              key={review.id}
              className="border border-slate-100 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-slate-800">
                  {review.userName || "Pengguna"}
                </div>
                {renderStars(review.rating, "sm")}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {review.comment}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                {new Date(review.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
