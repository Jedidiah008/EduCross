import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Subject from "./pages/Subject";
import Unit from "./pages/Unit";
import Lesson from "./pages/Lesson";
import Game from "./pages/Game";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/subject/:subjectId" element={<Subject />} />
            <Route path="/subject/:subjectId/unit/:unitId" element={<Unit />} />
            <Route path="/subject/:subjectId/unit/:unitId/lesson/:lessonId" element={<Lesson />} />
            <Route path="/subject/:subjectId/unit/:unitId/lesson/:lessonId/game/:gameId" element={<Game />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;