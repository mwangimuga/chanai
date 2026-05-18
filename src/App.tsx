import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import TeamPage from "./pages/TeamPage.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import CommunityPage from "./pages/CommunityPage.tsx";
import BlogPostPage from "./pages/BlogPostPage.tsx";
import BookingPage from "./pages/BookingPage.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";
import WhatsAppButton from "./components/shared/WhatsAppButton";
import ScrollProgress from "./components/shared/ScrollProgress";
import ScrollToTop from "./components/shared/ScrollToTop";
import PageTracker from "./components/shared/PageTracker";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ScrollProgress />
          <PageTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/team" element={<TeamPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/blog/:slug" element={<BlogPostPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/admin/*" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
