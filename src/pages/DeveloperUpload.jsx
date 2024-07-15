import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadFile, getUploadedFiles, clearUploadedFiles } from "@/utils/developerFileUpload";

const DeveloperUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    try {
      const result = await uploadFile(file);
      setUploadStatus(result.message);
      setFile(null);
      updateUploadedFiles();
    } catch (error) {
      setUploadStatus(error.message);
    }
  };

  const updateUploadedFiles = () => {
    setUploadedFiles(getUploadedFiles());
  };

  const handleClearFiles = () => {
    clearUploadedFiles();
    setUploadedFiles([]);
    setUploadStatus("All uploaded files have been cleared.");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Developer File Upload</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Select File</Label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="border-primary"
              />
            </div>
            <Button onClick={handleUpload}>Upload File</Button>
            {uploadStatus && <p className="mt-2">{uploadStatus}</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
        </CardHeader>
        <CardContent>
          {uploadedFiles.length > 0 ? (
            <div>
              <ul className="list-disc pl-5 mb-4">
                {uploadedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
              <Button onClick={handleClearFiles} variant="destructive">Clear All Files</Button>
            </div>
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperUpload;