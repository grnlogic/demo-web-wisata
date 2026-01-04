import { HelpCircle, MessageCircle, Phone, MapPin, Shield } from "lucide-react";

const faqs = [
  {
    question: "Kapan waktu terbaik ke Pangandaran?",
    answer:
      "April–Oktober untuk cuaca cerah. Musim hujan (Nov–Mar) cocok bagi yang suka alam lebih hijau, tapi cek prakiraan cuaca dulu.",
  },
  {
    question: "Apakah aman untuk keluarga?",
    answer:
      "Pantai timur relatif lebih tenang untuk anak, tetap awasi dan ikuti tanda penjaga pantai. Sediakan pelampung untuk aktivitas laut.",
  },
  {
    question: "Bagaimana konektivitas internet?",
    answer:
      "Sinyal seluler 4G tersedia di pusat pantai. Beberapa area cagar alam lebih terbatas, unduh peta offline sebelum berangkat.",
  },
  {
    question: "Apakah perlu uang tunai?",
    answer:
      "Bawa kombinasi tunai dan non-tunai. UMKM dan warung kecil seringkali hanya menerima tunai, ATM tersedia di pusat kota.",
  },
  {
    question: "Apakah ada dress code di tempat ibadah?",
    answer:
      "Gunakan pakaian sopan ketika memasuki tempat ibadah atau upacara adat. Siapkan kain tambahan jika perlu menutup bahu dan lutut.",
  },
];

const quickGuides = [
  {
    icon: MapPin,
    title: "Peta ringkas",
    body: "Pantai Barat untuk sunset, Pantai Timur untuk sunrise & pasar ikan, Cagar Alam Pananjung untuk trekking ringan.",
  },
  {
    icon: Shield,
    title: "Keamanan",
    body: "Ikuti rambu pantai, hindari berenang saat ombak tinggi, dan gunakan pemandu lokal untuk cave tubing atau arung jeram.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0 opacity-70 blur-3xl" aria-hidden>
          <div className="absolute -top-20 -left-10 h-64 w-64 rounded-full bg-cyan-200/50" />
          <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-blue-200/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm ring-1 ring-slate-200 px-3 py-1 text-sm text-slate-600">
            <HelpCircle className="h-4 w-4" />
            Tanya cepat sebelum berangkat
          </div>
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              FAQ: jawab rasa penasaranmu
            </h1>
            <p className="text-lg text-slate-600">
              Rangkuman pertanyaan yang paling sering muncul dari wisatawan.
              Praktis, singkat, dan langsung ke intinya.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
              Kebijakan lokal
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
              Kesiapan cuaca
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
              Perlengkapan wajib
            </span>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  {item.question}
                </h3>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-700/70">
                Bantuan cepat
              </p>
              <h3 className="text-xl font-semibold text-slate-900 mt-2">
                Butuh jawaban lain?
              </h3>
              <p className="text-slate-600 mt-2">
                Tim support siap dihubungi. Sertakan detail rencana perjalanan
                agar kami bisa memberi saran lebih tepat.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-blue-700 font-semibold">
                  <MessageCircle className="h-4 w-4" /> Live chat kanan bawah
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="h-4 w-4" /> +62 265 639 xxx
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-700/70">
                Panduan ringkas
              </p>
              <div className="space-y-3">
                {quickGuides.map((guide) => (
                  <div
                    key={guide.title}
                    className="flex gap-3 rounded-xl bg-slate-50 p-4"
                  >
                    <div className="mt-1 rounded-full bg-blue-100 p-2 text-blue-700">
                      <guide.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {guide.title}
                      </p>
                      <p className="text-sm text-slate-600">{guide.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
