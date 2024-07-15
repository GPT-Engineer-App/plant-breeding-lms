import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { uploadFile, getPermanentFiles, deleteFile, getStorageUsage } from "@/utils/developerFileUpload";
import { Progress } from "@/components/ui/progress";

const DeveloperUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [permanentFiles, setPermanentFiles] = useState([]);
  const [storageUsage, setStorageUsage] = useState({ used: 0, total: 0, remaining: 0 });

  useEffect(() => {
    updatePermanentFiles();
    updateStorageUsage();
  }, []);

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
      updatePermanentFiles();
      updateStorageUsage();
    } catch (error) {
      setUploadStatus(error.message);
    }
  };

  const updatePermanentFiles = () => {
    setPermanentFiles(getPermanentFiles());
  };

  const updateStorageUsage = () => {
    setStorageUsage(getStorageUsage());
  };

  const handleDeleteFile = async (fileName) => {
    try {
      const result = await deleteFile(fileName);
      setUploadStatus(result.message);
      updatePermanentFiles();
      updateStorageUsage();
    } catch (error) {
      setUploadStatus("Error deleting file.");
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const storagePercentage = (storageUsage.used / storageUsage.total) * 100;

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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={storagePercentage} className="mb-2" />
          <p>
            {formatBytes(storageUsage.used)} / {formatBytes(storageUsage.total)} used
            ({storagePercentage.toFixed(2)}%)
          </p>
          <p>Remaining: {formatBytes(storageUsage.remaining)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permanent Files</CardTitle>
        </CardHeader>
        <CardContent>
          {permanentFiles.length > 0 ? (
            <ul className="space-y-2">
              {permanentFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{file.name} ({formatBytes(file.size)})</span>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteFile(file.name)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No files in permanent storage.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperUpload;