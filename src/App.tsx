import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import AboutGurudev from "./pages/AboutGurudev";
import Guruvani from "./pages/Guruvani";
import Research from "./pages/Research";
import Library from "./pages/Library";
import Scholars from "./pages/Scholars";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import CommunityEvents from "./pages/CommunityEvents";
import Search from "./pages/Search";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Gallery from "./pages/Gallery";
import Books from "./pages/Books";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Index />} />
          
          {/* About Section */}
          <Route path="/about" element={<About />} />
          <Route path="/about/gurudev" element={<AboutGurudev />} />
          <Route path="/about/parivar" element={<About />} />
          <Route path="/about/jnan-kendra" element={<About />} />
          
          {/* Guruvani */}
          <Route path="/guruvani" element={<Guruvani />} />
          
          {/* Research Hub */}
          <Route path="/research" element={<Research />} />
          <Route path="/research/sodhsanchay" element={<Research />} />
          <Route path="/research/sodhsandarbh" element={<Research />} />
          <Route path="/research/shabdasangraha" element={<Research />} />
          <Route path="/research/shastrasandarbha" element={<Research />} />
          
          {/* Library */}
          <Route path="/library" element={<Library />} />
          
          {/* Gallery & Books */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/books" element={<Books />} />
          
          {/* Scholars */}
          <Route path="/scholars" element={<Scholars />} />
          
          {/* Community */}
          <Route path="/community" element={<CommunityEvents />} />
          <Route path="/community/events" element={<CommunityEvents />} />
          <Route path="/community/blog" element={<CommunityEvents />} />
          <Route path="/community/news" element={<CommunityEvents />} />
          
          {/* Auth */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Contact */}
          <Route path="/contact" element={<Contact />} />
          
          {/* Search */}
          <Route path="/search" element={<Search />} />
          
          {/* Legal */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
