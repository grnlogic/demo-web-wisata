import nodemailer from "nodemailer";

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOtpEmail(email: string, otp: string, type: "register" | "login") {
  const subject = type === "register"
    ? "Verifikasi Email Anda - Wisata Pangandaran"
    : "Kode OTP Login Anda - Wisata Pangandaran";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
            padding: 40px;
            color: white;
          }
          .logo {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
          }
          .content {
            background: white;
            color: #333;
            border-radius: 8px;
            padding: 30px;
            margin-top: 20px;
          }
          .otp-box {
            background: #f7fafc;
            border: 2px dashed #667eea;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 30px 0;
          }
          .otp-code {
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #667eea;
            margin: 10px 0;
          }
          .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: white;
            color: #667eea;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <h1>🏖️ Wisata Pangandaran</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Portal Wisata Terpercaya</p>
          </div>
          
          <div class="content">
            <h2 style="color: #667eea; margin-top: 0;">
              ${type === "register" ? "Selamat Datang! 👋" : "Kode Verifikasi Login 🔐"}
            </h2>
            
            <p>
              ${type === "register"
      ? "Terima kasih telah mendaftar di Wisata Pangandaran. Untuk melanjutkan, silakan verifikasi email Anda dengan memasukkan kode OTP berikut:"
      : "Anda telah meminta untuk login ke akun Wisata Pangandaran. Gunakan kode OTP berikut untuk melanjutkan:"}
            </p>

            <div class="otp-box">
              <p style="margin: 0; font-size: 14px; color: #666;">Kode OTP Anda</p>
              <div class="otp-code">${otp}</div>
              <p style="margin: 0; font-size: 12px; color: #999;">Berlaku selama 10 menit</p>
            </div>

            <div class="warning">
              <strong>⚠️ Penting:</strong>
              <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                <li>Jangan bagikan kode ini kepada siapapun</li>
                <li>Kode akan kadaluarsa dalam 10 menit</li>
                <li>Abaikan email ini jika Anda tidak merasa melakukan ${type === "register" ? "registrasi" : "login"}</li>
              </ul>
            </div>

            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Butuh bantuan? Hubungi kami di <a href="mailto:support@wisatapangandaran.com" style="color: #667eea;">support@wisatapangandaran.com</a>
            </p>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} Wisata Pangandaran. All rights reserved.</p>
            <p style="font-size: 12px; margin-top: 10px;">
              Email ini dikirim otomatis, mohon tidak membalas email ini.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
${type === "register" ? "Selamat Datang di Wisata Pangandaran!" : "Kode Verifikasi Login Anda"}

Kode OTP Anda: ${otp}

Kode ini berlaku selama 10 menit.
Jangan bagikan kode ini kepada siapapun.

Jika Anda tidak merasa melakukan ${type === "register" ? "registrasi" : "login"}, abaikan email ini.

---
Wisata Pangandaran
Portal Wisata Terpercaya
  `;

  try {
    await transporter.sendMail({
      from: `"Wisata Pangandaran" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

export async function sendGalleryApprovedEmail(email: string, userName: string, count: number) {
  const subject = " Foto Galeri Anda Telah Disetujui! 📸 - Wisata Pangandaran";
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #667eea; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { border: 1px solid #ddd; padding: 20px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Selamat! 🎉</h1>
          </div>
          <div class="content">
            <p>Halo ${userName},</p>
            <p>Kami punya kabar gembira! <strong>${count} foto</strong> yang Anda upload ke Galeri Wisata Pangandaran telah disetujui oleh admin.</p>
            <p>Foto-foto tersebut kini dapat dilihat oleh publik dan akan membantu wisatawan lain melihat keindahan Pangandaran.</p>
            <p>Terima kasih atas kontribusi Anda!</p>
            <a href="${process.env.NEXTAUTH_URL}/galeri" class="button">Lihat Galeri</a>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Wisata Pangandaran" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending approval email:", error);
    return { success: false, error };
  }
}

// Generate 6-digit OTP
export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
