import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ title: "", question: "", options: ["", "", "", ""] });
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    // Fetch existing quizzes (mock data for now)
    const mockExistingQuizzes = [
      {
        title: "Existing Quiz 1",
        question: "What is the process of developing new plant types?",
        options: [
          "Plant breeding",
          "Plant growth",
          "Plant harvesting",
          "Plant watering"
        ]
      },
      {
        title: "Existing Quiz 2",
        question: "Which of the following is a type of plant breeding method?",
        options: [
          "Selective breeding",
          "Random breeding",
          "Forced breeding",
          "Natural breeding"
        ]
      }
    ];

    setQuizzes(mockExistingQuizzes);

    // Generate a new quiz when the component mounts (simulating app open)
    generateNewQuiz();
  }, []);

  const generateNewQuiz = () => {
    // In a real application, this would call an API to generate a quiz
    // For now, we'll create a mock generated quiz
    const generatedQuiz = {
      title: `Generated Quiz ${quizzes.length + 1}`,
      question: "What is the main purpose of genetic engineering in plants?",
      options: [
        "To increase crop yield",
        "To improve pest resistance",
        "To enhance nutritional content",
        "All of the above"
      ]
    };

    setQuizzes(prevQuizzes => [...prevQuizzes, generatedQuiz]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    setNewQuiz((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? value : opt)),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuizzes((prev) => [...prev, newQuiz]);
    setNewQuiz({ title: "", question: "", options: ["", "", "", ""] });
  };

  const handleDeleteQuiz = (index) => {
    setQuizzes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleViewQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Quizzes</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Quiz Title</Label>
              <Input
                id="title"
                name="title"
                value={newQuiz.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="question">Question</Label>
              <Textarea
                id="question"
                name="question"
                value={newQuiz.question}
                onChange={handleInputChange}
                required
              />
            </div>
            {newQuiz.options.map((option, index) => (
              <div key={index}>
                <Label htmlFor={`option-${index}`}>Option {index + 1}</Label>
                <Input
                  id={`option-${index}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
            <Button type="submit">Create Quiz</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Quizzes</CardTitle>
        </CardHeader>
        <CardContent>
          {quizzes.length > 0 ? (
            <ul className="space-y-4">
              {quizzes.map((quiz, index) => (
                <li key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{quiz.title}</h3>
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleViewQuiz(quiz)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{selectedQuiz?.title}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <p className="font-semibold mb-2">Question:</p>
                            <p>{selectedQuiz?.question}</p>
                            <p className="font-semibold mt-4 mb-2">Options:</p>
                            <ul className="list-disc pl-5">
                              {selectedQuiz?.options.map((option, optionIndex) => (
                                <li key={optionIndex}>{option}</li>
                              ))}
                            </ul>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteQuiz(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No quizzes created yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Quizzes;