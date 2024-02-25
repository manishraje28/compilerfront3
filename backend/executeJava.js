const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath, input) => {
  const filename = path.basename(filepath, path.extname(filepath));
  const classpath = outputPath;
  
  return new Promise((resolve, reject) => {
    const process = exec(
      `javac ${filepath} -d ${outputPath} && java -cp ${classpath} ${filename}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      }
    );

    if (input) {
      process.stdin.write(input);
      process.stdin.end();
    }
  });
};

module.exports = {
  executeJava,
};
