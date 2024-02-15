const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const mime = require("mime-types");
// What is the mime-types?
// The mime-types is a package that allows you to determine the mime type of a file based on its extension.

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const S3Client = new S3Client({
  region: "Asia-Pacific",
  endpoint: process.env.S3_CLIENT_API_ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const PROJECT_ID = process.env.PROJECT_ID;

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
      console.log(`Uploading ${file} to S3...`);
      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `__output/${PROJECT_ID}/${file}`,
        Body: fs.createReadStream(file),
        ContentType: "mime.lookup(file)",
      });
      await S3Client.send(command);
    }
    console.log("Files uploaded to S3!");
  });
}
