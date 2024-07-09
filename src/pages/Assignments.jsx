import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: "", description: "", dueDate: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAssignments((prev) => [...prev, newAssignment]);
    setNewAssignment({ title: "", description: "", dueDate: "" });
  };

  const handleDeleteAssignment = (index) => {
    setAssignments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Assignments</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Assignment Title</Label>
              <Input
                id="title"
                name="title"
                value={newAssignment.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newAssignment.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={newAssignment.dueDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Create Assignment</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          {assignments.length > 0 ? (
            <ul className="space-y-2">
              {assignments.map((assignment, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{assignment.title} - Due: {assignment.dueDate}</span>
                  <div>
                    <Button variant="ghost" size="sm" className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteAssignment(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No assignments created yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Assignments;