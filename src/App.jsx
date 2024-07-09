import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, FileText, BookOpen, MessageCircle } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar";
import Index from "./pages/Index.jsx";
import Quizzes from "./pages/Quizzes.jsx";
import Assignments from "./pages/Assignments.jsx";
import Chatbot from "./components/Chatbot.jsx";
const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Quizzes",
    to: "/quizzes",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Assignments",
    to: "/assignments",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    title: "Chatbot",
    to: "/chatbot",
    icon: <MessageCircle className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="quizzes" element={<Quizzes />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="chatbot" element={<Chatbot />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;