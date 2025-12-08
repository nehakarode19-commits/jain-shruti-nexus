import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="py-24 lg:py-32 bg-gradient-hero lotus-pattern min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-fade-up">
              <span className="font-display text-4xl font-bold text-primary">404</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-up delay-100">
              Page Not Found
            </h1>
            <p className="text-muted-foreground mb-8 animate-fade-up delay-200">
              The path you seek does not exist. Perhaps the knowledge you're looking for 
              lies elsewhere in our ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-up delay-300">
              <Button variant="hero" asChild>
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Return Home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/research">
                  <Search className="h-4 w-4 mr-2" />
                  Explore Research
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
