import { Layout } from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Terms of Service
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using Jambu-Shruti, you accept and agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                2. Use of Services
              </h2>
              <p>
                You may use our services only for lawful purposes and in accordance with these Terms. 
                You agree not to use our services in any way that could damage, disable, or impair 
                the platform.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                3. User Accounts
              </h2>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials 
                and for all activities that occur under your account. Please notify us immediately 
                of any unauthorized use.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                4. Intellectual Property
              </h2>
              <p>
                All content on Jambu-Shruti, including texts, manuscripts, research entries, and 
                Guruvani materials, are protected by copyright and other intellectual property laws. 
                Unauthorized reproduction or distribution is prohibited.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                5. Research Submissions
              </h2>
              <p>
                By submitting research entries to SodhSanchay, you grant Jambu-Shruti the right to 
                store, display, and share your submissions within the platform for scholarly purposes.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                6. Limitation of Liability
              </h2>
              <p>
                Jambu-Shruti shall not be liable for any indirect, incidental, special, or 
                consequential damages arising from your use of our services.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                7. Contact
              </h2>
              <p>
                For any questions regarding these Terms of Service, please contact us at 
                contact@jambushruti.org.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
