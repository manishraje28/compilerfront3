const express = require('express');
const app = express();
const cors = require("cors");

const { generateFile } = require('./generateFile');
const { executeCpp } = require("./executeCpp");
const { executePy } = require('./executePy');
const { executeJava } = require('./executeJava');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.json("hey compiler")
});

app.post("/run", async (req, res) => {
  const { language, code, input } = req.body;  // Retrieve language, code, and input from request body

  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code body" });
  }

  try {
    const filepath = await generateFile(language, code);  // Generate code file

    let output;
    if (language === "cpp") {
      output = await executeCpp(filepath, input);  // Call executeCpp function with input
    } else if (language === "Python") {
      output = await executePy(filepath, input);  // Call executePy function with input
    } else if (language === "Java") {
      output = await executeJava(filepath, input);  // Call executeJava function with input
    }
    
    return res.json({ output });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

  
app.listen(8001, () => {
    console.log("listening host 8001")
});
