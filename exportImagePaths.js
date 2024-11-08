/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

// Function to recursively collect image paths
function getImagePaths(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      // Recurse into a subdirectory
      getImagePaths(filePath, fileList);
    } else {
      // Is a file
      const ext = path.extname(file).toLowerCase();
      // Check if the file has one of the specified extensions
      if (['.svg', '.jpg', '.jpeg', '.png', '.ico'].includes(ext)) {
        // Add file path to array, removing the 'public' prefix
        fileList.push(filePath.substring('public/'.length));
      }
    }
  });

  return fileList;
}

// Usage
const imagePaths = getImagePaths('public'); // Assuming 'public' is the directory where your images are stored

console.log(imagePaths);
fs.writeFileSync('public/image-paths.json', JSON.stringify(imagePaths));
