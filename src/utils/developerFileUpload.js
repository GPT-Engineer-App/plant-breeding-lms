// This file simulates a server-side implementation for file storage.
// In a real-world scenario, this would interact with a database or file system.

const MAX_STORAGE_CAPACITY = 100 * 1024 * 1024 * 1024; // 100 GB in bytes
let currentStorageUsed = 0;

let permanentFiles = [
  { name: "Introduction_to_Plant_Breeding.pdf", type: "application/pdf", size: 5 * 1024 * 1024 }, // 5 MB
  { name: "Genetics_Basics.docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", size: 2 * 1024 * 1024 }, // 2 MB
  { name: "Crop_Improvement_Techniques.pptx", type: "application/vnd.openxmlformats-officedocument.presentationml.presentation", size: 10 * 1024 * 1024 }, // 10 MB
];

// Initialize currentStorageUsed
currentStorageUsed = permanentFiles.reduce((total, file) => total + file.size, 0);

export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (file && file.name && file.size) {
        // Check if there's enough storage capacity
        if (currentStorageUsed + file.size > MAX_STORAGE_CAPACITY) {
          reject({ success: false, message: "Storage capacity limit reached. Unable to upload file." });
          return;
        }

        // Check if the file already exists
        const existingFile = permanentFiles.find(f => f.name === file.name);
        if (!existingFile) {
          permanentFiles.push({ name: file.name, type: file.type, size: file.size });
          currentStorageUsed += file.size;
          console.log(`File "${file.name}" uploaded and stored permanently.`);
          resolve({ success: true, message: `File "${file.name}" uploaded and stored permanently.` });
        } else {
          console.log(`File "${file.name}" already exists in permanent storage.`);
          resolve({ success: true, message: `File "${file.name}" already exists in permanent storage.` });
        }
      } else {
        reject({ success: false, message: "Invalid file." });
      }
    }, 1000);
  });
};

export const getPermanentFiles = () => {
  return permanentFiles;
};

export const deleteFile = (fileName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const initialLength = permanentFiles.length;
      const deletedFile = permanentFiles.find(file => file.name === fileName);
      permanentFiles = permanentFiles.filter(file => file.name !== fileName);
      if (permanentFiles.length < initialLength) {
        currentStorageUsed -= deletedFile.size;
        console.log(`File "${fileName}" has been deleted from permanent storage.`);
        resolve({ success: true, message: `File "${fileName}" has been deleted from permanent storage.` });
      } else {
        resolve({ success: false, message: `File "${fileName}" not found in permanent storage.` });
      }
    }, 500);
  });
};

export const getRemainingStorage = () => {
  return MAX_STORAGE_CAPACITY - currentStorageUsed;
};

export const getStorageUsage = () => {
  return {
    used: currentStorageUsed,
    total: MAX_STORAGE_CAPACITY,
    remaining: MAX_STORAGE_CAPACITY - currentStorageUsed
  };
};