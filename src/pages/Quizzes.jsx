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
  const [newQuiz, setNewQuiz] = useState({ title: "", questions: [] });
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    // Fetch existing quizzes (mock data for now)
    const mockExistingQuizzes = [
      {
        title: "Existing Quiz 1",
        questions: [
          {
            question: "What is the process of developing new plant types?",
            options: [
              "Plant breeding",
              "Plant growth",
              "Plant harvesting",
              "Plant watering"
            ]
          },
          // ... (add more questions to make it 10)
        ]
      },
      // ... (you can add more existing quizzes if needed)
    ];

    setQuizzes(mockExistingQuizzes);

    // Generate a new quiz when the component mounts (simulating app open)
    generateNewQuiz();
  }, []);

  const generateNewQuiz = () => {
    // In a real application, this would call an API to generate a quiz
    // For now, we'll create a mock generated quiz with 10 MCQs
    const generatedQuiz = {
      title: `Generated Quiz ${quizzes.length + 1}`,
      questions: Array(10).fill().map((_, index) => ({
        question: `Generated Question ${index + 1}`,
        options: [
          `Option A for Q${index + 1}`,
          `Option B for Q${index + 1}`,
          `Option C for Q${index + 1}`,
          `Option D for Q${index + 1}`
        ]
      }))
    };

    setQuizzes(prevQuizzes => [...prevQuizzes, generatedQuiz]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    setNewQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setNewQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex ? {
          ...q,
          options: q.options.map((opt, j) => j === optionIndex ? value : opt)
        } : q
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuiz.questions.length !== 10) {
      alert("A quiz must have exactly 10 questions.");
      return;
    }
    setQuizzes((prev) => [...prev, newQuiz]);
    setNewQuiz({ title: "", questions: Array(10).fill().map(() => ({ question: "", options: ["", "", "", ""] })) });
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
            {newQuiz.questions.map((question, qIndex) => (
              <div key={qIndex} className="border p-4 rounded">
                <Label htmlFor={`question-${qIndex}`}>Question {qIndex + 1}</Label>
                <Textarea
                  id={`question-${qIndex}`}
                  value={question.question}
                  onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                  required
                />
                {question.options.map((option, oIndex) => (
                  <div key={oIndex}>
                    <Label htmlFor={`option-${qIndex}-${oIndex}`}>Option {oIndex + 1}</Label>
                    <Input
                      id={`option-${qIndex}-${oIndex}`}
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      required
                    />
                  </div>
                ))}
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
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedQuiz?.title}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            {selectedQuiz?.questions.map((q, qIndex) => (
                              <div key={qIndex} className="mb-4">
                                <p className="font-semibold mb-2">Question {qIndex + 1}:</p>
                                <p>{q.question}</p>
                                <p className="font-semibold mt-2 mb-1">Options:</p>
                                <ul className="list-disc pl-5">
                                  {q.options.map((option, optionIndex) => (
                                    <li key={optionIndex}>{option}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
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