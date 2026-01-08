import { Metadata } from "next";
import {
  FileText,
  Scale,
  AlertTriangle,
  ShieldCheck,
  ExternalLink,
  Mail,
  BookOpen,
  Gavel,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Wisata Pangandaran",
  description: "Terms of Service for Pangandaran Tourism Information Portal",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Scale className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-300 text-lg">
            Last updated: January 08, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <FileText className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  1. Acceptance of Terms
                </h2>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
              <p>
                Welcome to Wisata Pangandaran (the "Portal"). By accessing or
                using our website at wisatapangandaran.com, you agree to be
                bound by these Terms of Service ("Terms"). If you do not agree
                to these Terms, please do not use our Portal.
              </p>
              <p>
                This Portal is operated by KKN 126 PANGANDARAN as part of a
                community service project to provide tourism information for
                Pangandaran Village and surrounding areas.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  2. Intellectual Property Rights
                </h2>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
              <p>
                The content, design, graphics, compilation, and other
                intellectual property on this Portal are owned by KKN 126
                PANGANDARAN or licensed to us. All rights are reserved.
              </p>
              <p>
                You may access and use the Portal for personal, non-commercial
                purposes. You may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Reproduce, distribute, or publicly display any content without
                  permission
                </li>
                <li>Modify or create derivative works from Portal content</li>
                <li>
                  Use content for commercial purposes without authorization
                </li>
                <li>Remove any copyright or proprietary notices</li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <BookOpen className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  3. User Responsibilities
                </h2>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
              <p>When using our Portal, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Provide accurate information when submitting reviews or
                  comments
                </li>
                <li>
                  Not post any unlawful, threatening, defamatory, or offensive
                  content
                </li>
                <li>
                  Not attempt to gain unauthorized access to any portion of the
                  Portal
                </li>
                <li>
                  Not use the Portal to distribute malware or engage in
                  malicious activities
                </li>
                <li>Respect the privacy and rights of other users</li>
                <li>
                  Comply with all applicable local, national, and international
                  laws
                </li>
              </ul>
            </div>
          </section>

          {/* Content Accuracy */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <AlertTriangle className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  4. Content Accuracy and Disclaimer
                </h2>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
              <p>
                We strive to provide accurate and up-to-date information about
                tourism destinations, accommodations, dining options, and events
                in Pangandaran. However:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Information is provided "as is" without warranties of any kind
                </li>
                <li>
                  Prices, availability, and details may change without notice
                </li>
                <li>
                  We are not responsible for inaccuracies in third-party content
                </li>
                <li>
                  Users should verify important information directly with
                  service providers
                </li>
                <li>
                  We do not guarantee the quality of services from listed
                  businesses
                </li>
              </ul>
              <p className="mt-4">
                The Portal serves as an information resource only. We do not
                operate or endorse any specific accommodations, restaurants,
                tour operators, or other businesses listed on the Portal.
              </p>
            </div>
          </section>

          {/* External Links */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <ExternalLink className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  5. External Links and Third-Party Content
                </h2>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
              <p>
                Our Portal may contain links to external websites and
                third-party content. These links are provided for convenience
                only. We do not control or endorse these external sites and are
                not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  The content, privacy policies, or practices of external
                  websites
                </li>
                <li>
                  Any damages or losses arising from your use of external sites
                </li>
                <li>
                  The accuracy or reliability of information on linked websites
                </li>
              </ul>
              <p className="mt-4">
                Accessing external links is at your own risk. We recommend
                reviewing the terms and privacy policies of any external
                websites you visit.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  6. Limitation of Liability
                </h2>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
              <p>
                To the fullest extent permitted by law, KKN 126 PANGANDARAN and
                its contributors shall not be liable for any:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Direct, indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>
                  Damages resulting from use or inability to use the Portal
                </li>
                <li>Damages arising from reliance on Portal information</li>
                <li>Issues with third-party services listed on the Portal</li>
              </ul>
              <p className="mt-4">
                This limitation applies regardless of the legal theory and even
                if we have been advised of the possibility of such damages.
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <FileText className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  7. Modifications to Terms
                </h2>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
              <p>
                We reserve the right to modify these Terms at any time. Changes
                will be effective immediately upon posting to the Portal. Your
                continued use of the Portal after changes constitutes acceptance
                of the modified Terms.
              </p>
              <p>
                We recommend reviewing these Terms periodically. The "Last
                updated" date at the top of this page indicates when the Terms
                were last revised.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <AlertTriangle className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  8. Termination of Access
                </h2>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
              <p>
                We reserve the right to terminate or suspend your access to the
                Portal at any time, without notice, for any reason, including
                but not limited to violation of these Terms.
              </p>
              <p>
                Upon termination, your right to use the Portal will immediately
                cease. All provisions of these Terms that by their nature should
                survive termination shall survive, including intellectual
                property provisions and limitation of liability.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <Gavel className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  9. Governing Law
                </h2>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the Republic of Indonesia, without regard to
                its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these Terms or your use of the Portal
                shall be subject to the exclusive jurisdiction of the courts of
                Indonesia.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <Mail className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  10. Contact Us
                </h2>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
              <p>
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 mt-4">
                <p className="font-semibold text-white mb-2">
                  KKN 126 PANGANDARAN
                </p>
                <p>Wisata Pangandaran Portal</p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href="mailto:pemdespangandaran@gmail.com"
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    pemdespangandaran@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-cyan-500/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
              <p className="text-center text-sm">
                By using the Wisata Pangandaran Portal, you acknowledge that you
                have read, understood, and agree to be bound by these Terms of
                Service.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
