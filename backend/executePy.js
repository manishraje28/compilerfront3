  const { exec } = require("child_process");

  const executePy = (filepath, input) => {
    return new Promise((resolve, reject) => {
      const process = exec(
        `python ${filepath}`,
        (error, stdout, stderr) => {
          error && reject({ error, stderr });
          stderr && reject(stderr);
          resolve(stdout);
        }
      );

      if (input) {
        process.stdin.write(input);
        process.stdin.end();
      }
    });
  };

  module.exports = {
    executePy,
  };
