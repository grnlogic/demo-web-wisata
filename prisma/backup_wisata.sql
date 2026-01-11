--
-- PostgreSQL database dump
--

\restrict oiPV9Xe8OBEmv1kka3CaWCESUcNUeRdCpk2HHP0tYLNBp2r2IVdhEt9hNXMjKt1

-- Dumped from database version 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: OtpType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."OtpType" AS ENUM (
    'LOGIN',
    'REGISTER'
);


ALTER TYPE public."OtpType" OWNER TO postgres;

--
-- Name: jenis_detail; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.jenis_detail AS ENUM (
    'FASILITAS',
    'AKTIVITAS',
    'TIPS',
    'ATURAN',
    'AKSES',
    'LAINNYA'
);


ALTER TYPE public.jenis_detail OWNER TO postgres;

--
-- Name: kategori_destinasi; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.kategori_destinasi AS ENUM (
    'PANTAI',
    'CAGAR_ALAM',
    'GOA',
    'WISATA_BUDAYA',
    'WISATA_BAHARI',
    'WAHANA_AIR',
    'KAMPUNG_TURIS',
    'LAINNYA'
);


ALTER TYPE public.kategori_destinasi OWNER TO postgres;

--
-- Name: kategori_galeri; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.kategori_galeri AS ENUM (
    'PANTAI',
    'KULINER',
    'BUDAYA',
    'WAHANA',
    'EVENT',
    'SUNSET',
    'SUNRISE',
    'UNDERWATER',
    'LAINNYA'
);


ALTER TYPE public.kategori_galeri OWNER TO postgres;

--
-- Name: kategori_info; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.kategori_info AS ENUM (
    'SEJARAH',
    'GEOGRAFI',
    'TRANSPORTASI',
    'AKOMODASI',
    'TIPS_WISATA',
    'KONTAK_PENTING',
    'FAQ',
    'LAINNYA'
);


ALTER TYPE public.kategori_info OWNER TO postgres;

--
-- Name: status_publish; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_publish AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
);


ALTER TYPE public.status_publish OWNER TO postgres;

--
-- Name: tipe_media; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipe_media AS ENUM (
    'IMAGE',
    'VIDEO'
);


ALTER TYPE public.tipe_media OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    nama text NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: berita; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.berita (
    id text NOT NULL,
    judul text NOT NULL,
    slug text NOT NULL,
    konten text NOT NULL,
    ringkasan text,
    kategori text NOT NULL,
    "gambarUtama" text,
    tags text[] DEFAULT ARRAY[]::text[],
    "sourceUrl" text,
    "sourceImage" text,
    "isExternal" boolean DEFAULT false NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    status public.status_publish DEFAULT 'DRAFT'::public.status_publish NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    "publishedAt" timestamp(3) without time zone,
    "expiresAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text NOT NULL
);


ALTER TABLE public.berita OWNER TO postgres;

--
-- Name: destinasi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.destinasi (
    id text NOT NULL,
    nama text NOT NULL,
    slug text NOT NULL,
    deskripsi text NOT NULL,
    kategori public.kategori_destinasi NOT NULL,
    lokasi text NOT NULL,
    alamat text NOT NULL,
    koordinat text,
    "googleMapsUrl" text,
    rating double precision DEFAULT 0,
    "jumlahReview" integer DEFAULT 0,
    "metaTitle" text,
    "metaDescription" text,
    status public.status_publish DEFAULT 'DRAFT'::public.status_publish NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    urutan integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text NOT NULL
);


ALTER TABLE public.destinasi OWNER TO postgres;

