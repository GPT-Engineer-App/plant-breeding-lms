import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleGenerateQuizzes = () => {
    // TODO: Implement quiz generation logic
    console.log("Generating quizzes from developer-uploaded files...");
    // For now, we'll just navigate to the Quizzes page
    navigate("/quizzes");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Plant Breeding and Genetics LMS</h1>
      
      <Card className="mb-6 gradient-border">
        <CardHeader className="gradient-bg text-white">
          <CardTitle>Welcome to the Learning Management System</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <p className="mb-4">
            This LMS is designed to help you learn about Plant Breeding and Genetics. 
            Explore the available quizzes and assignments to enhance your knowledge.
          </p>
          <Button 
            onClick={handleGenerateQuizzes}
            className="mt-4"
            variant="gradient"
          >
            <FileText className="mr-2 h-4 w-4" />
            View Available Quizzes
          </Button>
        </CardContent>
      </Card>

      <Card className="gradient-border">
        <CardHeader className="gradient-bg text-white">
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>Navigate to the Quizzes section to test your knowledge</li>
            <li>Check the Assignments page for any pending tasks</li>
            <li>Use the Chatbot for quick answers to your questions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;