import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ProtectedLMSRoute } from "@/components/lms/ProtectedLMSRoute";
import { ProtectedAdminRoute } from "@/components/admin/ProtectedAdminRoute";
import { ProtectedScholarRoute } from "@/components/scholar/ProtectedScholarRoute";
import { useGlobalScrollToTop } from "@/hooks/useGlobalScrollToTop";

// Scholar Portal Pages
import ScholarLogin from "./pages/scholar/ScholarLogin";
import ScholarDashboard from "./pages/scholar/ScholarDashboard";
import ScholarDirectory from "./pages/scholar/ScholarDirectory";
import ScholarChat from "./pages/scholar/ScholarChat";
import ScholarFeed from "./pages/scholar/ScholarFeed";
import ScholarEvents from "./pages/scholar/ScholarEvents";
import ScholarAITools from "./pages/scholar/ScholarAITools";
import ScholarSettings from "./pages/scholar/ScholarSettings";
import ScholarPublications from "./pages/scholar/ScholarPublications";
import ScholarPublicationSubmit from "./pages/scholar/ScholarPublicationSubmit";
import ScholarPublicationDetail from "./pages/scholar/ScholarPublicationDetail";

import Index from "./pages/Index";
import About from "./pages/About";
import AboutGurudev from "./pages/AboutGurudev";
import Guruvani from "./pages/Guruvani";
import GuruvaniDetails from "./pages/GuruvaniDetails";
import Research from "./pages/Research";
import Library from "./pages/Library";
import LibraryItemDetails from "./pages/LibraryItemDetails";
import Scholars from "./pages/Scholars";
import ScholarsDirectory from "./pages/ScholarsDirectory";
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
import ArticleDetails from "./pages/ArticleDetails";
import NotFound from "./pages/NotFound";

// About Section Pages
import GurudevParivar from "./pages/about/GurudevParivar";
import GyanKendra from "./pages/about/GyanKendra";

// Community Pages
import Blog from "./pages/community/Blog";
import BlogDetails from "./pages/community/BlogDetails";
import News from "./pages/community/News";
import EventDetails from "./pages/community/EventDetails";

// Research Modules
import SodhSanchay from "./pages/research/SodhSanchay";
import SodhSandarbh from "./pages/research/SodhSandarbh";
import Shabdasangraha from "./pages/research/Shabdasangraha";
import Shastrasandarbha from "./pages/research/Shastrasandarbha";
import IndologyResearch from "./pages/research/IndologyResearch";

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
import { ScholarsPage, ResearchPage, LMSPage, MuseumPage, AIPage, AccessRequestsPage, LogsPage, SettingsPage } from "./pages/admin/AdminModules";
import CMSManagement from "./pages/admin/CMSManagement";
import BooksManagement from "./pages/admin/BooksManagement";
import ArticlesManagement from "./pages/admin/ArticlesManagement";
import BlogManagement from "./pages/admin/BlogManagement";
import EventsManagement from "./pages/admin/EventsManagement";
import GalleryManagement from "./pages/admin/GalleryManagement";
import EmagazineManagement from "./pages/admin/EmagazineManagement";
import SocialMediaManagement from "./pages/admin/SocialMediaManagement";
import FeedbackManagement from "./pages/admin/FeedbackManagement";
import EmagazinePage from "./pages/Emagazine";
import Feedback from "./pages/Feedback";
import LiveTelecast from "./pages/LiveTelecast";
import LiveTelecastManagement from "./pages/admin/LiveTelecastManagement";

