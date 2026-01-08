import { Shield, Mail, Clock, Eye, Lock, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Pangandaran Tourism Portal",
  description: "Privacy Policy for Pangandaran Tourism Portal",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-40 blur-3xl" aria-hidden>
          <div className="absolute -top-24 -left-10 h-64 w-64 rounded-full bg-blue-500/20" />
          <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-cyan-400/15" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur mb-6">
            <Shield className="h-4 w-4" />
            Legal Information
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Clock className="w-4 h-4" />
            <span>Last updated: January 08, 2026</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-slate max-w-none">
            {/* Introduction */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur shadow-lg mb-8">
              <p className="text-white/80 leading-relaxed mb-4">
                This Privacy Policy describes Our policies and procedures on the
                collection, use and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You.
              </p>
              <p className="text-white/80 leading-relaxed">
                We use Your Personal data to provide and improve the Service. By
                using the Service, You agree to the collection and use of
                information in accordance with this Privacy Policy.
              </p>
            </div>

            {/* Interpretation and Definitions */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-cyan-400" />
                  Interpretation and Definitions
                </h2>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Interpretation
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-6">
                    The words whose initial letters are capitalized have
                    meanings defined under the following conditions. The
                    following definitions shall have the same meaning regardless
                    of whether they appear in singular or in plural.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    Definitions
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-4">
                    For the purposes of this Privacy Policy:
                  </p>
                  <ul className="space-y-3 text-white/70">
                    <li>
                      <strong className="text-white">Account</strong> means a
                      unique account created for You to access our Service or
                      parts of our Service.
                    </li>
                    <li>
                      <strong className="text-white">Affiliate</strong> means an
                      entity that controls, is controlled by, or is under common
                      control with a party.
                    </li>
                    <li>
                      <strong className="text-white">Company</strong> (referred
                      to as either "the Company", "We", "Us" or "Our") refers to
                      Pangandaran, Pananjung, Kab. Pangandaran, Jawa Barat.
                    </li>
                    <li>
                      <strong className="text-white">Cookies</strong> are small
                      files placed on Your device by a website, containing
                      browsing history details.
                    </li>
                    <li>
                      <strong className="text-white">Country</strong> refers to:
                      Indonesia
                    </li>
                    <li>
                      <strong className="text-white">Device</strong> means any
                      device that can access the Service such as a computer,
                      cell phone or digital tablet.
                    </li>
                    <li>
                      <strong className="text-white">Personal Data</strong> is
                      any information that relates to an identified or
                      identifiable individual.
                    </li>
                    <li>
                      <strong className="text-white">Service</strong> refers to
                      the Website.
                    </li>
                    <li>
                      <strong className="text-white">Usage Data</strong> refers
                      to data collected automatically from use of the Service.
                    </li>
                    <li>
                      <strong className="text-white">Website</strong> refers to
                      Pangandaran Tourism Portal, accessible from this domain.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Collecting Data */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-emerald-400" />
                  Collecting and Using Your Personal Data
                </h2>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Personal Data
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-3">
                      While using Our Service, We may ask You to provide certain
                      personally identifiable information that can be used to
                      contact or identify You. This may include:
                    </p>
                    <ul className="space-y-2 text-white/70 list-disc list-inside">
                      <li>Email address</li>
                      <li>First name and last name</li>
                      <li>Phone number</li>
                      <li>Address, State, Province, ZIP/Postal code, City</li>
                      <li>Usage Data</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Usage Data
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-3">
                      Usage Data is collected automatically when using the
                      Service. This may include information such as:
                    </p>
                    <ul className="space-y-2 text-white/70 list-disc list-inside">
                      <li>
                        Your Device's Internet Protocol address (IP address)
                      </li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent</li>
                      <li>Unique device identifiers</li>
                      <li>Mobile device information</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-amber-400" />
                  Tracking Technologies and Cookies
                </h2>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <p className="text-white/70 leading-relaxed mb-4">
                    We use Cookies and similar tracking technologies to track
                    activity on Our Service. Technologies we use include:
                  </p>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <h4 className="font-semibold text-white mb-2">
                        Necessary / Essential Cookies
                      </h4>
                      <p className="text-sm text-white/70">
                        Session Cookies essential to provide services and
                        authenticate users.
                      </p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <h4 className="font-semibold text-white mb-2">
                        Functionality Cookies
                      </h4>
                      <p className="text-sm text-white/70">
                        Persistent Cookies that remember your preferences and
                        login details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Use of Data */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Use of Your Personal Data
                </h2>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <p className="text-white/70 leading-relaxed mb-4">
                    The Company may use Personal Data for the following
                    purposes:
                  </p>
                  <ul className="space-y-3 text-white/70">
                    <li>
                      <strong className="text-white">
                        To provide and maintain our Service
                      </strong>{" "}
                      - including monitoring usage
                    </li>
                    <li>
                      <strong className="text-white">
                        To manage Your Account
                      </strong>{" "}
                      - registration and access to functionalities
                    </li>
                    <li>
                      <strong className="text-white">To contact You</strong> -
                      via email, phone, SMS, or push notifications
                    </li>
                    <li>
                      <strong className="text-white">To provide updates</strong>{" "}
                      - news, special offers, and general information
                    </li>
                    <li>
                      <strong className="text-white">To manage requests</strong>{" "}
                      - attend and manage Your requests
                    </li>
                    <li>
                      <strong className="text-white">
                        For business transfers
                      </strong>{" "}
                      - evaluate mergers, acquisitions or asset sales
                    </li>
                    <li>
                      <strong className="text-white">For analysis</strong> -
                      data analysis, usage trends, and service improvement
                    </li>
                  </ul>
                </div>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Retention of Your Personal Data
                </h2>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <p className="text-white/70 leading-relaxed">
                    The Company will retain Your Personal Data only for as long
                    as necessary for the purposes set out in this Privacy
                    Policy. We will retain and use Your Personal Data to comply
                    with legal obligations, resolve disputes, and enforce our
                    agreements and policies.
                  </p>
                </div>
              </div>

              {/* Security */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Security of Your Personal Data
                </h2>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-red-500/10 to-white/5 p-6 backdrop-blur border-red-500/20">
                  <p className="text-white/70 leading-relaxed">
                    The security of Your Personal Data is important to Us, but
                    remember that no method of transmission over the Internet or
                    electronic storage is 100% secure. While We strive to use
                    commercially reasonable means to protect Your Personal Data,
                    We cannot guarantee its absolute security.
                  </p>
                </div>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Children's Privacy
                </h2>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <p className="text-white/70 leading-relaxed">
                    Our Service does not address anyone under the age of 13. We
                    do not knowingly collect personally identifiable information
                    from anyone under 13. If You are a parent or guardian and
                    become aware that Your child has provided Us with Personal
                    Data, please contact Us.
                  </p>
                </div>
              </div>

              {/* Changes */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Changes to this Privacy Policy
                </h2>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <p className="text-white/70 leading-relaxed">
                    We may update Our Privacy Policy from time to time. We will
                    notify You of any changes by posting the new Privacy Policy
                    on this page and updating the "Last updated" date at the
                    top. You are advised to review this Privacy Policy
                    periodically for any changes.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-blue-400" />
                  Contact Us
                </h2>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-white/5 p-6 backdrop-blur border-blue-500/20">
                  <p className="text-white/70 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy, You can
                    contact us:
                  </p>
                  <a
                    href="mailto:pemdespangandaran@gmail.com"
                    className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    pemdespangandaran@gmail.com
                  </a>
                </div>
              </div>

              {/* Footer Note */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur text-center">
                <p className="text-xs text-white/50">
                  This Privacy Policy was generated using TermsFeed Privacy
                  Policy Generator
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
