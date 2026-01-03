"use client";

import {
  Settings as SettingsIcon,
  Save,
  User,
  Lock,
  Bell,
  UserPlus,
  Trash2,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface Admin {
  id: string;
  username: string;
  nama: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSettingsPage() {
  const { data: session, update } = useSession();

  // Profile state
  const [profile, setProfile] = useState({
    nama: "",
    email: "",
  });
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password state
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Admin management state
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    password: "",
    nama: "",
    email: "",
  });
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);

  // Alert state
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  // Fetch user profile
  useEffect(() => {
    fetchProfile();
    fetchAdmins();
  }, []);

  const fetchProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const res = await fetch("/api/admin/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile({
          nama: data.nama,
          email: data.email,
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const fetchAdmins = async () => {
    setIsLoadingAdmins(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setAdmins(data);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setIsLoadingAdmins(false);
    }
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ show: true, type, message });
    setTimeout(
      () => setAlert({ show: false, type: "success", message: "" }),
      5000
    );
  };

  const handleSaveProfile = async () => {
    if (!profile.nama || !profile.email) {
      showAlert("error", "Nama dan email harus diisi");
      return;
    }

    setIsSavingProfile(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();

      if (res.ok) {
        showAlert("success", "Profil berhasil diperbarui");
        await update(); // Update session
      } else {
        showAlert("error", data.error || "Gagal memperbarui profil");
      }
    } catch (error) {
      showAlert("error", "Terjadi kesalahan saat memperbarui profil");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (
      !passwords.oldPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      showAlert("error", "Semua field password harus diisi");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      showAlert("error", "Password baru dan konfirmasi tidak cocok");
      return;
    }

    if (passwords.newPassword.length < 6) {
      showAlert("error", "Password baru minimal 6 karakter");
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showAlert("success", "Password berhasil diubah");
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        showAlert("error", data.error || "Gagal mengubah password");
      }
    } catch (error) {
      showAlert("error", "Terjadi kesalahan saat mengubah password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleCreateAdmin = async () => {
    if (
      !newAdmin.username ||
      !newAdmin.password ||
      !newAdmin.nama ||
      !newAdmin.email
    ) {
      showAlert("error", "Semua field harus diisi");
      return;
    }

    if (newAdmin.password.length < 6) {
      showAlert("error", "Password minimal 6 karakter");
      return;
    }

    setIsCreatingAdmin(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });

      const data = await res.json();

      if (res.ok) {
        showAlert("success", "Admin baru berhasil dibuat");
        setNewAdmin({ username: "", password: "", nama: "", email: "" });
        setShowAddAdmin(false);
        fetchAdmins();
      } else {
        showAlert("error", data.error || "Gagal membuat admin baru");
      }
    } catch (error) {
      showAlert("error", "Terjadi kesalahan saat membuat admin baru");
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus admin ini?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        showAlert("success", "Admin berhasil dihapus");
        fetchAdmins();
      } else {
        showAlert("error", data.error || "Gagal menghapus admin");
      }
    } catch (error) {
      showAlert("error", "Terjadi kesalahan saat menghapus admin");
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert */}
      {alert.show && (
        <div
          className={`p-4 rounded-lg ${
            alert.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Pengaturan</h1>
        <p className="text-slate-600 mt-1">
          Kelola pengaturan akun dan preferensi
        </p>
      </div>

      {/* Current User Info */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {session?.user?.name || "Administrator"}
            </h3>
            <p className="text-blue-100">
              @{session?.user?.username || "admin"}
            </p>
            <p className="text-sm text-blue-100 mt-1">
              {session?.user?.email || "admin@wisatapangandaran.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Profil Admin</h3>
        </div>

        {isLoadingProfile ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                  value={session?.user?.username || "admin"}
                  disabled
                />
                <p className="text-xs text-slate-500 mt-1">
                  Username tidak dapat diubah
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={profile.nama}
                  onChange={(e) =>
                    setProfile({ ...profile, nama: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveProfile}
                disabled={isSavingProfile}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSavingProfile ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span>
                  {isSavingProfile ? "Menyimpan..." : "Simpan Profil"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <Lock className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">
            Ubah Password
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password Lama
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan password lama"
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password Baru
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan password baru"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Konfirmasi password baru"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleChangePassword}
              disabled={isChangingPassword}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChangingPassword ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
              <span>
                {isChangingPassword ? "Mengubah..." : "Ubah Password"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Management */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Manajemen Admin
              </h3>
              <p className="text-sm text-slate-600">
                Kelola akun admin yang memiliki akses ke sistem
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddAdmin(!showAddAdmin)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah Admin</span>
          </button>
        </div>

        {/* Add Admin Form */}
        {showAddAdmin && (
          <div className="mb-6 p-4 border border-purple-200 rounded-lg bg-purple-50">
            <h4 className="font-semibold text-slate-800 mb-4">
              Tambah Admin Baru
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Username"
                  value={newAdmin.username}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Password (min. 6 karakter)"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Nama Lengkap"
                  value={newAdmin.nama}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, nama: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowAddAdmin(false);
                  setNewAdmin({
                    username: "",
                    password: "",
                    nama: "",
                    email: "",
                  });
                }}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleCreateAdmin}
                disabled={isCreatingAdmin}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreatingAdmin ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                <span>{isCreatingAdmin ? "Membuat..." : "Buat Admin"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Admin List */}
        {isLoadingAdmins ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                    Username
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                    Nama
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                    Dibuat
                  </th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-slate-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-slate-800">
                          @{admin.username}
                        </span>
                        {admin.id === session?.user?.id && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Anda
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{admin.nama}</td>
                    <td className="px-4 py-3 text-slate-600">{admin.email}</td>
                    <td className="px-4 py-3 text-slate-600 text-sm">
                      {new Date(admin.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        {admin.id !== session?.user?.id && (
                          <button
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus Admin"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {admins.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                Belum ada admin terdaftar
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Notifikasi</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800">Email Notifikasi</p>
              <p className="text-sm text-slate-600">
                Terima notifikasi via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800">Notifikasi Komentar</p>
              <p className="text-sm text-slate-600">
                Notifikasi saat ada komentar baru
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