// Learning Portal Pages
import LearningCourses from "./pages/learning/Courses";
import LearningCourseDetail from "./pages/learning/CourseDetail";
import LearningLogin from "./pages/learning/LearningLogin";
import LMSAdminDashboard from "./pages/learning/LMSAdminDashboard";
import LearningDashboard from "./pages/learning/LMSDashboard";
import CoursesManage from "./pages/learning/CoursesManage";
import LearningLecturesManage from "./pages/learning/LecturesManage";
import StudentsManage from "./pages/learning/StudentsManage";
import AttendanceManage from "./pages/learning/AttendanceManage";
import ScheduleManage from "./pages/learning/ScheduleManage";
import MaterialsManage from "./pages/learning/MaterialsManage";
import ReportsManage from "./pages/learning/ReportsManage";
import LearningSettings from "./pages/learning/LMSSettings";
import ProgramsManage from "./pages/learning/ProgramsManage";
import BatchesManage from "./pages/learning/BatchesManage";
import QuizzesManage from "./pages/learning/QuizzesManage";
import AssignmentsManage from "./pages/learning/AssignmentsManage";
import StudentDashboard from "./pages/learning/StudentDashboard";
import MyCertificates from "./pages/learning/MyCertificates";
import EnrolledCourses from "./pages/learning/EnrolledCourses";
import MySchedule from "./pages/learning/MySchedule";
import MyAssignments from "./pages/learning/MyAssignments";
import MyQuizzes from "./pages/learning/MyQuizzes";
import MyMaterials from "./pages/learning/MyMaterials";
import LMSCoursesManagement from "./pages/admin/LMSCoursesManagement";
import LecturesManagement from "./pages/admin/LecturesManagement";

// Ticket Management Pages
import TicketDashboard from "./pages/tickets/TicketDashboard";
import CreateTicket from "./pages/tickets/CreateTicket";
import TicketList from "./pages/tickets/TicketList";
import TicketDetail from "./pages/tickets/TicketDetail";
import TicketCategories from "./pages/tickets/TicketCategories";
import TicketReports from "./pages/tickets/TicketReports";
import SLASettings from "./pages/tickets/SLASettings";
import MyTickets from "./pages/tickets/MyTickets";
import { ProtectedTicketRoute } from "@/components/tickets/ProtectedTicketRoute";
import { ProtectedLearningRoute } from "@/components/learning/ProtectedLearningRoute";
import { ProtectedStudentRoute } from "@/components/learning/ProtectedStudentRoute";

const queryClient = new QueryClient();

