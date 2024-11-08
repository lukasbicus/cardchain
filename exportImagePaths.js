/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

function getImagePaths(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      getImagePaths(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.svg', '.jpg', '.jpeg', '.png', '.ico'].includes(ext)) {
        fileList.push(filePath.substring('public/'.length));
      }
    }
  });

  return fileList;
}

const imagePaths = getImagePaths('public');

fs.writeFileSync('public/image-paths.json', JSON.stringify(imagePaths));

console.log('Image paths exported successfully!');
