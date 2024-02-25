const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
  const jobId = uuid();
  let filename;
  if (format === 'Java') {
    // Extract the class name from the Java code
    const classNameMatch = content.match(/\b(class|interface)\s+(\w+)/);
    if (classNameMatch) {
      const className = classNameMatch[2];
      filename = `${className}.java`;
    } else {
      throw new Error('Java class name not found in the code.');
    }
  } else {
    filename = `${jobId}.${format}`;
  }
  const filepath = path.join(dirCodes, filename);
  await fs.writeFileSync(filepath, content);
  return filepath;
};

module.exports = {
  generateFile,
};
