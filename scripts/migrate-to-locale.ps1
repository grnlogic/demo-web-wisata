# Script untuk memindahkan halaman ke struktur [locale]

Write-Host "Memindahkan halaman ke folder [locale]..." -ForegroundColor Cyan

$appPath = "d:\Coding\wisata_pangandaran\app"
$localePath = "$appPath\[locale]"

# Daftar folder yang perlu dipindahkan
$folders = @(
    "akomodasi",
    "berita",
    "destinasi",
    "event",
    "faq",
    "galeri",
    "kuliner",
    "privacy",
    "rekomendasi",
    "tentang",
    "tentang-kkn",
    "terms",
    "tips",
    "transportasi",
    "ukm"
)

foreach ($folder in $folders) {
    $sourcePath = "$appPath\$folder"
    $destPath = "$localePath\$folder"
    
    if (Test-Path $sourcePath) {
        Write-Host "Memindahkan $folder..." -ForegroundColor Yellow
        
        # Buat folder tujuan jika belum ada
        if (-not (Test-Path $localePath)) {
            New-Item -ItemType Directory -Path $localePath -Force | Out-Null
        }
        
        # Pindahkan folder
        if (Test-Path $destPath) {
            Write-Host "  Folder $folder sudah ada di [locale], melewati..." -ForegroundColor Gray
        } else {
            Move-Item -Path $sourcePath -Destination $destPath -Force
            Write-Host "  ✓ $folder dipindahkan" -ForegroundColor Green
        }
    } else {
        Write-Host "  Folder $folder tidak ditemukan, melewati..." -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Selesai! Semua halaman telah dipindahkan ke struktur [locale]" -ForegroundColor Green
Write-Host "Catatan: Anda perlu update semua Link href dan tambahkan useTranslations di setiap halaman" -ForegroundColor Yellow