// Wrapper component to use the hook
function AppContent() {
  useGlobalScrollToTop();
  
  return (
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
      <Route path="/guruvani/:id" element={<GuruvaniDetails />} />
      
      {/* Research Hub */}
      <Route path="/research" element={<Research />} />
      <Route path="/research/sodhsanchay" element={<SodhSanchay />} />
      <Route path="/research/sodhsandarbh" element={<SodhSandarbh />} />
      <Route path="/research/shabdasangraha" element={<Shabdasangraha />} />
      <Route path="/research/shastrasandarbha" element={<Shastrasandarbha />} />
      <Route path="/research/indology" element={<IndologyResearch />} />
      
      {/* Library */}
      <Route path="/library" element={<Library />} />
      <Route path="/library/:id" element={<LibraryItemDetails />} />
      
      {/* Gallery & Books */}
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/live-telecast" element={<LiveTelecast />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticleDetails />} />
      
      {/* Scholars */}
      <Route path="/scholars" element={<Scholars />} />
      <Route path="/scholars/directory" element={<ScholarsDirectory />} />
      
      {/* Community */}
      <Route path="/community" element={<CommunityEvents />} />
      <Route path="/community/events" element={<CommunityEvents />} />
      <Route path="/community/events/:id" element={<EventDetails />} />
      <Route path="/community/blog" element={<Blog />} />
      <Route path="/community/blog/:id" element={<BlogDetails />} />
      
      {/* eMagazine */}
      <Route path="/emagazine" element={<EmagazinePage />} />
      <Route path="/community/news" element={<News />} />
      
      {/* Auth */}
      <Route path="/auth" element={<Auth />} />
      
      {/* Contact & Feedback */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/feedback" element={<Feedback />} />
      
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
      
      {/* Scholar Portal Routes */}
      <Route path="/scholar" element={<ScholarLogin />} />
      <Route path="/scholar/login" element={<ScholarLogin />} />
      <Route path="/scholar/dashboard" element={<ProtectedScholarRoute><ScholarDashboard /></ProtectedScholarRoute>} />
      <Route path="/scholar/directory" element={<ProtectedScholarRoute><ScholarDirectory /></ProtectedScholarRoute>} />
      <Route path="/scholar/publications" element={<ProtectedScholarRoute><ScholarPublications /></ProtectedScholarRoute>} />
      <Route path="/scholar/publications/submit" element={<ProtectedScholarRoute><ScholarPublicationSubmit /></ProtectedScholarRoute>} />
      <Route path="/scholar/publications/:id" element={<ProtectedScholarRoute><ScholarPublicationDetail /></ProtectedScholarRoute>} />
      <Route path="/scholar/chat" element={<ProtectedScholarRoute><ScholarChat /></ProtectedScholarRoute>} />
      <Route path="/scholar/feed" element={<ProtectedScholarRoute><ScholarFeed /></ProtectedScholarRoute>} />
      <Route path="/scholar/events" element={<ProtectedScholarRoute><ScholarEvents /></ProtectedScholarRoute>} />
      <Route path="/scholar/ai-tools" element={<ProtectedScholarRoute><ScholarAITools /></ProtectedScholarRoute>} />
      <Route path="/scholar/settings" element={<ProtectedScholarRoute><ScholarSettings /></ProtectedScholarRoute>} />
      
      {/* Learning Portal Routes */}
      <Route path="/learning" element={<LearningLogin />} />
      <Route path="/learning/login" element={<LearningLogin />} />
      <Route path="/learning/courses" element={<LearningCourses />} />
      <Route path="/learning/courses/:courseId" element={<ProtectedStudentRoute><LearningCourseDetail /></ProtectedStudentRoute>} />
      <Route path="/learning/student-dashboard" element={<ProtectedStudentRoute><StudentDashboard /></ProtectedStudentRoute>} />
      <Route path="/learning/admin-dashboard" element={<ProtectedLearningRoute><LMSAdminDashboard /></ProtectedLearningRoute>} />
      <Route path="/learning/dashboard" element={<ProtectedLearningRoute><LearningDashboard /></ProtectedLearningRoute>} />
      <Route path="/learning/manage-courses" element={<ProtectedLearningRoute><CoursesManage /></ProtectedLearningRoute>} />
      <Route path="/learning/manage-lectures" element={<ProtectedLearningRoute><LearningLecturesManage /></ProtectedLearningRoute>} />
      <Route path="/learning/students" element={<ProtectedLearningRoute><StudentsManage /></ProtectedLearningRoute>} />
      <Route path="/learning/attendance" element={<ProtectedLearningRoute><AttendanceManage /></ProtectedLearningRoute>} />
      <Route path="/learning/schedule" element={<ProtectedLearningRoute><ScheduleManage /></ProtectedLearningRoute>} />
      <Route path="/learning/materials" element={<ProtectedLearningRoute><MaterialsManage /></ProtectedLearningRoute>} />
      <Route path="/learning/reports" element={<ProtectedLearningRoute><ReportsManage /></ProtectedLearningRoute>} />
      <Route path="/learning/settings" element={<ProtectedLearningRoute><LearningSettings /></ProtectedLearningRoute>} />
      <Route path="/learning/programs" element={<ProtectedLearningRoute><ProgramsManage /></ProtectedLearningRoute>} />
      <Route path="/learning/batches" element={<ProtectedLearningRoute><BatchesManage /></ProtectedLearningRoute>} />
      <Route path="/learning/quizzes" element={<ProtectedLearningRoute><QuizzesManage /></ProtectedLearningRoute>} />
      <Route path="/learning/assignments" element={<ProtectedLearningRoute><AssignmentsManage /></ProtectedLearningRoute>} />
      <Route path="/learning/certificates" element={<ProtectedStudentRoute><MyCertificates /></ProtectedStudentRoute>} />
      <Route path="/learning/my-courses" element={<ProtectedStudentRoute><EnrolledCourses /></ProtectedStudentRoute>} />
      <Route path="/learning/my-schedule" element={<ProtectedStudentRoute><MySchedule /></ProtectedStudentRoute>} />
      <Route path="/learning/my-assignments" element={<ProtectedStudentRoute><MyAssignments /></ProtectedStudentRoute>} />
      <Route path="/learning/my-quizzes" element={<ProtectedStudentRoute><MyQuizzes /></ProtectedStudentRoute>} />
      <Route path="/learning/my-materials" element={<ProtectedStudentRoute><MyMaterials /></ProtectedStudentRoute>} />
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
      <Route path="/admin/users" element={<ProtectedAdminRoute><UsersManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/guruvani" element={<ProtectedAdminRoute><GuruvaniManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/cms" element={<ProtectedAdminRoute><CMSManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/gallery" element={<ProtectedAdminRoute><GalleryManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/books" element={<ProtectedAdminRoute><BooksManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/articles" element={<ProtectedAdminRoute><ArticlesManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/blog" element={<ProtectedAdminRoute><BlogManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/events" element={<ProtectedAdminRoute><EventsManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/emagazine" element={<ProtectedAdminRoute><EmagazineManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/social-media" element={<ProtectedAdminRoute><SocialMediaManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/feedback" element={<ProtectedAdminRoute><FeedbackManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/live-telecast" element={<ProtectedAdminRoute><LiveTelecastManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/scholars" element={<ProtectedAdminRoute><ScholarsPage /></ProtectedAdminRoute>} />
      <Route path="/admin/research" element={<ProtectedAdminRoute><ResearchPage /></ProtectedAdminRoute>} />
      <Route path="/admin/lms" element={<ProtectedAdminRoute><LMSPage /></ProtectedAdminRoute>} />
      <Route path="/admin/museum" element={<ProtectedAdminRoute><MuseumPage /></ProtectedAdminRoute>} />
      <Route path="/admin/ai" element={<ProtectedAdminRoute><AIPage /></ProtectedAdminRoute>} />
      <Route path="/admin/access-requests" element={<ProtectedAdminRoute><AccessRequestsPage /></ProtectedAdminRoute>} />
      <Route path="/admin/logs" element={<ProtectedAdminRoute><LogsPage /></ProtectedAdminRoute>} />
      <Route path="/admin/settings" element={<ProtectedAdminRoute><SettingsPage /></ProtectedAdminRoute>} />
      <Route path="/admin/learning-courses" element={<ProtectedAdminRoute><LMSCoursesManagement /></ProtectedAdminRoute>} />
      <Route path="/admin/lectures" element={<ProtectedAdminRoute><LecturesManagement /></ProtectedAdminRoute>} />
      
      {/* Ticket Management Routes */}
      <Route path="/tickets" element={<ProtectedTicketRoute><TicketDashboard /></ProtectedTicketRoute>} />
      <Route path="/tickets/dashboard" element={<ProtectedTicketRoute><TicketDashboard /></ProtectedTicketRoute>} />
      <Route path="/tickets/create" element={<ProtectedTicketRoute><CreateTicket /></ProtectedTicketRoute>} />
      <Route path="/tickets/list" element={<ProtectedTicketRoute><TicketList /></ProtectedTicketRoute>} />
      <Route path="/tickets/my-tickets" element={<ProtectedTicketRoute><MyTickets /></ProtectedTicketRoute>} />
      <Route path="/tickets/categories" element={<ProtectedTicketRoute><TicketCategories /></ProtectedTicketRoute>} />
      <Route path="/tickets/reports" element={<ProtectedTicketRoute><TicketReports /></ProtectedTicketRoute>} />
      <Route path="/tickets/sla-settings" element={<ProtectedTicketRoute><SLASettings /></ProtectedTicketRoute>} />
      <Route path="/tickets/:id" element={<ProtectedTicketRoute><TicketDetail /></ProtectedTicketRoute>} />
      
      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
