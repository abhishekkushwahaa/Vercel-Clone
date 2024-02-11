const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

async function init() {
  console.log("Executing script.js...");
  const outDirPath = path.join(__dirname, "output");

  const p = exec(`cd ${outDirPath} && npm install && npm run build`);

  p.stdout.on("data", (data) => {
    console.log(data);
  });
  p.stdout.on("error", (data) => {
    console.error("Error", data.toString());
  });
  p.on("close", async function () {
    console.log("Build completed!");
    const distDir = path.join(__dirname, "output", "dist");
    const disFiles = fs.readdirSync(distDir, { recursive: true });

    for (const file of disFiles) {
      if (fs.lstatSync(file).isDirectory()) continue;
    }
  });
}
