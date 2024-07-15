// This file is for demonstration purposes only.
// In a real-world scenario, this would be a server-side implementation.

let uploadedFiles = [];

export const uploadFile = (file) => {
  // Simulating file upload process
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (file && file.name) {
        uploadedFiles.push(file);
        console.log(`File "${file.name}" uploaded successfully.`);
        resolve({ success: true, message: `File "${file.name}" uploaded successfully.` });
      } else {
        reject({ success: false, message: "Invalid file." });
      }
    }, 1000);
  });
};

export const getUploadedFiles = () => {
  return uploadedFiles;
};

export const clearUploadedFiles = () => {
  uploadedFiles = [];
  console.log("All uploaded files have been cleared.");
};