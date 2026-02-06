# Setup GitHub Fine-grained PAT di Ubuntu

## ⚠️ Keamanan: Token yang pernah diketik di chat harus dicabut

1. Buka: https://github.com/settings/tokens?type=beta  
2. Cari token yang baru saja dipakai, klik **Delete** / **Revoke**  
3. Buat token baru (Fine-grained) dan **jangan** membagikan ke siapa pun / jangan paste di chat

---

## Cara pakai token di Ubuntu (HTTPS)

### Opsi 1: Disimpan sekali, dipakai selamanya (disarankan)

1. **Simpan kredensial di penyimpanan aman:**
   ```bash
   git config --global credential.helper store
   ```
   (Untuk sekali pakai saja bisa pakai `cache` dengan timeout, misalnya:  
   `git config --global credential.helper 'cache --timeout=3600'`)

2. **Push seperti biasa:**
   ```bash
   cd ~/Documents/demo-web-wisata
   git push origin main
   ```
   Saat diminta:
   - **Username:** `grnlogic` (atau username GitHub Anda)
   - **Password:** **tempel token baru** (bukan password akun GitHub)

   Setelah itu, token tersimpan di `~/.git-credentials` dan push berikutnya tidak perlu isi lagi.

---

### Opsi 2: Remote URL pakai token (hanya untuk sementara)

Ganti `YOUR_NEW_TOKEN` dengan token baru yang Anda buat:

```bash
cd ~/Documents/demo-web-wisata
git remote set-url origin https://grnlogic:YOUR_NEW_TOKEN@github.com/grnlogic/demo-web-wisata.git
git push origin main
```

Setelah berhasil, sebaiknya kembalikan URL tanpa token:

```bash
git remote set-url origin https://github.com/grnlogic/demo-web-wisata.git
```

Lalu pakai Opsi 1 (credential helper) agar token tidak terbaca di `git config`.

---

## Buat Fine-grained PAT baru

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**  
2. **Generate new token**  
3. **Resource owner:** akun Anda  
4. **Repository access:** pilih repo `grnlogic/demo-web-wisata` (atau All repositories)  
5. **Permissions:** Repository → **Contents** = Read and write, **Metadata** = Read  
6. Generate, **copy token sekali** (hanya tampil satu kali), lalu pakai sebagai “password” saat `git push` (Opsi 1) atau ganti di URL (Opsi 2).

---

## Cek remote saat ini

```bash
git remote -v
```

Harus mengarah ke `https://github.com/grnlogic/demo-web-wisata.git` (atau repo Anda).

---

## Troubleshooting: 403 Permission denied

Kalau muncul `remote: Permission to grnlogic/demo-web-wisata.git denied` / `error: 403`:

### 1. Pastikan token punya akses ke repo ini

- Buka: https://github.com/settings/tokens?type=beta  
- Klik nama token yang dipakai → **Repository access**
- Harus: **"All repositories"** ATAU **"Only select repositories"** dengan **demo-web-wisata** dicentang.
- Kalau repo tidak masuk daftar, edit token → tambahkan repo ini → **Save**.

### 2. Pastikan permission "Contents" = Read and write

Di halaman token yang sama:

- **Repository permissions**
  - **Contents** = **Read and write** (wajib untuk push)
  - **Metadata** = **Read** (otomatis)

Tanpa **Contents: Read and write**, push akan 403.

### 3. Hapus kredensial lama lalu coba lagi

Mungkin Git masih pakai password/token lama yang salah:

```bash
# Hapus kredensial tersimpan untuk GitHub
git credential reject <<EOF
protocol=https
host=github.com
EOF
```

Lalu push lagi; saat diminta password, paste **token baru** (bukan password akun):

```bash
git push origin main
```

### 4. Cek kepemilikan repo

- Repo ini harus milik akun **grnlogic** (atau organisasi tempat Anda punya akses push).
- Kalau repo milik organisasi, token bisa jadi harus dipakai dengan username organisasi atau token dari organisasi — pastikan Anda punya role **Write**/Admin di repo.
