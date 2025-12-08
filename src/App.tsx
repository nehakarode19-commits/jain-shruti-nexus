import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemoAuthProvider } from "@/contexts/DemoAuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ProtectedLMSRoute } from "@/components/lms/ProtectedLMSRoute";
import { ProtectedAdminRoute } from "@/components/admin/ProtectedAdminRoute";

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
import BookDetails from "./pages/BookDetails";
import Articles from "./pages/Articles";
import NotFound from "./pages/NotFound";

// About Section Pages
import GurudevParivar from "./pages/about/GurudevParivar";
import GyanKendra from "./pages/about/GyanKendra";

// Community Pages
import Blog from "./pages/community/Blog";
import News from "./pages/community/News";

// Research Modules
import SodhSanchay from "./pages/research/SodhSanchay";
import SodhSandarbh from "./pages/research/SodhSandarbh";
import Shabdasangraha from "./pages/research/Shabdasangraha";
import Shastrasandarbha from "./pages/research/Shastrasandarbha";

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

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import GuruvaniManagement from "./pages/admin/GuruvaniManagement";
import { CMSPage, GalleryPage, BooksPage, ArticlesPage, BlogPage, EventsPage, ScholarsPage, ResearchPage, LMSPage, MuseumPage, AIPage, AccessRequestsPage, LogsPage, SettingsPage } from "./pages/admin/AdminModules";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DemoAuthProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Index />} />
              
              {/* About Section */}
              <Route path="/about" element={<About />} />
              <Route path="/about/gurudev" element={<AboutGurudev />} />
              <Route path="/about/parivar" element={<GurudevParivar />} />
              <Route path="/about/gyan-kendra" element={<GyanKendra />} />
              
              {/* Guruvani */}
              <Route path="/guruvani" element={<Guruvani />} />
              
              {/* Research Hub */}
              <Route path="/research" element={<Research />} />
              <Route path="/research/sodhsanchay" element={<SodhSanchay />} />
              <Route path="/research/sodhsandarbh" element={<SodhSandarbh />} />
              <Route path="/research/shabdasangraha" element={<Shabdasangraha />} />
              <Route path="/research/shastrasandarbha" element={<Shastrasandarbha />} />
              
              {/* Library */}
              <Route path="/library" element={<Library />} />
              
              {/* Gallery & Books */}
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/articles" element={<Articles />} />
              
              {/* Scholars */}
              <Route path="/scholars" element={<Scholars />} />
              
              {/* Community */}
              <Route path="/community" element={<CommunityEvents />} />
              <Route path="/community/events" element={<CommunityEvents />} />
              <Route path="/community/blog" element={<Blog />} />
              <Route path="/community/news" element={<News />} />
              
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
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
              <Route path="/admin/users" element={<ProtectedAdminRoute><UsersManagement /></ProtectedAdminRoute>} />
              <Route path="/admin/guruvani" element={<ProtectedAdminRoute><GuruvaniManagement /></ProtectedAdminRoute>} />
              <Route path="/admin/cms" element={<ProtectedAdminRoute><CMSPage /></ProtectedAdminRoute>} />
              <Route path="/admin/gallery" element={<ProtectedAdminRoute><GalleryPage /></ProtectedAdminRoute>} />
              <Route path="/admin/books" element={<ProtectedAdminRoute><BooksPage /></ProtectedAdminRoute>} />
              <Route path="/admin/articles" element={<ProtectedAdminRoute><ArticlesPage /></ProtectedAdminRoute>} />
              <Route path="/admin/blog" element={<ProtectedAdminRoute><BlogPage /></ProtectedAdminRoute>} />
              <Route path="/admin/events" element={<ProtectedAdminRoute><EventsPage /></ProtectedAdminRoute>} />
              <Route path="/admin/scholars" element={<ProtectedAdminRoute><ScholarsPage /></ProtectedAdminRoute>} />
              <Route path="/admin/research" element={<ProtectedAdminRoute><ResearchPage /></ProtectedAdminRoute>} />
              <Route path="/admin/lms" element={<ProtectedAdminRoute><LMSPage /></ProtectedAdminRoute>} />
              <Route path="/admin/museum" element={<ProtectedAdminRoute><MuseumPage /></ProtectedAdminRoute>} />
              <Route path="/admin/ai" element={<ProtectedAdminRoute><AIPage /></ProtectedAdminRoute>} />
              <Route path="/admin/access-requests" element={<ProtectedAdminRoute><AccessRequestsPage /></ProtectedAdminRoute>} />
              <Route path="/admin/logs" element={<ProtectedAdminRoute><LogsPage /></ProtectedAdminRoute>} />
              <Route path="/admin/settings" element={<ProtectedAdminRoute><SettingsPage /></ProtectedAdminRoute>} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </DemoAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
