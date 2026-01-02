import {
  BarChart3,
  MapPin,
  Calendar,
  Image,
  TrendingUp,
  Users,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Selamat Datang di Admin Dashboard
        </h1>
        <p className="text-white/90">
          Kelola konten wisata Pangandaran dengan mudah dan efisien
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold ${stat.changeColor}`}
              >
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="flex items-center space-x-4 p-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-600">{action.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Aktivitas Terbaru
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 pb-4 border-b border-slate-100 last:border-0"
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${activity.gradient} flex items-center justify-center flex-shrink-0`}
                >
                  <activity.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">
                    {activity.action}
                  </p>
                  <p className="text-sm text-slate-600">{activity.item}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Destinasi Populer
          </h2>
          <div className="space-y-4">
            {popularDestinations.map((dest, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold text-slate-300">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{dest.name}</p>
                    <p className="text-sm text-slate-600">{dest.views} views</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-600">
                    {dest.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  {
    icon: MapPin,
    label: "Total Destinasi",
    value: "25",
    change: "+3 bulan ini",
    changeColor: "bg-green-100 text-green-700",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Calendar,
    label: "Event Aktif",
    value: "8",
    change: "5 upcoming",
    changeColor: "bg-blue-100 text-blue-700",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Image,
    label: "Galeri Foto",
    value: "543",
    change: "+127 bulan ini",
    changeColor: "bg-green-100 text-green-700",
    gradient: "from-pink-500 to-pink-600",
  },
  {
    icon: Users,
    label: "Pengunjung",
    value: "12.4K",
    change: "+18% bulan ini",
    changeColor: "bg-green-100 text-green-700",
    gradient: "from-orange-500 to-orange-600",
  },
];

const quickActions = [
  {
    icon: MapPin,
    title: "Tambah Destinasi",
    description: "Buat destinasi baru",
    href: "/admin/destinasi/create",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Calendar,
    title: "Buat Event",
    description: "Tambah event/agenda",
    href: "/admin/event/create",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Image,
    title: "Upload Galeri",
    description: "Tambah foto/video",
    href: "/admin/galeri/create",
    gradient: "from-pink-500 to-pink-600",
  },
];

const recentActivities = [
  {
    icon: MapPin,
    action: "Destinasi ditambahkan",
    item: "Pantai Batu Karas",
    time: "2 jam yang lalu",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Calendar,
    action: "Event dipublikasi",
    item: "Festival Pantai Pangandaran 2026",
    time: "5 jam yang lalu",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Image,
    action: "Galeri diupdate",
    item: "15 foto baru ditambahkan",
    time: "1 hari yang lalu",
    gradient: "from-pink-500 to-pink-600",
  },
];

const popularDestinations = [
  { name: "Pantai Pasir Putih", views: "8.2K", growth: "+24%" },
  { name: "Green Canyon", views: "6.8K", growth: "+18%" },
  { name: "Cagar Alam Pananjung", views: "5.4K", growth: "+12%" },
  { name: "Batu Hiu", views: "4.9K", growth: "+15%" },
  { name: "Kampung Turis", views: "3.7K", growth: "+8%" },
];
