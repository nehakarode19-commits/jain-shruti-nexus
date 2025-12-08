import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemoAuthProvider } from "@/contexts/DemoAuthContext";
import { ProtectedLMSRoute } from "@/components/lms/ProtectedLMSRoute";

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

// LMS Pages
import LMSLogin from "./pages/lms/LMSLogin";
import LMSDashboard from "./pages/lms/LMSDashboard";
import BookEntry from "./pages/lms/BookEntry";
import BookIssue from "./pages/lms/BookIssue";
import BookReceive from "./pages/lms/BookReceive";
import Manuscripts from "./pages/lms/Manuscripts";
import Members from "./pages/lms/Members";
import Approvals from "./pages/lms/Approvals";
import Reports from "./pages/lms/Reports";
import TicketManagement from "./pages/lms/TicketManagement";
import LMSSettings from "./pages/lms/LMSSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DemoAuthProvider>
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
            
            {/* LMS Routes */}
            <Route path="/lms" element={<LMSLogin />} />
            <Route path="/lms/dashboard" element={<ProtectedLMSRoute><LMSDashboard /></ProtectedLMSRoute>} />
            <Route path="/lms/book-entry" element={<ProtectedLMSRoute><BookEntry /></ProtectedLMSRoute>} />
            <Route path="/lms/book-issue" element={<ProtectedLMSRoute><BookIssue /></ProtectedLMSRoute>} />
            <Route path="/lms/book-receive" element={<ProtectedLMSRoute><BookReceive /></ProtectedLMSRoute>} />
            <Route path="/lms/manuscripts" element={<ProtectedLMSRoute><Manuscripts /></ProtectedLMSRoute>} />
            <Route path="/lms/members" element={<ProtectedLMSRoute><Members /></ProtectedLMSRoute>} />
            <Route path="/lms/approvals" element={<ProtectedLMSRoute><Approvals /></ProtectedLMSRoute>} />
            <Route path="/lms/reports" element={<ProtectedLMSRoute><Reports /></ProtectedLMSRoute>} />
            <Route path="/lms/tickets" element={<ProtectedLMSRoute><TicketManagement /></ProtectedLMSRoute>} />
            <Route path="/lms/settings" element={<ProtectedLMSRoute><LMSSettings /></ProtectedLMSRoute>} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DemoAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
