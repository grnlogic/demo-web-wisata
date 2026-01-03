"use client";

import { Info, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface SettingsData {
  site_about: string;
  site_email: string;
  site_phone: string;
  social_facebook: string;
  social_instagram: string;
  social_twitter: string;
  social_youtube: string;
}

export default function AdminInformasiPage() {
  const [formData, setFormData] = useState<SettingsData>({
    site_about: "",
    site_email: "",
    site_phone: "",
    social_facebook: "",
    social_instagram: "",
    social_twitter: "",
    social_youtube: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");

      const data = await response.json();
      setFormData({
        site_about: data.site_about || "",
        site_email: data.site_email || "",
        site_phone: data.site_phone || "",
        social_facebook: data.social_facebook || "",
        social_instagram: data.social_instagram || "",
        social_twitter: data.social_twitter || "",
        social_youtube: data.social_youtube || "",
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
      setMessage({
        type: "error",
        text: "Gagal memuat data. Silakan refresh halaman.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      setMessage({
        type: "success",
        text: "Perubahan berhasil disimpan!",
      });

      // Auto-hide success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage({
        type: "error",
        text: "Gagal menyimpan perubahan. Silakan coba lagi.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Informasi Umum</h1>
          <p className="text-slate-600 mt-1">
            Kelola informasi umum tentang Pangandaran
          </p>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Tentang Pangandaran
            </h3>
            <textarea
              name="site_about"
              value={formData.site_about}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Deskripsi tentang Pangandaran..."
              required
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Kontak Informasi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="site_email"
                  value={formData.site_email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="info@wisatapangandaran.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Telepon
                </label>
                <input
                  type="tel"
                  name="site_phone"
                  value={formData.site_phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+62 xxx xxxx xxxx"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Media Sosial
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  name="social_facebook"
                  value={formData.social_facebook}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  name="social_instagram"
                  value={formData.social_instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  name="social_twitter"
                  value={formData.social_twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  YouTube
                </label>
                <input
                  type="url"
                  name="social_youtube"
                  value={formData.social_youtube}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Informasi</h4>
            <p className="text-sm text-blue-800">
              Informasi yang Anda masukkan akan ditampilkan di halaman "Tentang"
              dan footer website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
