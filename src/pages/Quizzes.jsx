import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ title: "", question: "", options: ["", "", "", ""] });

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
            <ul className="space-y-2">
              {quizzes.map((quiz, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{quiz.title}</span>
                  <div>
                    <Button variant="ghost" size="sm" className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteQuiz(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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