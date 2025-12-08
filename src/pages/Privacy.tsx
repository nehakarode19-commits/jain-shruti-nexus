import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                submit research entries, or contact us. This may include your name, email address, 
                and any other information you choose to provide.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, 
                process your requests, and communicate with you about updates and research opportunities.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                3. Information Sharing
              </h2>
              <p>
                We do not sell or share your personal information with third parties except as 
                necessary to provide our services or as required by law.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                4. Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                5. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at 
                contact@jambushruti.org.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
