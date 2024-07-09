import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDeleteFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleGenerateQuizzes = () => {
    // TODO: Implement quiz generation logic
    console.log("Generating quizzes from uploaded files...");
    // For now, we'll just navigate to the Quizzes page
    navigate("/quizzes");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Plant Breeding and Genetics LMS</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file-upload">Upload PDFs</Label>
            <Input 
              id="file-upload" 
              type="file" 
              accept=".pdf" 
              onChange={handleFileUpload} 
              multiple
            />
          </div>
          {files.length > 0 && (
            <Button 
              onClick={handleGenerateQuizzes}
              className="mt-4"
            >
              <FileText className="mr-2 h-4 w-4" />
              Generate Quizzes from Files
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
        </CardHeader>
        <CardContent>
          {files.length > 0 ? (
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{file.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteFile(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;