--
-- Name: destinasi_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.destinasi_detail (
    id text NOT NULL,
    "destinasiId" text NOT NULL,
    jenis public.jenis_detail NOT NULL,
    judul text NOT NULL,
    konten text NOT NULL,
    urutan integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.destinasi_detail OWNER TO postgres;

--
-- Name: destinasi_harga; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.destinasi_harga (
    id text NOT NULL,
    "destinasiId" text NOT NULL,
    "jenisHarga" text NOT NULL,
    harga integer NOT NULL,
    keterangan text,
    urutan integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.destinasi_harga OWNER TO postgres;

--
-- Name: destinasi_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.destinasi_images (
    id text NOT NULL,
    "destinasiId" text NOT NULL,
    url text NOT NULL,
    caption text,
    "isPrimary" boolean DEFAULT false NOT NULL,
    urutan integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.destinasi_images OWNER TO postgres;

--
-- Name: destinasi_reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.destinasi_reviews (
    id text NOT NULL,
    "destinasiId" text NOT NULL,
    "userId" text NOT NULL,
    "userName" text,
    rating integer NOT NULL,
    comment text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.destinasi_reviews OWNER TO postgres;

--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id text NOT NULL,
    nama text NOT NULL,
    slug text NOT NULL,
    deskripsi text NOT NULL,
    lokasi text NOT NULL,
    alamat text NOT NULL,
    koordinat text,
    "googleMapsUrl" text,
    "tanggalMulai" timestamp(3) without time zone NOT NULL,
    "tanggalSelesai" timestamp(3) without time zone NOT NULL,
    "jamMulai" text,
    "jamSelesai" text,
    gambar text,
    thumbnail text,
    "kontakPerson" text,
    "nomorTelepon" text,
    "hargaTiket" text,
    status public.status_publish DEFAULT 'DRAFT'::public.status_publish NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: galeri; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.galeri (
    id text NOT NULL,
    judul text NOT NULL,
    deskripsi text,
    url text NOT NULL,
    thumbnail text,
    kategori public.kategori_galeri NOT NULL,
    tags text[] DEFAULT ARRAY[]::text[],
    "tipeMedia" public.tipe_media DEFAULT 'IMAGE'::public.tipe_media NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    urutan integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "uploadedBy" text NOT NULL
);


ALTER TABLE public.galeri OWNER TO postgres;

--
-- Name: hotel_listings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotel_listings (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    link text,
    thumbnail text,
    source text,
    location text,
    price text,
    rating double precision,
    reviews integer,
    "propertyToken" text,
    "checkInDate" text,
    "checkOutDate" text,
    "fetchedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.hotel_listings OWNER TO postgres;

--
-- Name: informasi_umum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.informasi_umum (
    id text NOT NULL,
    kategori public.kategori_info NOT NULL,
    judul text NOT NULL,
    slug text NOT NULL,
    konten text NOT NULL,
    icon text,
    gambar text,
    urutan integer DEFAULT 0 NOT NULL,
    status public.status_publish DEFAULT 'PUBLISHED'::public.status_publish NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text NOT NULL
);


ALTER TABLE public.informasi_umum OWNER TO postgres;

--
-- Name: kuliner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kuliner (
    id text NOT NULL,
    nama text NOT NULL,
    slug text NOT NULL,
    deskripsi text NOT NULL,
    kategori text NOT NULL,
    lokasi text NOT NULL,
    alamat text NOT NULL,
    koordinat text,
    "googleMapsUrl" text,
    "hargaMin" integer,
    "hargaMax" integer,
    "nomorTelepon" text,
    "jamBuka" text,
    gambar text[] DEFAULT ARRAY[]::text[],
    rating double precision DEFAULT 0,
    status public.status_publish DEFAULT 'DRAFT'::public.status_publish NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.kuliner OWNER TO postgres;

--
-- Name: otp_verifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otp_verifications (
    id text NOT NULL,
    email text NOT NULL,
    code text NOT NULL,
    type public."OtpType" NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text
);


ALTER TABLE public.otp_verifications OWNER TO postgres;

--
-- Name: profil_ukm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profil_ukm (
    id text NOT NULL,
    "namaUsaha" text NOT NULL,
    slug text NOT NULL,
    deskripsi text NOT NULL,
    kategori text NOT NULL,
    pemilik text NOT NULL,
    lokasi text NOT NULL,
    alamat text NOT NULL,
    koordinat text,
    "nomorTelepon" text,
    email text,
    instagram text,
    facebook text,
    whatsapp text,
    website text,
    logo text,
    gambar text[] DEFAULT ARRAY[]::text[],
    "produkLayanan" text[] DEFAULT ARRAY[]::text[],
    "hargaRata" text,
    "jamOperasional" text,
    status public.status_publish DEFAULT 'DRAFT'::public.status_publish NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" text NOT NULL
);


ALTER TABLE public.profil_ukm OWNER TO postgres;

--
-- Name: rekomendasi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rekomendasi (
    id text NOT NULL,
    judul text NOT NULL,
    slug text NOT NULL,
    deskripsi text NOT NULL,
    tema text NOT NULL,
    durasi text,
    "estimasiBudget" text,
    "destinasiIds" text[] DEFAULT ARRAY[]::text[],
    "gambarUtama" text,
    status public.status_publish DEFAULT 'DRAFT'::public.status_publish NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    urutan integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.rekomendasi OWNER TO postgres;

--
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings (
    id text NOT NULL,
    key text NOT NULL,
    value text NOT NULL,
    description text,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.settings OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    password text,
    "googleId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, username, password, nama, email, "createdAt", "updatedAt") FROM stdin;
cmjzrwwip000032kykh70aw25	admin	$2b$10$LOk4w6Qjiq5M4dIyluS7Qu6xC2kZFSXBf87g.u1P5SFsBzVwFexqq	Administrator	admin@wisatapangandaran.com	2026-01-04 13:34:35.426	2026-01-04 13:34:35.426
\.


--
-- Data for Name: berita; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.berita (id, judul, slug, konten, ringkasan, kategori, "gambarUtama", tags, "sourceUrl", "sourceImage", "isExternal", views, status, featured, "publishedAt", "expiresAt", "createdAt", "updatedAt", "createdBy") FROM stdin;
cmjzu8f650012sds802o5srao	4 Hari Pencarian, Atlet Terjun Payung yang Jatuh di Perairan Pangandaran Ditemukan Meninggal	4-hari-pencarian-atlet-terjun-payung-yang-jatuh-di-perairan-pangandaran-ditemukan-meninggal	Seorang atlet terjun payung yang hilang di perairan Pangandaran, Jawa Barat, akhirnya ditemukan meninggal dunia oleh nelayan asal Cilacap...\n\nBaca selengkapnya: https://www.kompas.tv/nasional/641434/4-hari-pencarian-atlet-terjun-payung-yang-jatuh-di-perairan-pangandaran-ditemukan-meninggal	Seorang atlet terjun payung yang hilang di perairan Pangandaran, Jawa Barat, akhirnya ditemukan meninggal dunia oleh nelayan asal Cilacap...	Wisata	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c82479bf5208a807c6737fbace53deed5474857b5c3530a0591326.jpeg	{}	https://www.kompas.tv/nasional/641434/4-hari-pencarian-atlet-terjun-payung-yang-jatuh-di-perairan-pangandaran-ditemukan-meninggal	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c82479bf5208a807c6737fbace53deed5474857b5c3530a0591326.jpeg	t	5	PUBLISHED	f	2026-01-04 14:39:32.045	2026-01-09 14:39:32.045	2026-01-04 14:39:32.046	2026-01-11 01:55:25.71	cmjzrwwip000032kykh70aw25
cmjzu8f5s000usds8b552po0i	2 Penerjun Payung Tewas di Perairan Pangandaran Saat Latihan - kumparan.com	2-penerjun-payung-tewas-di-perairan-pangandaran-saat-latihan-kumparancom	Dua orang meninggal dunia dalam kecelakaan terjun payung di Perairan Laut Bojongsalawe, Desa Karangjaladri, Kecamatan Parigi,...\n\nBaca selengkapnya: https://kumparan.com/kumparannews/2-penerjun-payung-tewas-di-perairan-pangandaran-saat-latihan-26YSp7WBixM	Dua orang meninggal dunia dalam kecelakaan terjun payung di Perairan Laut Bojongsalawe, Desa Karangjaladri, Kecamatan Parigi,...	Wisata	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c82479ebc6b8c8162844ff52b5088213cbf6d1a2b3178a283daf35.jpeg	{}	https://kumparan.com/kumparannews/2-penerjun-payung-tewas-di-perairan-pangandaran-saat-latihan-26YSp7WBixM	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c82479ebc6b8c8162844ff52b5088213cbf6d1a2b3178a283daf35.jpeg	t	2	PUBLISHED	f	2026-01-04 14:39:32.031	2026-01-09 14:39:32.031	2026-01-04 14:39:32.032	2026-01-09 00:27:20.655	cmjzrwwip000032kykh70aw25
cmjzu8f5o000ssds8762ib86k	Kronologi Meninggalnya Atlet Terjun Payung Widiasih di Pangandaran	kronologi-meninggalnya-atlet-terjun-payung-widiasih-di-pangandaran	Atlet terjun payung Widiasih (58) ditemukan meninggal dunia di Perairan Pangandaran setelah dilaporkan jatuh saat mengikuti kejuaraan.\n\nBaca selengkapnya: https://regional.kompas.com/read/2026/01/02/161336278/kronologi-meninggalnya-atlet-terjun-payung-widiasih-di-pangandaran	Atlet terjun payung Widiasih (58) ditemukan meninggal dunia di Perairan Pangandaran setelah dilaporkan jatuh saat mengikuti kejuaraan.	Wisata	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c82479994a83771fe7663b79ab3f65dfe127cbbd863d186fd6c076.jpeg	{}	https://regional.kompas.com/read/2026/01/02/161336278/kronologi-meninggalnya-atlet-terjun-payung-widiasih-di-pangandaran	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c82479994a83771fe7663b79ab3f65dfe127cbbd863d186fd6c076.jpeg	t	3	PUBLISHED	f	2026-01-04 14:39:32.027	2026-01-09 14:39:32.027	2026-01-04 14:39:32.028	2026-01-09 23:04:52.496	cmjzrwwip000032kykh70aw25
cmjzu8f5z000ysds8wk5e25gw	Kronologi meninggalnya atlet terjun payung Widiasih di Pangandaran, ditemukan usai 4 hari pencarian	kronologi-meninggalnya-atlet-terjun-payung-widiasih-di-pangandaran-ditemukan-usai-4-hari-pencarian	Beginilah kronologi meninggalnya atlet terjun payung Widiasih di Pangandaran, Jawa Barat. Ditemukan 4 hari kemudian.\n\nBaca selengkapnya: https://www.msn.com/id-id/berita/other/kronologi-meninggalnya-atlet-terjun-payung-widiasih-di-pangandaran-ditemukan-usai-4-hari-pencarian/ar-AA1TuEHY	Beginilah kronologi meninggalnya atlet terjun payung Widiasih di Pangandaran, Jawa Barat. Ditemukan 4 hari kemudian.	Wisata	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c82479305d444d35085bbb0ad2b28fa6a2b2e6f1ba0d427103fd24.jpeg	{}	https://www.msn.com/id-id/berita/other/kronologi-meninggalnya-atlet-terjun-payung-widiasih-di-pangandaran-ditemukan-usai-4-hari-pencarian/ar-AA1TuEHY	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c82479305d444d35085bbb0ad2b28fa6a2b2e6f1ba0d427103fd24.jpeg	t	5	PUBLISHED	f	2026-01-04 14:39:32.039	2026-01-09 14:39:32.039	2026-01-04 14:39:32.039	2026-01-09 23:12:05.918	cmjzrwwip000032kykh70aw25
cmjzu8f5v000wsds85apkvutq	Puluhan Anak Terpisah dari Orang Tua di Pangandaran Selama Libur Tahun Baru, Kebanyakan dari Bandung	puluhan-anak-terpisah-dari-orang-tua-di-pangandaran-selama-libur-tahun-baru-kebanyakan-dari-bandung	Orang tua dan anak kerap sama-sama asyik beraktivitas di bibir pantai Pangandaran dan akhirnya kehilangan fokus satu sama lain.\n\nBaca selengkapnya: https://jabar.tribunnews.com/jabar-region/1160566/puluhan-anak-terpisah-dari-orang-tua-di-pangandaran-selama-libur-tahun-baru-kebanyakan-dari-bandung	Orang tua dan anak kerap sama-sama asyik beraktivitas di bibir pantai Pangandaran dan akhirnya kehilangan fokus satu sama lain.	Wisata	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c824791203971a756bdd17f18957686bc5a5270852b97c3b5a885b.jpeg	{}	https://jabar.tribunnews.com/jabar-region/1160566/puluhan-anak-terpisah-dari-orang-tua-di-pangandaran-selama-libur-tahun-baru-kebanyakan-dari-bandung	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c824791203971a756bdd17f18957686bc5a5270852b97c3b5a885b.jpeg	t	2	PUBLISHED	f	2026-01-04 14:39:32.035	2026-01-09 14:39:32.035	2026-01-04 14:39:32.036	2026-01-09 23:12:22.059	cmjzrwwip000032kykh70aw25
cmjzu8f5j000qsds88resmrm1	Libur Tahun Baru, Pantai Pangandaran Dipadati Ratusan Ribu Wisatawan	libur-tahun-baru-pantai-pangandaran-dipadati-ratusan-ribu-wisatawan	Objek wisata Pantai Pangandaran, Jawa Barat, dipadati ribuan wisatawan pada penghujung libur Tahun Baru.\n\nBaca selengkapnya: https://www.metrotvnews.com/play/NgxCa5eA-libur-tahun-baru-pantai-pangandaran-dipadati-ratusan-ribu-wisatawan	Objek wisata Pantai Pangandaran, Jawa Barat, dipadati ribuan wisatawan pada penghujung libur Tahun Baru.	Wisata	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c824790b5134735b33d63ed4ab01257a952c5da811d3fa839e0133.jpeg	{}	https://www.metrotvnews.com/play/NgxCa5eA-libur-tahun-baru-pantai-pangandaran-dipadati-ratusan-ribu-wisatawan	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c824790b5134735b33d63ed4ab01257a952c5da811d3fa839e0133.jpeg	t	2	PUBLISHED	f	2026-01-04 14:39:32.023	2026-01-09 14:39:32.023	2026-01-04 14:39:32.023	2026-01-09 22:47:19.533	cmjzrwwip000032kykh70aw25
cmjzu8f6b0016sds8xfu6c1gx	Ratusan Ribu Wisatawan Padati Pantai Pangandaran Selama Libur Akhir Tahun	ratusan-ribu-wisatawan-padati-pantai-pangandaran-selama-libur-akhir-tahun	Selama libur Natal dan tahun barau, kunjungan wisatawan terus mengalir dan memadati kawasan Pantai Barat Pangandaran.\n\nBaca selengkapnya: https://www.pikiran-rakyat.com/news/pr-019908911/ratusan-ribu-wisatawan-padati-pantai-pangandaran-selama-libur-akhir-tahun	Selama libur Natal dan tahun barau, kunjungan wisatawan terus mengalir dan memadati kawasan Pantai Barat Pangandaran.	Wisata	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c82479cbbcef846882eae55e4e7ca4dbbfb1e17d920a6ef3bb5318.jpeg	{}	https://www.pikiran-rakyat.com/news/pr-019908911/ratusan-ribu-wisatawan-padati-pantai-pangandaran-selama-libur-akhir-tahun	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c82479cbbcef846882eae55e4e7ca4dbbfb1e17d920a6ef3bb5318.jpeg	t	5	PUBLISHED	f	2026-01-04 14:39:32.051	2026-01-09 14:39:32.051	2026-01-04 14:39:32.052	2026-01-08 21:58:43.042	cmjzrwwip000032kykh70aw25
cmjzu8f620010sds8kv3kijdk	Jenazah Atlet Terjun Payung Ditemukan di Laut Pangandaran	jenazah-atlet-terjun-payung-ditemukan-di-laut-pangandaran	JENAZAH Widiasih, atlet korban kecelakaan terjun payung yang dilaporkan jatuh di perairan Teluk Pangelek, Pangandaran, ditemukan pada Jumat...\n\nBaca selengkapnya: https://metro.tempo.co/read/2077782/jenazah-atlet-terjun-payung-ditemukan-di-laut-pangandaran	JENAZAH Widiasih, atlet korban kecelakaan terjun payung yang dilaporkan jatuh di perairan Teluk Pangelek, Pangandaran, ditemukan pada Jumat...	Wisata	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c824797a01043a266e3da7e60d85f8d045101e301c1a35cf7b2d88.jpeg	{}	https://metro.tempo.co/read/2077782/jenazah-atlet-terjun-payung-ditemukan-di-laut-pangandaran	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c824797a01043a266e3da7e60d85f8d045101e301c1a35cf7b2d88.jpeg	t	3	PUBLISHED	f	2026-01-04 14:39:32.042	2026-01-09 14:39:32.042	2026-01-04 14:39:32.043	2026-01-05 06:16:21.889	cmjzrwwip000032kykh70aw25
cmk54tg5g0003d0k4pybpmpr5	Pesona Jembatan Sodongkopo, Ikon Daya Tarik Baru di Pangandaran	pesona-jembatan-sodongkopo-ikon-daya-tarik-baru-di-pangandaran	PANGANDARAN - Pemerintah Provinsi Jawa Barat baru saja menyelesaikan proses pembangunan Jembatan Sodongkopo di Kabupaten Pangandaran.\n\nBaca selengkapnya: https://disparbud.jabarprov.go.id/postingan/pesona-jembatan-sodongkopo-ikon-daya-tarik-baru-di-pangandaran-695dd76c55fccffd51399d98	PANGANDARAN - Pemerintah Provinsi Jawa Barat baru saja menyelesaikan proses pembangunan Jembatan Sodongkopo di Kabupaten Pangandaran.	Wisata	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c82479994a83771fe7663b79ab3f65dfe127cbbd863d186fd6c076.jpeg	{}	https://disparbud.jabarprov.go.id/postingan/pesona-jembatan-sodongkopo-ikon-daya-tarik-baru-di-pangandaran-695dd76c55fccffd51399d98	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c82479994a83771fe7663b79ab3f65dfe127cbbd863d186fd6c076.jpeg	t	2	PUBLISHED	f	2026-01-08 07:34:40.131	2026-01-13 07:34:40.131	2026-01-08 07:34:40.132	2026-01-09 03:04:43.636	cmjzrwwip000032kykh70aw25
cmk54tg5v0009d0k4pggwzo5v	Dinsos Pangandaran Selamatkan Puluhan Orang Telantar Sepanjang 2025, Terjauh dari Lamongan	dinsos-pangandaran-selamatkan-puluhan-orang-telantar-sepanjang-2025-terjauh-dari-lamongan	Dinas Sosial, Pemberdayaan Masyarakat, dan Desa Kabupaten Pangandaran tangani puluhan kasus orang telantar dan ODGJ.\n\nBaca selengkapnya: https://www.pikiran-rakyat.com/news/pr-019915749/dinsos-pangandaran-selamatkan-puluhan-orang-telantar-sepanjang-2025-terjauh-dari-lamongan	Dinas Sosial, Pemberdayaan Masyarakat, dan Desa Kabupaten Pangandaran tangani puluhan kasus orang telantar dan ODGJ.	Wisata	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c82479305d444d35085bbb0ad2b28fa6a2b2e6f1ba0d427103fd24.jpeg	{}	https://www.pikiran-rakyat.com/news/pr-019915749/dinsos-pangandaran-selamatkan-puluhan-orang-telantar-sepanjang-2025-terjauh-dari-lamongan	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c82479305d444d35085bbb0ad2b28fa6a2b2e6f1ba0d427103fd24.jpeg	t	0	PUBLISHED	f	2026-01-08 07:34:40.146	2026-01-13 07:34:40.146	2026-01-08 07:34:40.147	2026-01-08 07:34:40.147	cmjzrwwip000032kykh70aw25
cmjzu8f680014sds80hgculo0	Mau Liburan ke Pangandaran? Cek Harga Tiket Masuk Pantai dan Objek Wisatanya	mau-liburan-ke-pangandaran-cek-harga-tiket-masuk-pantai-dan-objek-wisatanya	Daftar harga tiket destinasi wisata Pangandaran mulai dari Pantai hingga objek wisata lainnya yang cocok jadi tempat liburan tahun baru.\n\nBaca selengkapnya: https://www.metrotvnews.com/read/N0BC17zn-mau-liburan-ke-pangandaran-cek-harga-tiket-masuk-pantai-dan-objek-wisatanya	Daftar harga tiket destinasi wisata Pangandaran mulai dari Pantai hingga objek wisata lainnya yang cocok jadi tempat liburan tahun baru.	Wisata	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c82479e528fee1776baff0579d00d9db0f4d79cc66b344a69f0666.jpeg	{}	https://www.metrotvnews.com/read/N0BC17zn-mau-liburan-ke-pangandaran-cek-harga-tiket-masuk-pantai-dan-objek-wisatanya	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c82479e528fee1776baff0579d00d9db0f4d79cc66b344a69f0666.jpeg	t	4	PUBLISHED	f	2026-01-04 14:39:32.048	2026-01-09 14:39:32.048	2026-01-04 14:39:32.049	2026-01-09 05:41:29.641	cmjzrwwip000032kykh70aw25
cmk54tg60000bd0k446ba0fbm	Demi Lihat Laut, Remaja Tasikmalaya Nekat Jalan Kaki 69 KM ke Pangandaran Seorang Diri	demi-lihat-laut-remaja-tasikmalaya-nekat-jalan-kaki-69-km-ke-pangandaran-seorang-diri	Download aplikasi berita TribunX di Play Store atau App Store untuk dapatkan pengalaman baru TRIBUN-VIDEO.COM - Keinginan…\n\nBaca selengkapnya: https://video.tribunnews.com/news/901967/demi-lihat-laut-remaja-tasikmalaya-nekat-jalan-kaki-69-km-ke-pangandaran-seorang-diri	Download aplikasi berita TribunX di Play Store atau App Store untuk dapatkan pengalaman baru TRIBUN-VIDEO.COM - Keinginan…	Wisata	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c824797a01043a266e3da7e60d85f8d045101e301c1a35cf7b2d88.jpeg	{}	https://video.tribunnews.com/news/901967/demi-lihat-laut-remaja-tasikmalaya-nekat-jalan-kaki-69-km-ke-pangandaran-seorang-diri	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c824797a01043a266e3da7e60d85f8d045101e301c1a35cf7b2d88.jpeg	t	3	PUBLISHED	f	2026-01-08 07:34:40.151	2026-01-13 07:34:40.151	2026-01-08 07:34:40.152	2026-01-09 19:06:59.074	cmjzrwwip000032kykh70aw25
cmk54tg4y0001d0k4kytgiu8m	PT MUJ Resmikan Pembangunan Tiga Masjid di Pangandaran	pt-muj-resmikan-pembangunan-tiga-masjid-di-pangandaran	REPUBLIKA.CO.ID, PANGANDARAN-- Badan Usaha Milik Daerah (BUMD) milik Pemerintah Provinsi Jawa Barat (Pemprov Jabar) PT Migas Utama Jabar...\n\nBaca selengkapnya: https://rejabar.republika.co.id/berita/t8hv26472/pt-muj-resmikan-pembangunan-tiga-masjid-di-pangandaran	REPUBLIKA.CO.ID, PANGANDARAN-- Badan Usaha Milik Daerah (BUMD) milik Pemerintah Provinsi Jawa Barat (Pemprov Jabar) PT Migas Utama Jabar...	Wisata	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c824790b5134735b33d63ed4ab01257a952c5da811d3fa839e0133.jpeg	{}	https://rejabar.republika.co.id/berita/t8hv26472/pt-muj-resmikan-pembangunan-tiga-masjid-di-pangandaran	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c824790b5134735b33d63ed4ab01257a952c5da811d3fa839e0133.jpeg	t	1	PUBLISHED	f	2026-01-08 07:34:40.111	2026-01-13 07:34:40.111	2026-01-08 07:34:40.112	2026-01-09 22:04:30.494	cmjzrwwip000032kykh70aw25
cmk54tg5p0007d0k44cmeolny	Bapenda Pangandaran Ungkap Kebocoran Retribusi Akibat Jalur Tikus ke Objek Wisata	bapenda-pangandaran-ungkap-kebocoran-retribusi-akibat-jalur-tikus-ke-objek-wisata	PANGANDARAN – Badan Pendapatan Daerah Kabupaten Pangandaran (Bapenda Pangandaran) menemukan adanya sejumlah jalur tidak resmi atau yang...\n\nBaca selengkapnya: https://timesindonesia.co.id/peristiwa-daerah/572273/bapenda-pangandaran-ungkap-kebocoran-retribusi-akibat-jalur-tikus-ke-objek-wisata	PANGANDARAN – Badan Pendapatan Daerah Kabupaten Pangandaran (Bapenda Pangandaran) menemukan adanya sejumlah jalur tidak resmi atau yang...	Wisata	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c824791203971a756bdd17f18957686bc5a5270852b97c3b5a885b.jpeg	{}	https://timesindonesia.co.id/peristiwa-daerah/572273/bapenda-pangandaran-ungkap-kebocoran-retribusi-akibat-jalur-tikus-ke-objek-wisata	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c824791203971a756bdd17f18957686bc5a5270852b97c3b5a885b.jpeg	t	1	PUBLISHED	f	2026-01-08 07:34:40.14	2026-01-13 07:34:40.14	2026-01-08 07:34:40.141	2026-01-09 22:43:31.112	cmjzrwwip000032kykh70aw25
cmjzu8f6g0018sds8v75akt20	Atlet Terjun Payung Jatuh di Laut Pangandaran Ditemukan Tewas	atlet-terjun-payung-jatuh-di-laut-pangandaran-ditemukan-tewas	Atlet terjun payung, Widiasih yang sempat hilang saat jatuh di Pantai Batukaras, Pangandaran ditemukan tewas.\n\nBaca selengkapnya: https://news.detik.com/berita/d-8288578/atlet-terjun-payung-jatuh-di-laut-pangandaran-ditemukan-tewas	Atlet terjun payung, Widiasih yang sempat hilang saat jatuh di Pantai Batukaras, Pangandaran ditemukan tewas.	Wisata	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c824795772a825b363a4bf1e4a77e0c8cf4ac75f0a595d373f5c2f.jpeg	{}	https://news.detik.com/berita/d-8288578/atlet-terjun-payung-jatuh-di-laut-pangandaran-ditemukan-tewas	https://serpapi.com/searches/695a7ba22efef872bfbb0637/images/e6c5aae639c824795772a825b363a4bf1e4a77e0c8cf4ac75f0a595d373f5c2f.jpeg	t	7	PUBLISHED	f	2026-01-04 14:39:32.056	2026-01-09 14:39:32.056	2026-01-04 14:39:32.057	2026-01-09 01:45:02.039	cmjzrwwip000032kykh70aw25
cmk54tg5k0005d0k44lqaqgwm	Kisah Wandi, Remaja Tasikmalaya Nekat Jalan Kaki 69 Km ke Pangandaran Demi Melihat Laut	kisah-wandi-remaja-tasikmalaya-nekat-jalan-kaki-69-km-ke-pangandaran-demi-melihat-laut	Dia nekat berjalan kaki sejauh itu karena sangat ingin sekali bermain dan melihat laut dan pantai. Baca berita tanpa iklan.\n\nBaca selengkapnya: https://regional.kompas.com/read/2026/01/06/204445778/kisah-wandi-remaja-tasikmalaya-nekat-jalan-kaki-69-km-ke-pangandaran-demi?page=all	Dia nekat berjalan kaki sejauh itu karena sangat ingin sekali bermain dan melihat laut dan pantai. Baca berita tanpa iklan.	Wisata	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c82479ebc6b8c8162844ff52b5088213cbf6d1a2b3178a283daf35.jpeg	{}	https://regional.kompas.com/read/2026/01/06/204445778/kisah-wandi-remaja-tasikmalaya-nekat-jalan-kaki-69-km-ke-pangandaran-demi?page=all	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c82479ebc6b8c8162844ff52b5088213cbf6d1a2b3178a283daf35.jpeg	t	1	PUBLISHED	f	2026-01-08 07:34:40.135	2026-01-13 07:34:40.135	2026-01-08 07:34:40.136	2026-01-08 23:05:17.552	cmjzrwwip000032kykh70aw25
cmk54tg6k000hd0k4xe5bfrqn	Dukung Ketahanan Pangan, Polres Pangandaran Gelar Panen Raya Jagung Kwartal IV di Cigugur	dukung-ketahanan-pangan-polres-pangandaran-gelar-panen-raya-jagung-kwartal-iv-di-cigugur	PANGANDARAN JAWA BARAT – Dalam rangka menyukseskan program ketahanan pangan nasional, Polres Pangandaran melaksanakan Panen Raya Jagung...\n\nBaca selengkapnya: https://pangandaran.indonesiasatu.co.id/dukung-ketahanan-pangan-polres-pangandaran-gelar-panen-raya-jagung-kwartal-iv-di-cigugur	PANGANDARAN JAWA BARAT – Dalam rangka menyukseskan program ketahanan pangan nasional, Polres Pangandaran melaksanakan Panen Raya Jagung...	Wisata	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c82479cbbcef846882eae55e4e7ca4dbbfb1e17d920a6ef3bb5318.jpeg	{}	https://pangandaran.indonesiasatu.co.id/dukung-ketahanan-pangan-polres-pangandaran-gelar-panen-raya-jagung-kwartal-iv-di-cigugur	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c82479cbbcef846882eae55e4e7ca4dbbfb1e17d920a6ef3bb5318.jpeg	t	1	PUBLISHED	f	2026-01-08 07:34:40.171	2026-01-13 07:34:40.171	2026-01-08 07:34:40.172	2026-01-09 22:14:04.419	cmjzrwwip000032kykh70aw25
cmk54tg6d000fd0k4gwwyfofs	Satlantas Polres Pangandaran Laksanakan Peneguran kepada Pengendara yang Tidak Menggunakan Helm	satlantas-polres-pangandaran-laksanakan-peneguran-kepada-pengendara-yang-tidak-menggunakan-helm	PANGANDARAN – Anggota Satuan Lalu Lintas (Satlantas) Polres Pangandaran melaksanakan kegiatan peneguran terhadap masyarakat.\n\nBaca selengkapnya: https://polrespangandaran.id/satlantas/satlantas-polres-pangandaran-laksanakan-peneguran-kepada-pengendara-yang-tidak-menggunakan-helm/	PANGANDARAN – Anggota Satuan Lalu Lintas (Satlantas) Polres Pangandaran melaksanakan kegiatan peneguran terhadap masyarakat.	Wisata	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c82479e528fee1776baff0579d00d9db0f4d79cc66b344a69f0666.jpeg	{}	https://polrespangandaran.id/satlantas/satlantas-polres-pangandaran-laksanakan-peneguran-kepada-pengendara-yang-tidak-menggunakan-helm/	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c82479e528fee1776baff0579d00d9db0f4d79cc66b344a69f0666.jpeg	t	4	PUBLISHED	f	2026-01-08 07:34:40.164	2026-01-13 07:34:40.164	2026-01-08 07:34:40.166	2026-01-10 07:33:11.857	cmjzrwwip000032kykh70aw25
cmk54tg6q000jd0k4rzyl97mm	Penasaran Pendapatan Pajak Pangandaran Selama Tahun 2025? Ini Rinciannya	penasaran-pendapatan-pajak-pangandaran-selama-tahun-2025-ini-rinciannya	Pangandaran realisasi pajak 2025 Rp107,41 miliar (96,29%). PBB-P2 dan BPHTB jadi penopang, wisata turut mendongkrak.\n\nBaca selengkapnya: https://timesindonesia.co.id/peristiwa-daerah/572518/penasaran-pendapatan-pajak-pangandaran-selama-tahun-2025-ini-rinciannya	Pangandaran realisasi pajak 2025 Rp107,41 miliar (96,29%). PBB-P2 dan BPHTB jadi penopang, wisata turut mendongkrak.	Wisata	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c824795772a825b363a4bf1e4a77e0c8cf4ac75f0a595d373f5c2f.jpeg	{}	https://timesindonesia.co.id/peristiwa-daerah/572518/penasaran-pendapatan-pajak-pangandaran-selama-tahun-2025-ini-rinciannya	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c824795772a825b363a4bf1e4a77e0c8cf4ac75f0a595d373f5c2f.jpeg	t	7	PUBLISHED	f	2026-01-08 07:34:40.177	2026-01-13 07:34:40.177	2026-01-08 07:34:40.178	2026-01-09 21:48:22.355	cmjzrwwip000032kykh70aw25
cmk54tg66000dd0k4kqjpicqo	Perempuan Kemudikan Fortuner Ugal-ugalan di Pangandaran, Dikejar Warga dan Diamankan Polisi	perempuan-kemudikan-fortuner-ugal-ugalan-di-pangandaran-dikejar-warga-dan-diamankan-polisi	Pengemudi wanita Toyota Fortuner diamankan polisi di Pangandaran setelah berkendara ugal-ugalan di kawasan pantai wisata,...\n\nBaca selengkapnya: https://bandung.kompas.com/read/2026/01/07/081752178/perempuan-kemudikan-fortuner-ugal-ugalan-di-pangandaran-dikejar-warga-dan?page=all	Pengemudi wanita Toyota Fortuner diamankan polisi di Pangandaran setelah berkendara ugal-ugalan di kawasan pantai wisata,...	Wisata	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c82479bf5208a807c6737fbace53deed5474857b5c3530a0591326.jpeg	{}	https://bandung.kompas.com/read/2026/01/07/081752178/perempuan-kemudikan-fortuner-ugal-ugalan-di-pangandaran-dikejar-warga-dan?page=all	https://serpapi.com/searches/695f5e0c01289b6df2121f48/images/e6c5aae639c82479bf5208a807c6737fbace53deed5474857b5c3530a0591326.jpeg	t	2	PUBLISHED	f	2026-01-08 07:34:40.157	2026-01-13 07:34:40.157	2026-01-08 07:34:40.158	2026-01-09 22:46:04.143	cmjzrwwip000032kykh70aw25
\.


--
-- Data for Name: destinasi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.destinasi (id, nama, slug, deskripsi, kategori, lokasi, alamat, koordinat, "googleMapsUrl", rating, "jumlahReview", "metaTitle", "metaDescription", status, featured, urutan, "createdAt", "updatedAt", "createdBy") FROM stdin;
cmk0m0ib0002msds8uj2u32kh	TIKET MASUK PANTAI PANGANDARAN BARAT	tiket-masuk-pantai-pangandaran-barat	Pantai Barat Pangandaran adalah salah satu destinasi favorit untuk liburan bersama keluarga, teman, maupun pasangan. Dengan pasir pantai yang luas, ombak yang ramah untuk bermain air, serta pemandangan matahari terbenam yang indah, pantai ini selalu jadi pilihan tepat untuk melepas penat.\nCukup dengan membeli tiket masuk, kamu sudah bisa menikmati suasana pantai yang nyaman, jalan santai di tepi laut, bermain pasir, hingga mencicipi aneka kuliner khas di sekitar pantai. Akses yang mudah dan fasilitas yang cukup lengkap membuat Pantai Barat Pangandaran cocok dikunjungi oleh semua usia.	PANTAI	PANTAI BARAT PANGANDARAN	Pangandaran, Pangandaran, Jawa Barat	-7.685963611075871, 108.65174084901811	https://www.google.com/maps?q=-7.685963611075871,108.65174084901811	2.8	4			PUBLISHED	f	0	2026-01-05 03:37:12.107	2026-01-05 03:37:12.107	cmjzrwwip000032kykh70aw25
cmk0nx0wn0001xv5tqlt63m16	PERAHU	perahu	Perahu di Pantai Barat Pangandaran berfungsi sebagai sarana penyeberangan wisatawan menuju Pantai Pasir Putih. Perahu bermesin ini dioperasikan oleh masyarakat setempat dan digunakan secara rutin untuk memudahkan akses antar kawasan wisata. Selain menunjang kenyamanan wisatawan, keberadaan perahu penyeberangan ini juga berperan penting dalam mendukung sektor pariwisata serta perekonomian masyarakat pesisir Pangandaran.	WAHANA_AIR	PANTAI BARAT PANGANDARAN 	Pangandaran, Desa Pagandaran, Jawa Barat	-7.7001927, 108.6557911	https://www.google.com/maps?q=-7.7001927,108.6557911	5	1			PUBLISHED	f	0	2026-01-05 04:30:28.823	2026-01-05 04:31:30.125	cmjzrwwip000032kykh70aw25
cmk0munap002vsds8p1v9oixp	SNORKELING PANTAI BARAT	snorkeling	Nikmati pengalaman snorkeling seru di Pantai Pasir Putih Pangandaran Barat dengan air laut yang jernih dan tenang. Di sini kamu bisa melihat langsung keindahan terumbu karang serta berbagai ikan warna-warni yang hidup alami di perairan dangkal. Cocok untuk pemula maupun yang sudah berpengalaman, karena lokasinya aman dan nyaman.\nDengan peralatan snorkeling yang tersedia dan pemandu berpengalaman, aktivitas ini jadi pilihan pas untuk mengisi liburan agar lebih berkesan. Snorkeling di Pantai Pasir Putih bukan cuma menyegarkan, tapi juga jadi cara seru menikmati keindahan bawah laut Pangandaran.	WAHANA_AIR	PASIR PUTIH BARAT PANGANDARAN	Pangandaran, Desa Pagandaran, Jawa Barat	-7.70644741382365, 108.65269035100938	https://www.google.com/maps?q=-7.70644741382365,108.65269035100938	4.8	28	-	-	PUBLISHED	t	0	2026-01-05 04:00:38.245	2026-01-05 08:17:32.044	cmjzrwwip000032kykh70aw25
cmk0o4fvk0006xv5tbb51ayah	Pantai Pasir Putih	pantai-pasir-putih	Pantai Pasir Putih Pangandaran adalah destinasi yang sering dikunjungi di Jawa Barat yang terkenal dengan pasir putih bersih, suasana alami di Cagar Alam Pananjung, dan biota laut indah, bisa diakses jalan kaki atau perahu dari Pantai Pangandaran. Daya tarik lainnya termasuk monyet liar yang jahil, bangkai kapal MV Viking yang jadi spot foto, serta kegiatan snorkeling dan bermain pasir, menawarkan pesona alam dan ketenangan.	PANTAI	Pantai Barat, Pangandaran	FV Viking Lagos, Pamugaran Bulak Laut, Dusun Pangandaran Timur, Pangandaran, Desa Pagandaran, Pangandaran, Jawa Barat	-7.70652626734372, 108.6537551879883	https://www.google.com/maps?q=-7.70652626734372,108.6537551879883	4.7	455			PUBLISHED	f	0	2026-01-05 04:36:14.804	2026-01-05 04:48:22.784	cmjzrwwip000032kykh70aw25
cmk0obkxb000exv5tt1i93dkj	STAND UP PADDLE	stand-up-paddle	Nikmati serunya bermain Stand Up Paddle di Pasir Putih Barat Pangandaran dengan suasana laut yang tenang dan air yang jernih. Aktivitas ini cocok buat kamu yang ingin santai sambil menikmati pemandangan pasir putih dan laut biru dari sudut pandang yang berbeda.\nTidak perlu pengalaman khusus, karena sebelum mulai kamu akan mendapat arahan dari pemandu. Stand Up Paddle jadi pilihan seru untuk mengisi liburan, cocok untuk pemula, keluarga, maupun yang ingin mencoba aktivitas air yang ringan tapi tetap menyenangkan.	PANTAI	PASIR PUTIH 	Pangandaran, Desa Pagandaran, Jawa Barat	-7.706502345494967, 108.65269035100938	https://www.google.com/maps?q=-7.706502345494967,108.65269035100938	5	230	-	-	PUBLISHED	t	0	2026-01-05 04:41:47.951	2026-01-05 04:41:47.951	cmjzrwwip000032kykh70aw25
cmk0ohax8000uxv5tr4e4jbx6	CAGAR ALAM	cagar-alam	Cagar Alam Pangandaran merupakan kawasan konservasi alam yang terletak di Semenanjung Pangandaran, Kabupaten Pangandaran, Jawa Barat, Indonesia. Kawasan ini mencakup hutan tropis, pantai, dan gua-gua bersejarah dengan luas sekitar 460 hektar, menawarkan keanekaragaman flora dan fauna khas.\n\nTerdapat beberapa goa:\n       1.goa parat/ keramat\n       2.goa rengganis\n       3.goa sumur mudal\n       4.goa lanang\n       5.goa jepang\n       6.situs batu kalde\n       7.goa miring\n       8.goa panggung\n	CAGAR_ALAM	Pantai Timur	Pangandaran, Desa Pagandaran, Jawa Barat	-7.705186641732314, 108.6559519171715	https://www.google.com/maps?q=-7.705186641732314,108.6559519171715	4.3	1327	-	-	PUBLISHED	t	0	2026-01-05 04:46:14.924	2026-01-05 04:46:14.924	cmjzrwwip000032kykh70aw25
cmk0vw9mm001rxv5ti0mkkvlg	SNORKELING PANTAI TIMUR	snorkeling-pantai-timur	Snorkeling Pantai Timur Pangandaran menawarkan pengalaman menjelajahi keindahan bawah laut yang tenang dan ramah bagi pemula. Perairannya relatif dangkal dengan ombak yang lebih kecil dibanding Pantai Barat, sehingga cocok untuk aktivitas snorkeling yang aman dan nyaman. Di bawah permukaan laut, wisatawan dapat menikmati pemandangan terumbu karang alami, ikan-ikan berwarna-warni, serta biota laut khas pesisir selatan Jawa yang memukau.\n\nWaktu terbaik untuk snorkeling biasanya pada pagi hari saat air laut lebih jernih dan sinar matahari menembus permukaan, menciptakan panorama bawah laut yang menawan. Aktivitas ini sering dilengkapi dengan peralatan snorkeling, pelampung, dan pendamping berpengalaman, sehingga pengunjung dapat menikmati wisata bahari tanpa khawatir. Snorkeling di Pantai Timur Pangandaran menjadi pilihan ideal bagi keluarga, pasangan, maupun wisatawan yang ingin merasakan keindahan laut dengan cara yang santai dan menyenangkan.	WAHANA_AIR	PANTAI TIMUR PANGANDARAN	Pangandaran, Desa Pagandaran, Jawa Barat	-7.706676000352803, 108.66427212953569	https://www.google.com/maps?q=-7.706676000352803,108.66427212953569	5	1	-	-	PUBLISHED	t	0	2026-01-05 08:13:50.393	2026-01-09 10:54:27.903	cmjzrwwip000032kykh70aw25
\.


--
-- Data for Name: destinasi_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.destinasi_detail (id, "destinasiId", jenis, judul, konten, urutan) FROM stdin;
cmk0m0ib0002ssds8713pt6x2	cmk0m0ib0002msds8uj2u32kh	FASILITAS	-	-	0
cmk0obkxb000kxv5tbiu5tqys	cmk0obkxb000exv5tt1i93dkj	FASILITAS	DURASI	Durasi: ±2 Jam\nCocok buat kamu yang mau menikmati ketenangan laut sambil berdiri di atas papan Stand Up Paddle, menjelajahi keindahan Pantai Barat hingga Pasir Putih Pangandaran dengan pengalaman yang berbeda dan seru!	0
cmk0obkxb000lxv5t3l7ijm01	cmk0obkxb000exv5tt1i93dkj	FASILITAS	FASILITAS	1. Pemandu profesional\n2. Peralatan Stand Up Paddle lengkap\n3. Dokumentasi kegiatan menggunakan handphone\n4. Air mineral	1
cmk0obkxb000mxv5tlsq7eiir	cmk0obkxb000exv5tt1i93dkj	AKTIVITAS	WAKTU DAN KEGIATAN	Tersedia dalam beberapa sesi:\n06.00–08.00\n08.00–10.00\n10.00–12.00\n12.00–14.00\n14.00–16.00\n16.00–18.00\nJadwal kegiatan harus dikonfirmasi terlebih dahulu untuk memastikan ketersediaan waktu.	2
cmk0obkxb000nxv5tioomqjod	cmk0obkxb000exv5tt1i93dkj	TIPS	ITINERARY SINGKAT	1. Kedatangan di Lokasi\n2. Penyambutan dan registrasi peserta\n3. Briefing\n4. Pengenalan peralatan dan instruksi keselamatan oleh pemandu.\n5. Aktivitas Stand Up Paddle:\n6. Menyusuri perairan Pangandaran sesuai paket yang dipilih.\n7. Snorkeling (jika memilih paket)\n8. Eksplorasi keindahan bawah laut dengan peralatan snorkeling.\n9. Penutupan\n10. Pengembalian peralatan dan sesi foto bersama.\n	3
cmk0obkxb000oxv5t4qx55hsu	cmk0obkxb000exv5tt1i93dkj	AKTIVITAS	SYARAT DAN KETENTUAN	\nPeserta yang Tidak Disarankan\n1. Memiliki penyakit jantung\n2. Asma akut\n3. Cedera tulang\n4. Ibu hamil\n\nKetentuan Lain\n1. Peserta wajib mengikuti instruksi dari pemandu.\n2. Usia minimal peserta adalah 10 tahun atau didampingi oleh orang dewasa.\n3. Pemesanan dilakukan minimal 1 hari sebelum tanggal aktivitas.	4
cmk0ohax8000xxv5tfnbm4u84	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Toilet & Kamar Mandi	Tersedia di beberapa titik	0
cmk0ohax8000yxv5tb27nc8hx	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Tempat Parkir 	Luas dan aman	1
cmk0ohax8000zxv5tzfyefqzo	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Warung Makan	Terdapat banyak warung makan di area Cagar Alam	2
cmk0ohax80010xv5trg2ritdp	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Pemandu Wisata	Pemandu Wisata yang berpengalaman dan bersertifikat, membantu edukasi flora-fauna.	3
cmk0ohax80011xv5ts7rmi1zu	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Pusat Informasi & Pos Pelayanan	-	4
cmk0ohax80012xv5th0tdj0to	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Telekomunikasi	-	5
cmk0ohax80013xv5t9zvw47ak	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Peralatan	Penyewaan perlengkapan snorkeling dan trekking.	6
cmk0ohax80014xv5tbbpdkooc	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Jalur Trekking	Jalur edukasi alam yang tersedia	7
cmk0ohax80015xv5t34snum1o	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Wisata Air	Akses untuk snorkeling dan glass bottom boat (opsional)	8
cmk0ohax80016xv5tsw8k9vbd	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Konservasi Penyu	Wisata edukasi penyu (di area sekitar). 	9
cmk0ohax80017xv5t73c07tt2	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Goa Bersejarah	Goa Jepang, Goa Panggung, Goa Parat, Goa Lanang, Goa Sumur Mudal.	10
cmk0ohax80018xv5tnysnhzn1	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Situs Bersejarah	Batu Kalde (reruntuhan candi kuno).	11
cmk0ohax80019xv5tl4f57xgh	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Pantai	Pantai Pasir Putih	12
cmk0ohax8001axv5t7ea57f7a	cmk0ohax8000uxv5tr4e4jbx6	FASILITAS	Spot Foto	Batu Layar, Gua Jepang, Pantai Pasir Putih	13
cmk0vw9mm001vxv5tpiywdul9	cmk0vw9mm001rxv5ti0mkkvlg	FASILITAS	FASILITAS	1. Pemandu profesional\n2. Peralatan snorkeling\n3. Perahu selama kegiatan snorkeling\n4. Roti untuk feeding ikan\n5. Peralatan P3K\n6. Dokumentasi kegiatan (mobile phone)	0
cmk0vw9mm001wxv5tgjm0xk5y	cmk0vw9mm001rxv5ti0mkkvlg	LAINNYA	OPSIONAL	1. Dokumentasi action camera: Rp 200.000 per grup\n2. Durasi dokumentasi: ± 2 jam\n3. Hasil foto dan video dibagikan via Google Drive atau OTG	1
cmk0vw9mm001xxv5thlj3mi8f	cmk0vw9mm001rxv5ti0mkkvlg	AKTIVITAS	ITINERARY SINGKAT	1. Meeting point: Pantai Timur Pangandaran\n2. Briefing & persiapan: Pengenalan alat dan prosedur keselamatan\n3. Perjalanan dengan perahu: Menuju spot snorkeling Batu Layar\n4. Snorkeling & feeding ikan: Menikmati keindahan bawah laut dan berinteraksi dengan ikan\n5. Kembali ke daratan & bilas: Membersihkan diri setelah aktivitas	2
cmk0vw9mm001yxv5t8jepsusr	cmk0vw9mm001rxv5ti0mkkvlg	ATURAN	SYARAT DAN KETENTUAN	1. Minimal peserta: 2 orang\n2. Tidak memiliki riwayat penyakit jantung atau asma berat\n3. Anak-anak diperbolehkan dengan pengawasan orang tua\n4. Aktivitas dapat ditunda atau dijadwalkan ulang jika kondisi cuaca tidak mendukung\n5. Disarankan membawa pakaian ganti, handuk, dan perlengkapan mandi	3
cmk0w10nf0021xv5t39tovqzz	cmk0munap002vsds8p1v9oixp	FASILITAS	FASILITAS	1. Pemandu profesional\n2. Peralatan snorkeling\n3. Perahu pulang–pergi menuju Pasir Putih\n4. Roti untuk feeding ikan\n5. Peralatan P3K\n6. Dokumentasi kegiatan (menggunakan mobile phone)	0
cmk0w10nf0022xv5tww45jjd7	cmk0munap002vsds8p1v9oixp	AKTIVITAS	OPSIONAL	1. Dokumentasi action camera: Rp 200.000 per grup\n2. Durasi dokumentasi: ± 2 jam\n3. Hasil foto dan video dibagikan melalui Google Drive atau OTG	1
cmk0w10nf0023xv5ty1g97hgu	cmk0munap002vsds8p1v9oixp	TIPS	ITINERARY SINGKAT	1. Meeting point: Pantai Barat Pangandaran\n2. Briefing & persiapan: pengenalan alat dan prosedur keselamatan\n3. Perjalanan dengan perahu menuju spot snorkeling Pasir Putih\n4. Snorkeling & feeding ikan: menikmati keindahan bawah laut dan berinteraksi dengan ikan\n5. Kembali ke daratan & bilas setelah aktivitas	2
cmk0w10nf0024xv5tm1nrge6d	cmk0munap002vsds8p1v9oixp	ATURAN	SYARAT DAN KETENTUAN	1. Minimal peserta 2 orang\n2. Tidak memiliki riwayat penyakit jantung atau asma berat\n3. Anak-anak diperbolehkan dengan pengawasan orang tua\n4. Aktivitas dapat ditunda atau dijadwalkan ulang jika kondisi cuaca tidak mendukung\n5. Disarankan membawa pakaian ganti, handuk, dan perlengkapan mandi	3
\.


--
-- Data for Name: destinasi_harga; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.destinasi_harga (id, "destinasiId", "jenisHarga", harga, keterangan, urutan) FROM stdin;
cmk0m0ib0002osds81vx27am4	cmk0m0ib0002msds8uj2u32kh	TIKET MASUK 	20000	per orang	0
cmk0m0ib0002psds8y274e4od	cmk0m0ib0002msds8uj2u32kh	PARKIR MOTOR	20000	per motor	1
cmk0m0ib0002qsds858imt0sp	cmk0m0ib0002msds8uj2u32kh	PARKIR MOBIL	60000	per mobil	2
cmk0m0ib0002rsds8ssp9v634	cmk0m0ib0002msds8uj2u32kh	PARKIR BUS	200000	per bus	3
cmk0nyc7i0004xv5tvelapza5	cmk0nx0wn0001xv5tqlt63m16	Tiket Perahu	20	Per orang	0
cmk0obkxb000fxv5to1qywhpg	cmk0obkxb000exv5tt1i93dkj	PADDLE ONLY SINGLE PADDLE	250000	1 paddleboard untuk 1 orang	0
cmk0obkxb000gxv5t9rnvcjki	cmk0obkxb000exv5tt1i93dkj	PADDLE ONLY TANDEM 	350000	1 paddleboard untuk 2 orang	1
cmk0obkxb000hxv5tollmcsqp	cmk0obkxb000exv5tt1i93dkj	PADDLE + SNORKELING SINGLE PADDLE	350000	untuk 1 orang	2
cmk0obkxb000ixv5tn6dn8y64	cmk0obkxb000exv5tt1i93dkj	PADDLE + SNORKELING TANDEM PADDLE	550000	untuk 2 orang	3
cmk0obkxb000jxv5tjou64lle	cmk0obkxb000exv5tt1i93dkj	DRONE	250000	per baterai (durasi 15–20 menit), termasuk foto dan video. File akan diberikan melalui Google Drive atau OTG.	4
cmk0ohax8000vxv5t3kim2x6g	cmk0ohax8000uxv5tr4e4jbx6	Tiket Masuk Weekday 	16	Per orang	0
cmk0ohax8000wxv5tteaeti8d	cmk0ohax8000uxv5tr4e4jbx6	Tiket Masuk Weekend	21	Per orang	1
cmk0ok1kw001fxv5tessmtix5	cmk0o4fvk0006xv5tbb51ayah	Tiket masuk menggunakan perahu	25	Per orang	0
cmk0ok1kw001gxv5t2skwvno0	cmk0o4fvk0006xv5tbb51ayah	Tiket masuk jalur Cagar Alam	22	Per orang	1
cmk0vw9mm001sxv5tvhnw7m7g	cmk0vw9mm001rxv5ti0mkkvlg	SNORKELING 	100000	per orang	0
cmk0vw9mm001txv5txbnrfzis	cmk0vw9mm001rxv5ti0mkkvlg	HARGA PROMO	90000	lebih dari 5 orang	1
cmk0vw9mm001uxv5t14ylzdna	cmk0vw9mm001rxv5ti0mkkvlg	DOKUMENTASI ACTION CAMERA	200000	per grup	2
cmk0w10nf0020xv5t778dsnld	cmk0munap002vsds8p1v9oixp	SNORKELING PANTAI BARAT	150000	per orang	0
\.


--
-- Data for Name: destinasi_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.destinasi_images (id, "destinasiId", url, caption, "isPrimary", urutan, "createdAt") FROM stdin;
cmk0m0ib0002nsds85o65hitt	cmk0m0ib0002msds8uj2u32kh	https://amazingpangandaran.com/uploads/galeri/1767584226179-ctqkpgot1r.png		t	0	2026-01-05 03:37:12.107
\.


--
-- Data for Name: destinasi_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.destinasi_reviews (id, "destinasiId", "userId", "userName", rating, comment, "createdAt", "updatedAt") FROM stdin;
cmk6re8mx0003138upv8sy4lb	cmk0vw9mm001rxv5ti0mkkvlg	cmk6rd5lz0001138usmf2rsak	kang fadil	5	ini sangat bagus	2026-01-09 10:54:27.898	2026-01-09 10:54:27.898
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, nama, slug, deskripsi, lokasi, alamat, koordinat, "googleMapsUrl", "tanggalMulai", "tanggalSelesai", "jamMulai", "jamSelesai", gambar, thumbnail, "kontakPerson", "nomorTelepon", "hargaTiket", status, featured, "createdAt", "updatedAt", "createdBy") FROM stdin;
cmjzvjqub001qsds8g5s8o3tz	CFD	cfd	GRAND PANGANDARAN	JALAN PANGANDARAN	Pangandaran, Jawa Barat, Jawa, 46396, Indonesia	-7.68782428453068,108.64817082926868	https://www.google.com/maps?q=-7.68782428453068,108.64817082926868	2026-01-11 00:00:00	2026-01-11 00:00:00	06:00	12:00	https://i.pinimg.com/originals/b7/e2/28/b7e228a5d573e9e197d5badf412d5026.jpg		aa cfd	08123456789	GRATIS	PUBLISHED	f	2026-01-04 15:16:20.003	2026-01-05 08:24:03.728	cmjzrwwip000032kykh70aw25
\.


--
-- Data for Name: galeri; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.galeri (id, judul, deskripsi, url, thumbnail, kategori, tags, "tipeMedia", featured, urutan, "createdAt", "updatedAt", "uploadedBy") FROM stdin;
cmk54vvpp000nd0k47bmwhpk3	pangandaran	test	https://i.pinimg.com/originals/bf/d9/26/bfd92657bea5957a17c06f66f3eea0e0.jpg	https://i.pinimg.com/originals/bf/d9/26/bfd92657bea5957a17c06f66f3eea0e0.jpg	LAINNYA	{test}	IMAGE	f	0	2026-01-08 07:36:33.613	2026-01-08 07:36:33.613	cmjzrwwip000032kykh70aw25
cmk5ibyzj001jd0k42s54fq5k	CFD	grand pangandaran	https://amazingpangandaran.com/uploads/galeri/1767880361248-se5qvxr26l.jpg	https://amazingpangandaran.com/uploads/galeri/1767880361248-se5qvxr26l.jpg	EVENT	{cfd}	IMAGE	f	0	2026-01-08 13:52:59.358	2026-01-08 13:52:59.358	cmjzrwwip000032kykh70aw25
cmk5jdl0v0001mhzp2vy479fw	Sunset Pangandaran	\N	https://i.pinimg.com/originals/84/7d/1f/847d1fd58f5421a447b53e2af8e2876e.jpg	https://i.pinimg.com/originals/84/7d/1f/847d1fd58f5421a447b53e2af8e2876e.jpg	PANTAI	{}	IMAGE	f	0	2026-01-08 14:22:14.191	2026-01-08 14:22:14.191	cmjzrwwip000032kykh70aw25
cmk5jev5c0003mhzpnqpdrkdt	sunrise pangandaran	\N	https://i.pinimg.com/originals/9f/6b/4f/9f6b4fa74eae4ebcbeed207206ea49e6.jpg	https://i.pinimg.com/originals/9f/6b/4f/9f6b4fa74eae4ebcbeed207206ea49e6.jpg	PANTAI	{}	IMAGE	f	0	2026-01-08 14:23:13.968	2026-01-08 14:23:13.968	cmjzrwwip000032kykh70aw25
cmk5jh1a90005mhzpwhfytrkk	snorkeling	\N	https://i.pinimg.com/originals/e2/ca/13/e2ca1354022c77bad3f73e8d57d2c812.jpg	https://i.pinimg.com/originals/e2/ca/13/e2ca1354022c77bad3f73e8d57d2c812.jpg	PANTAI	{}	IMAGE	f	0	2026-01-08 14:24:55.233	2026-01-08 14:24:55.233	cmjzrwwip000032kykh70aw25
cmk5jih2t0007mhzp30dfzbk3	pasir putih pangandaran	\N	https://i.pinimg.com/originals/cd/ab/a9/cdaba9d8a640c8ee1cbcafe24ecd1ebc.jpg	https://i.pinimg.com/originals/cd/ab/a9/cdaba9d8a640c8ee1cbcafe24ecd1ebc.jpg	PANTAI	{}	IMAGE	f	0	2026-01-08 14:26:02.357	2026-01-08 14:26:02.357	cmjzrwwip000032kykh70aw25
cmk5jrprl0009mhzpafrxpmhk	paddle board pangandaran	\N	https://i.pinimg.com/originals/44/fe/75/44fe75a1611c6a946f967af59e964cbf.jpg	https://i.pinimg.com/originals/44/fe/75/44fe75a1611c6a946f967af59e964cbf.jpg	PANTAI	{}	IMAGE	f	0	2026-01-08 14:33:13.522	2026-01-08 14:33:13.522	cmjzrwwip000032kykh70aw25
cmk5jw7eo000bmhzp5rsm3ft0	grand pangandaran	\N	https://i.pinimg.com/originals/0f/99/15/0f9915a796467b8dfebf7c66a48f3d29.jpg	https://i.pinimg.com/originals/0f/99/15/0f9915a796467b8dfebf7c66a48f3d29.jpg	PANTAI	{}	IMAGE	f	0	2026-01-08 14:36:43.007	2026-01-08 14:36:43.007	cmjzrwwip000032kykh70aw25
cmk5jxy0h000dmhzp1fpmrmun	banana boat	\N	https://i.pinimg.com/originals/22/e2/8f/22e28fbd79bf8df885a4478012722a42.jpg	https://i.pinimg.com/originals/22/e2/8f/22e28fbd79bf8df885a4478012722a42.jpg	PANTAI	{}	IMAGE	f	0	2026-01-08 14:38:04.145	2026-01-08 14:38:04.145	cmjzrwwip000032kykh70aw25
cmk5jyzzv000fmhzpy4zokdds	jetski	\N	https://i.pinimg.com/originals/46/9d/d6/469dd6d68a244fc44e271fef13459ff2.jpg	https://i.pinimg.com/originals/46/9d/d6/469dd6d68a244fc44e271fef13459ff2.jpg	PANTAI	{}	IMAGE	f	0	2026-01-08 14:38:53.371	2026-01-08 14:38:53.371	cmjzrwwip000032kykh70aw25
cmk5k496d0001sen5g2s32kjp	perahu	\N	https://i.pinimg.com/originals/4b/40/c2/4b40c26f3b291f7744aa397ccb3ef900.jpg	https://i.pinimg.com/originals/4b/40/c2/4b40c26f3b291f7744aa397ccb3ef900.jpg	PANTAI	{}	IMAGE	f	0	2026-01-08 14:42:58.549	2026-01-08 14:42:58.549	cmjzrwwip000032kykh70aw25
\.


--
-- Data for Name: hotel_listings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotel_listings (id, name, description, link, thumbnail, source, location, price, rating, reviews, "propertyToken", "checkInDate", "checkOutDate", "fetchedAt", "updatedAt", "createdAt") FROM stdin;
cmk55afgt000od0k4hhvrpvdi	The Allure Villas Pangandaran	\N	https://sahidhotels.com/the-allure-villas/?utm_source=GoogleMyBusiness	https://lh3.googleusercontent.com/p/AF1QipP2y5q5GPmlO2qcWDBXma2ALGyufUmUUbZe8tsy=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 1,118,707	4.6	1700	ChoIueyytfON7ZiKARoNL2cvMTFoMWRsZGZ0NhAB	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgt000pd0k40dae3azp	Long Beach Hotel	Relaxed hotel offering simple quarters, an outdoor pool & a thatched cafe with a terrace.	\N	https://lh3.googleusercontent.com/p/AF1QipNvBpLn3SIQaYlGcfdm7AHLh7tsfF-IqkFgYdgg=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 381,194	4.7	726	ChoIs47Ur-Hp_e_ZARoNL2cvMTFsbTB5NjBtcRAB	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgt000qd0k47qezihdj	Menara Laut Hotel	Warmly styled rooms near the beach, plus a restaurant, a cafe, a cocktail lounge & a pool.	\N	https://lh3.googleusercontent.com/gps-cs-s/AG0ilSydoTJUfDEcHa1u2dXNWAe3ytdyPuWxa83Nz3AjAPJcQMOYveBOt8fC29QSF8j1jzCtfnVnFpYhYzQ4UUQZ0cFdSMIC8bCjdLIg1DDL1PV9rZlU_CfxpzmYSeWwWKAZlQdpeRfp=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 1,853,200	4.5	1865	ChgIq4T5xOGQhItnGgwvZy8xcHpxMDRfcDkQAQ	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgt000rd0k42fnoydbi	Hotel Grand Cahaya	\N	\N	https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyEOUprYJlvxrbsG-g-k8gR7JqgGfsi1OK_yoWjSj53ZoA-G4Zn52AcNq-zK6DGp2ymd9-052Efs8125DpWwhKk72ISPDoKKo2pV5UCVztEhJGtmqkj2sbRtGmyLKOS0Pjvp_PX=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 476,136	4.5	156	ChkI-My4m-Ts9eZeGg0vZy8xMXRuZGg0M2xzEAE	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgt000sd0k4kjrj0sbq	The Arnawa Pangandaran Hotel	Unpretentious rooms in a relaxed property offering an outdoor pool & a restaurant.	https://linktr.ee/thearnawapangandaran	https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyWPQ3vH3R5QdMttm1ygriTR2Ooscb8abNW7NNRC-HiKiVMAPryTGUlYFoui-TYErlBMJLd3matDrtKOu8h7cSGDt7F0ePfN_gGUQZQ9HZjVlsUo1F0MgrKreOVMU3EAx92P-k=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 629,016	4.5	3205	ChgI7M-I9vnZz7x4GgwvZy8xMm1sMnltbHkQAQ	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgt000td0k4amyswsof	Krisna Beach Hotel	\N	https://instagram.com/krisnabeachhotel	https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzuRyL0OmO_wNlLegln7ChrPAe3cGkfh6oN1sddB0MKNd-vk5i0od4-6dkxW7hF2eRtEwkANyM61vNEOoZ8HpXmHDq4kXoLigOQyqoiZmlYJtH32kI7bVk0dfyUqc-rS6k619E=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 405,616	4.3	2294	ChgIvpvF2LCY-JQqGgwvZy8xMm1sMmxod3cQAQ	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu000ud0k47ffc3v8o	PAPITO HOTEL PANGANDARAN	\N	\N	https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy51G4WpmmNkYntlhywx0Kjj6dk0fVWUuv5JvUbwIaPz8ColVnGEKUxGYhJig2OnnIxLiw4q79yIVHRw4tsYsZuZQdrIyHJbrUZvAZ_q2o2hp70HhwpGFhPvTKlICVsEXKx1wnv1A=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 310,433	4.8	453	ChgIoP-Z6Oz2pM8wGgwvZy8xMm1remtmNXkQAQ	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu000vd0k432x2k9ye	Uni Beach Hotel	Unfussy rooms & suites, some with ocean views, in a relaxed hotel offering a pool & breakfast.	https://unibeach.id/	https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyNMti21lLOd1oFwJcWbE_CPVGxZdcyoGFqSlA54RnEINjpNYkdeiigiAX4jptMlDSMXnWpbAWEqmQa2UrG0aUW6rKAegXB941uo7MIib_QUcBBJPFj4sK5TTVU8wqIpQ005yHsgw=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 385,689	4.3	2635	ChkI67X45qa6toHWARoML2cvMTJobHQ0MmtsEAE	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu000wd0k46tpp5tq9	Bulak Laut Hotel & Resort	Simple rooms in a laid-back hotel near the ocean featuring a warm restaurant & an outdoor pool.	\N	https://lh3.googleusercontent.com/p/AF1QipMkxwsYnKW6R0HBzUOnzaQgT8TKDB-grkZR-5Dq=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 513,203	4.5	1262	ChcIg9mj54Tawu18GgsvZy8xdGpjcnNidhAB	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu000xd0k43387vmst	Krisna Beach Hotel II	\N	\N	https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzwx3YRpPxjvr8GwyPg5OWsJO0prlcK2-nszLxB4CYBuw9ipQWmNb-loY9e5wxynPCoekFJFPbuHZOLhEyHFT1aQVScktjpeAqsz_GeM_APk4UllnvUyLKetkTEzFSy4jWN6CJGLQ=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 301,975	4.2	974	ChkI_LXWvr3epu7rARoML2cvMXB6eW41ZnB4EAE	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu000yd0k4ex3f04rk	Hotel Grand Mutiara Pangandaran	Relaxed rooms in a casual hotel near the beach, offering a vibrant restaurant & an outdoor pool.	\N	https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy-Igpybqvkixj5grr3reLmcy9qYgaPFAqqm-YOePFNiB-aAd4_wTxQb3fc9x418eQlRtJi89uR0YTOXntklLxtc6s7z-6vrsWFLmNuIg9PxxbXu3hoBZRjeyqPUkX2oTq9UWcm=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 579,548	4.3	833	ChcIhYHtha77_JZhGgsvZy8xdGYzbGI3NhAB	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu000zd0k4frh3w06q	Nyiur Resort Hotel	Unfussy hotel offering an outdoor pool, a terrace & a restaurant, as well as free breakfast.	http://www.nyiurresort.com/	https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyWcivHojIw4NpuMbTDGAGPmMJqCDnmVkn1lU5ED4dOOE6MuVn5lf4WQ-SD2fY9KveRJ5zhaEhLss9yDbD3uFtpjTDRYnpnm_EOxw2Mbp7VQyLeL0opL_QfrLyG88QtUnsvkoBb=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 401,625	4.3	1041	ChkIvbTGzpXW2NKBARoML2cvMTFjZmZjZ3pxEAE	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu0010d0k4ns4y0ahm	Mini Tiga Homestay	\N	\N	https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwLB3CUMsl2W1hDTG7cC0HZ3WwieWF3eccZzs61Eq2kFEfN3CIw3GQwXM1WZ9Jn0guibV54flWpSz0zhWzmoSeAnCGfXUBKOqs2qc61rr00xo-AlYe1e5IjQPSpxNXQVw0LGUig=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 180,000	4.7	286	ChkIpf3D-cuc6pDkARoML2cvMWpreXpncTV5EAE	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu0011d0k46p5biftr	Crown Hotel Pangandaran	\N	https://www.tiktok.com/@crown.hotel.panga?_t=8sHiD5uhx5N&_r=1	https://lh3.googleusercontent.com/p/AF1QipP8N85cwZ1uujVL4lQOvywEMMS6qBJZIGBFznCy=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 388,906	4.8	103	ChoI9cPf_MqD8PCxARoNL2cvMTF3dHFrY2s2ORAB	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu0012d0k4jw898n60	Holiday Beach Inn	\N	\N	https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzzkXl1NgHHrzZdwU_-m9jXyotCjFyC70lNJM9PA6uSOrDc4fjmMCFEYJ43t5YK5FwsjNiIE4178bsoTUp7SpCKdnxqWdg1A9QsW_cI3-uS-32khsnFdieLHzex6HsDxz6pDTBPsQ=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 446,727	4.3	1210	ChcIk5LctaTf94oNGgsvZy8xdGo0X19wdhAB	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu0013d0k4hv0eupso	Pangandaran	\N	\N	https://lh3.googleusercontent.com/gps-cs-s/AG0ilSw8ktTeexLuo33BbatrHN12KhN5mH3iMrT00mzIHchCnHyHT4X-NHeNvtCU9xfR3W9PumqfHmz70RvRA241JNLAQjZ5TWHh9ZUDyAnwNlr196Br71lRCx061B-X5w5cDkvgU60-=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 1,263,456	4.4	28	ChkIhsi2nsiZwfxyGg0vZy8xMWowMjl6Nnc5EAE	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu0014d0k47u2rhlrb	Pondok Indah Beach Hotel	\N	\N	https://lh3.googleusercontent.com/proxy/34DXzj_UpMvSf8feW9TKtXD3ZnGV_7GUYVx7HszLp2SX2OtL1XlZnfkSAr5C8JJ9rjcGjCeobfeDpEaWCR0_195a1Au1KsP4NW3ct8uNAfZ9DopohHTQPlE9AasoEO7mkbEpWF5YIsmZh5KLaCAGwwYkJ8wYMx4=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 326,813	4.4	305	ChkI_-jBxa20qK2RARoML2cvMWpreGZsMWI1EAE	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu0015d0k4kg6fy1rr	AHLEN Pangandaran	Low-key hotel offering an unpretentious open-sided restaurant, a garden & loaner bikes, plus Wi-Fi.	http://ahlenpangandaran.com/	https://lh3.googleusercontent.com/p/AF1QipMdtnOWNJl6lO_7wD1G4TeRqBAO-6XsvctLoxsb=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 270,000	4.5	638	ChoI6su4tJiykPCrARoNL2cvMTFjamowbHpnMBAB	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu0016d0k4k8p7wsi7	JM HOMESTAY	\N	https://www.bluepillow.com/search/64861d577f7e24c1922fb750?dest=bkng&cat=House&lat=-7.69307&lng=108.65525&language=en	https://lh5.googleusercontent.com/proxy/RgvHIU5pE__7fMrH_SZechbG2GxwYamdlNt32kEeAIh_FKy27IFigLccxNqD_jBEZYWrZJgJdxZNrZZ-JDZELAzY0KmUs2FZ5HzqoBHDR4lCgwXJoTkdhmTYgxrurpzqLMgwuEmIfsj7QMTRS5gkpxrBIcrevTg=s287-w287-h192-n-k-no-v1	google_hotels	\N	IDR 333,263	4.5	1	ChoQ3Z_JpN2Q9r7VARoNL2cvMTF2M2ZmZHJzdxAC	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
cmk55afgu0017d0k4nxx38lii	Guest House Pangandaran	\N	https://www.bluepillow.com/search/61828c149e3163a56a28d3ab?dest=ago&cat=Vacation+rental+(other)&lat=-7.6947&lng=108.65793&language=en	\N	google_hotels	\N	IDR 1,360,601	\N	\N	ChoQ5fT848zu-_GlARoNL2cvMTFtY3NrOTg4MxAC	2026-01-15	2026-01-16	2026-01-08 07:47:52.392	2026-01-08 07:47:52.396	2026-01-08 07:47:52.392
\.


--
-- Data for Name: informasi_umum; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.informasi_umum (id, kategori, judul, slug, konten, icon, gambar, urutan, status, "createdAt", "updatedAt", "createdBy") FROM stdin;
\.


--
-- Data for Name: kuliner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kuliner (id, nama, slug, deskripsi, kategori, lokasi, alamat, koordinat, "googleMapsUrl", "hargaMin", "hargaMax", "nomorTelepon", "jamBuka", gambar, rating, status, featured, "createdAt", "updatedAt") FROM stdin;
cmjzu8pos0019sds88bmil7bm	10 Restoran Terbaik di Pangandaran - Tripadvisor	10-restoran-terbaik-di-pangandaran-tripadvisor	Restoran di Pangandaran · 1. Green Garden Cafe Paganderan. 4,9. (33 ulasan) · 2. Brillo Pizza. 4,4. (47 ulasan) · 3. Rasa Sayang. 4,0. (108 ulasan) · 4. Bamboo ...	Restoran	Pangandaran	Restoran di Pangandaran · 1. Green Garden Cafe Paganderan. 4,9. (33 ulasan) · 2. Brillo Pizza. 4,4. (47 ulasan) · 3. Rasa Sayang. 4,0. (108 ulasan) · 4. Bamboo ...	\N	https://www.tripadvisor.co.id/Restaurants-g1137814-Pangandaran_West_Java_Java.html	\N	\N	\N	\N	{https://serpapi.com/searches/695a7bae66bc78b0134f54a2/images/d89b794b1062e860e0eb14fef7bfe64db73e5b748b33c01a711a8b17fd227f5d.jpeg}	0	PUBLISHED	f	2026-01-04 14:39:45.677	2026-01-04 14:39:45.677
cmjzu8pow001asds81w1zxlz5	kulinerpangandaran_review	kulinerpangandaranreview	Review Kuliner di Pangandaran dengan view keindahan Pangandaran. 🏖️UMKM 🏖️ Jajanan 🏖️ Cafe 🏖️ Jalan2. Rekomendasi pingin ngemie Ayam siang2 sambil liat pantai ...	Restoran	Pangandaran	Review Kuliner di Pangandaran dengan view keindahan Pangandaran. 🏖️UMKM 🏖️ Jajanan 🏖️ Cafe 🏖️ Jalan2. Rekomendasi pingin ngemie Ayam siang2 sambil liat pantai ...	\N	https://www.instagram.com/kulinerpangandaran_review/	\N	\N	\N	\N	{}	0	PUBLISHED	f	2026-01-04 14:39:45.681	2026-01-04 14:39:45.681
cmjzu8pp0001bsds86n075pd6	Pondok Pangandaran, Green Ville	pondok-pangandaran-green-ville	Pondok Pangandaran, Green Ville · Ikan · Kepiting · Udang · Kerang · Cumi · Minuman · Soup · Scallop. Scallop bakar /Saus Padang. 40.000. Scallop Saus Tiram / ...	Restoran	Pangandaran	Pondok Pangandaran, Green Ville · Ikan · Kepiting · Udang · Kerang · Cumi · Minuman · Soup · Scallop. Scallop bakar /Saus Padang. 40.000. Scallop Saus Tiram / ...	\N	https://gofood.co.id/jakarta/restaurant/pondok-pangandaran-green-ville-939128af-b205-425d-ab34-6ec7d5add385	\N	\N	\N	\N	{}	0	PUBLISHED	f	2026-01-04 14:39:45.685	2026-01-04 14:39:45.685
cmjzu8pp4001csds8rxl1loym	10 Restoran Terbaik untuk Makan Siang di Pangandaran	10-restoran-terbaik-untuk-makan-siang-di-pangandaran	Restoran untuk Makan Siang di Pangandaran · 1. Green Garden Cafe Paganderan. 4,9. (33 ulasan) · 2. Rasa Sayang. 4,0. (108 ulasan). Makanan Laut, Asia$$ - $$$.	Restoran	Pangandaran	Restoran untuk Makan Siang di Pangandaran · 1. Green Garden Cafe Paganderan. 4,9. (33 ulasan) · 2. Rasa Sayang. 4,0. (108 ulasan). Makanan Laut, Asia$$ - $$$.	\N	https://www.tripadvisor.co.id/Restaurants-g1137814-zfp30-Pangandaran_West_Java_Java.html	\N	\N	\N	\N	{https://serpapi.com/searches/695a7bae66bc78b0134f54a2/images/d89b794b1062e860e0eb14fef7bfe64dc34a02464b6a8fbee762882cc822b80a.jpeg}	0	PUBLISHED	f	2026-01-04 14:39:45.688	2026-01-04 14:39:45.688
cmjzu8pp7001dsds8ukjr3h2m	Pondok Pangandaran - Kelapa Gading	pondok-pangandaran-kelapa-gading	Pondok Pangandaran, Jl. Boulevard Raya Blok QA 1 No. 22, Kelapa Gading, Jakarta. Find Pondok Pangandaran menu, photo, reviews, contact and location on ...	Restoran	Pangandaran	Pondok Pangandaran, Jl. Boulevard Raya Blok QA 1 No. 22, Kelapa Gading, Jakarta. Find Pondok Pangandaran menu, photo, reviews, contact and location on ...	\N	https://www.qraved.com/jakarta/pondok-pangandaran-kelapa-gading	\N	\N	\N	\N	{https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQJCcY4AfstHDLneGvjT6PYdPcZ41gVLO2WWqNR9Yxz6iXUKiXKg-1&usqp=CAE&s}	0	PUBLISHED	f	2026-01-04 14:39:45.692	2026-01-04 14:39:45.692
cmjzu8ppb001esds8b4fru6xj	RECOMMENDED DELICIOUS PLACES TO EAT IN ...	recommended-delicious-places-to-eat-in	Pangandaran untuk mencicipi berbagai tempat makan yang wajib dikunjungi. Pangandaran bukan hanya terkenal dengan keindahan pantainya, ...	Restoran	Pangandaran	Pangandaran untuk mencicipi berbagai tempat makan yang wajib dikunjungi. Pangandaran bukan hanya terkenal dengan keindahan pantainya, ...	\N	https://www.youtube.com/watch?v=JFjqmjRn2yA	\N	\N	\N	\N	{https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeFbGfTTEx4dy0RTPLuhk8cWkmrUlhjpfKhSU4dONiALHAnFEu_q1QMg&s}	0	PUBLISHED	f	2026-01-04 14:39:45.695	2026-01-04 14:39:45.695
cmjzu8ppe001fsds8n38u04id	15 Tempat Makan Enak di Sekitar Pangandaran, Banyak ...	15-tempat-makan-enak-di-sekitar-pangandaran-banyak	15 Tempat Makan Enak di Sekitar Pangandaran, Banyak Hidangan Laut · 1. Soto Jarkomi · 2. Pasar Ikan Pangandaran · 3. Rumah Makan Karya Bahari · 4.	Restoran	Pangandaran	15 Tempat Makan Enak di Sekitar Pangandaran, Banyak Hidangan Laut · 1. Soto Jarkomi · 2. Pasar Ikan Pangandaran · 3. Rumah Makan Karya Bahari · 4.	\N	https://www.kompas.com/food/read/2021/03/14/093200275/15-tempat-makan-enak-di-sekitar-pangandaran-banyak-hidangan-laut	\N	\N	\N	\N	{https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ42EqEk3QKI9GeIcXVqWujOuhFhQ24r64Ic6TXYmM3tSXV0-pbMKtP&usqp=CAE&s}	0	PUBLISHED	f	2026-01-04 14:39:45.698	2026-01-04 14:39:45.698
cmjzu8ppi001gsds8i8kgrloj	Kampung Turis	kampung-turis	Restoran kampung turis · Pamugaran Lounge · Minasari Fresh Seafood Pangandaran · Satu Restoe - Eat & Dine · Bamboo Cafe n Resto · RM Tirta Bahari · RM Mina Family · RM ...	Restoran	Pangandaran	Restoran kampung turis · Pamugaran Lounge · Minasari Fresh Seafood Pangandaran · Satu Restoe - Eat & Dine · Bamboo Cafe n Resto · RM Tirta Bahari · RM Mina Family · RM ...	\N	https://tour.mypangandaran.com/kampungturis	\N	\N	\N	\N	{https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROWoEL44Q79x_oGFKKxmRzvggdTtr7c0N-GGTO765JT9te6HZSwIvj&usqp=CAE&s}	0	PUBLISHED	f	2026-01-04 14:39:45.702	2026-01-04 14:39:45.702
cmk55bp900018d0k4jpg3p8vy	7 Tempat Makan Murah, Enak dan Terkenal di ...	7-tempat-makan-murah-enak-dan-terkenal-di	Rasa Sayang Seafood adalah salah satu restoran seafood enak dan menggugah selera di Pangandaran. Restoran ini menawarkan berbagai hidangan ...	Restoran	Pangandaran	Rasa Sayang Seafood adalah salah satu restoran seafood enak dan menggugah selera di Pangandaran. Restoran ini menawarkan berbagai hidangan ...	\N	https://galamedia.pikiran-rakyat.com/pariwisata/pr-358257043/7-tempat-makan-murah-enak-dan-terkenal-di-pangandaran-yang-banyak-diserbu-wisatawan?page=all	\N	\N	\N	\N	{https://serpapi.com/searches/695f61616561a678e357cce0/images/d89b794b1062e860e0eb14fef7bfe64dc34a02464b6a8fbee762882cc822b80a.jpeg}	0	PUBLISHED	f	2026-01-08 07:48:51.733	2026-01-08 07:48:51.733
\.


--
-- Data for Name: otp_verifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.otp_verifications (id, email, code, type, "expiresAt", verified, "createdAt", "userId") FROM stdin;
\.


--
-- Data for Name: profil_ukm; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profil_ukm (id, "namaUsaha", slug, deskripsi, kategori, pemilik, lokasi, alamat, koordinat, "nomorTelepon", email, instagram, facebook, whatsapp, website, logo, gambar, "produkLayanan", "hargaRata", "jamOperasional", status, featured, verified, "createdAt", "updatedAt", "createdBy") FROM stdin;
cmk6a0wu90004sen52m22bx3k	Kios Asin Jambal Roti Anugrah 2	kios-asin-jambal-roti-anugrah-2	-	Kerajinan	Bpk. H. Ade Dindin 	PANGANDARAN TIMUR	Jln. cagar alam pantai timur, pangandaran 	\N	082116855035	\N	Tiktok Anugrah.Jambal	\N	082116855035	\N	\N	{}	{"Asin Jambal Roti, ikan teri, terasi udang, kerupuk udang dll"}	120-150 (Jambal) , 120/Kg (Ikan teri)	Senin- Minggu 06.00-20.00 WIN	DRAFT	f	f	2026-01-09 02:48:12.608	2026-01-09 02:48:12.608	cmjzrwwip000032kykh70aw25
cmk6apbk70006sen53xpew8ey	Jual Ikan Segar 	jual-ikan-segar	n	Kerajinan	Ibu Sakinem 	pangandaran timur	p	\N	\N	\N	\N	\N	\N	\N	\N	{}	{}	25-250/kg	tiap hari 7-6sore 	DRAFT	f	f	2026-01-09 03:07:11.432	2026-01-09 11:11:57.31	cmjzrwwip000032kykh70aw25
cmk92saup0005138uyo91bre9	Oasis	oasis	Usaha Oasis merupakan UMKM yang bergerak di bidang aksesoris, kerajinan tangan, dan dekorasi interior maupun eksterior, dimiliki oleh Agus Kurniawan. Usaha ini berawal dari Yogyakarta sejak tahun 1970-an dan mulai berkembang di Pangandaran pada awal tahun 2024. Oasis melayani penjualan ritel, grosir, serta pesanan khusus (made to order) dengan jangkauan pemasaran hingga Bali, Yogyakarta, dan luar negeri. Produk yang ditawarkan meliputi berbagai kerajinan tangan dan aksesoris bernilai seni, dengan mengusung semangat “Dari Jogja Indonesia Untuk Dunia”.	Kerajinan	Agus Kurniawan	Pangandaran Barat	Jalan Kidang Pananjung No 172 Pangandaran 46396 Pangandaran	\N	087884929090	oasisgudang@gmail.com	@oasis_group	\N	082136844774	http://www.oasispego.com/	\N	{}	{"Aksesoris, hiasan dinding, patung kayu, cermin, alat makan kayu, dll"}	15.000 - 1.500.000	 08.00-21.00	PUBLISHED	f	f	2026-01-11 01:48:52.079	2026-01-11 01:53:10.225	cmjzrwwip000032kykh70aw25
cmk93450f0007138uc8hnlnvp	MS Maya Surman	ms-maya-surman	Usaha MS Maya Surman merupakan UMKM di bidang fashion milik Diana Witarsih yang telah beroperasi sejak tahun 2012. Usaha ini memproduksi sendiri berbagai produk fashion anak dan dewasa dengan dukungan konveksi milik sendiri, sehingga kualitas dan ketersediaan produk dapat terjaga. MS Maya Surman menyediakan pilihan ukuran hingga 3XL dan melayani pembayaran secara tunai maupun transfer. Produk dipasarkan dengan kisaran harga Rp12.000–Rp125.000. Kegiatan usaha berlokasi di Jl. Kidang Pananjung No. 215, Pangandaran, dengan jam operasional pukul 06.30–21.00 WIB, serta akhir pekan hingga pukul 23.00 WIB.	Fashion	Diana witarsih	Pangandaran Barat	Jl. Kidang Pananjung No.215, Pangandaran, Kec. Pangandaran, Kab. Pangandaran, Jawa Barat 46396	\N	\N	mayasurmancolection24@gmail.com	@maya_surman_collection_pnd	\N	082213187969	\N	\N	{}	{"Baju dan Celana"}	12.000-125.000	Weekday 06.30 - 21.00 Weekend 06.30-23.00	PUBLISHED	f	f	2026-01-11 01:58:04.384	2026-01-11 01:58:04.384	cmjzrwwip000032kykh70aw25
\.


--
-- Data for Name: rekomendasi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rekomendasi (id, judul, slug, deskripsi, tema, durasi, "estimasiBudget", "destinasiIds", "gambarUtama", status, featured, urutan, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.settings (id, key, value, description, "updatedAt") FROM stdin;
cmjzvq4i4001xsds891l2k8n7	site_email	237006079@student.unsil.ac.id	Email kontak utama	2026-01-04 15:21:30.468
cmjzvq4i4001wsds867amtd0x	site_about	Portal informasi wisata Pangandaran hasil kolaborasi dengan KKN 126. Menjelajahi keindahan Pangandaran, dari pantai hingga budaya lokal.	Deskripsi tentang Pangandaran	2026-01-04 15:21:30.468
cmjzvq4ik0020sds8m74vyl7p	social_twitter		Link Twitter	2026-01-04 15:21:30.468
cmjzvq4io0022sds8iy574uxf	social_instagram		Link Instagram	2026-01-04 15:21:30.468
cmjzvq4ii001ysds8fiuq57xa	site_phone	0895352281010	Nomor telepon kontak	2026-01-04 15:21:30.468
cmjzvq4ik001zsds87kufnvlq	social_facebook		Link Facebook	2026-01-04 15:21:30.468
cmjzvq4io0021sds8eqrxiykt	social_youtube		Link YouTube	2026-01-04 15:21:30.468
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "googleId", "createdAt", "updatedAt", "isVerified") FROM stdin;
cmjzs8elw000011ejubo4lywn	FAJAR GERAN ARIFIN 237006079	237006079@student.unsil.ac.id	\N	102136693535766217690	2026-01-04 13:43:32.084	2026-01-04 13:43:32.084	f
cmjzvswd3002hsds8rq4l7k5w	fast potato	cringekntl@gmail.com	\N	115827798673154585716	2026-01-04 15:23:27.062	2026-01-04 15:23:27.062	f
cmk0kl2qe002ksds8ufv2krwv	Reva Riyantika 237006037	237006037@student.unsil.ac.id	\N	105521401666191134726	2026-01-05 02:57:12.469	2026-01-06 13:04:25.907	f
cmk55nne90019d0k4xff2bm5i	over flow	geranuser@gmail.com	\N	112699173910367701972	2026-01-08 07:58:09.201	2026-01-08 07:58:09.201	f
cmk671drp0002sen54xhnhc71	fauzi	test@gmail.com	$2b$10$2tqOoLong2RImiUenT26/O18saZ67NcVwnsTRL4Z3unfTNXJe5gIi	\N	2026-01-09 01:24:35.7	2026-01-09 01:24:35.7	f
cmk6rd5lz0001138usmf2rsak	kang fadil	fadilns110505@gmail.com	$2b$10$zom8VQeuhGZh899NR3XGgOShrpxiXcvuXaJ1DqPq3R8NiD1a8JUb.	\N	2026-01-09 10:53:37.32	2026-01-09 10:53:37.32	t
\.


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: berita berita_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.berita
    ADD CONSTRAINT berita_pkey PRIMARY KEY (id);


--
-- Name: destinasi_detail destinasi_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinasi_detail
    ADD CONSTRAINT destinasi_detail_pkey PRIMARY KEY (id);


--
-- Name: destinasi_harga destinasi_harga_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinasi_harga
    ADD CONSTRAINT destinasi_harga_pkey PRIMARY KEY (id);


--
-- Name: destinasi_images destinasi_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinasi_images
    ADD CONSTRAINT destinasi_images_pkey PRIMARY KEY (id);


--
-- Name: destinasi destinasi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinasi
    ADD CONSTRAINT destinasi_pkey PRIMARY KEY (id);


--
-- Name: destinasi_reviews destinasi_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinasi_reviews
    ADD CONSTRAINT destinasi_reviews_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: galeri galeri_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galeri
    ADD CONSTRAINT galeri_pkey PRIMARY KEY (id);


--
-- Name: hotel_listings hotel_listings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotel_listings
    ADD CONSTRAINT hotel_listings_pkey PRIMARY KEY (id);


--
-- Name: informasi_umum informasi_umum_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.informasi_umum
    ADD CONSTRAINT informasi_umum_pkey PRIMARY KEY (id);


--
-- Name: kuliner kuliner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kuliner
    ADD CONSTRAINT kuliner_pkey PRIMARY KEY (id);


--
-- Name: otp_verifications otp_verifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp_verifications
    ADD CONSTRAINT otp_verifications_pkey PRIMARY KEY (id);


--
-- Name: profil_ukm profil_ukm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profil_ukm
    ADD CONSTRAINT profil_ukm_pkey PRIMARY KEY (id);


--
-- Name: rekomendasi rekomendasi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rekomendasi
    ADD CONSTRAINT rekomendasi_pkey PRIMARY KEY (id);


--
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: admins_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX admins_email_key ON public.admins USING btree (email);


--
-- Name: admins_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX admins_username_key ON public.admins USING btree (username);


--
-- Name: berita_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX berita_slug_key ON public.berita USING btree (slug);


--
-- Name: destinasi_reviews_destinasiId_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "destinasi_reviews_destinasiId_userId_key" ON public.destinasi_reviews USING btree ("destinasiId", "userId");


--
-- Name: destinasi_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX destinasi_slug_key ON public.destinasi USING btree (slug);


--
-- Name: events_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX events_slug_key ON public.events USING btree (slug);


--
-- Name: hotel_listings_fetchedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "hotel_listings_fetchedAt_idx" ON public.hotel_listings USING btree ("fetchedAt");


--
-- Name: informasi_umum_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX informasi_umum_slug_key ON public.informasi_umum USING btree (slug);


--
-- Name: kuliner_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX kuliner_slug_key ON public.kuliner USING btree (slug);


--
-- Name: otp_verifications_email_code_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX otp_verifications_email_code_idx ON public.otp_verifications USING btree (email, code);


--
-- Name: otp_verifications_expiresAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "otp_verifications_expiresAt_idx" ON public.otp_verifications USING btree ("expiresAt");


--
-- Name: profil_ukm_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX profil_ukm_slug_key ON public.profil_ukm USING btree (slug);


--
-- Name: rekomendasi_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX rekomendasi_slug_key ON public.rekomendasi USING btree (slug);


--
-- Name: settings_key_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX settings_key_key ON public.settings USING btree (key);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_googleId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "users_googleId_key" ON public.users USING btree ("googleId");


--
-- Name: berita berita_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.berita
    ADD CONSTRAINT "berita_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: destinasi destinasi_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinasi
    ADD CONSTRAINT "destinasi_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: destinasi_detail destinasi_detail_destinasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinasi_detail
    ADD CONSTRAINT "destinasi_detail_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES public.destinasi(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: destinasi_harga destinasi_harga_destinasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinasi_harga
    ADD CONSTRAINT "destinasi_harga_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES public.destinasi(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: destinasi_images destinasi_images_destinasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinasi_images
    ADD CONSTRAINT "destinasi_images_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES public.destinasi(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: destinasi_reviews destinasi_reviews_destinasiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinasi_reviews
    ADD CONSTRAINT "destinasi_reviews_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES public.destinasi(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: destinasi_reviews destinasi_reviews_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinasi_reviews
    ADD CONSTRAINT "destinasi_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: events events_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "events_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: galeri galeri_uploadedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.galeri
    ADD CONSTRAINT "galeri_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: informasi_umum informasi_umum_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.informasi_umum
    ADD CONSTRAINT "informasi_umum_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: otp_verifications otp_verifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp_verifications
    ADD CONSTRAINT "otp_verifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: profil_ukm profil_ukm_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profil_ukm
    ADD CONSTRAINT "profil_ukm_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public.admins(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict oiPV9Xe8OBEmv1kka3CaWCESUcNUeRdCpk2HHP0tYLNBp2r2IVdhEt9hNXMjKt1

