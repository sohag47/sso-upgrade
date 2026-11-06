import { ZipArchive } from "archiver";
import fs from "fs-extra";
import path from "path";

const rootDir = process.cwd();
const deployDir = path.join(rootDir, "deploy");
const zipPath = path.join(rootDir, "ju-access.zip");

async function zipDeploy() {
  console.log("Checking deploy folder...");
  const exists = await fs.pathExists(deployDir);

  if (!exists) {
    throw new Error("deploy folder not found. Run deploy:prepare first.");
  }

  console.log("Removing old zip (if exists)...");
  await fs.remove(zipPath);

  console.log("Creating ZIP...");
  const output = fs.createWriteStream(zipPath);

  // Call archiver as a function, specifying the format ('zip')
  const archive = new ZipArchive({
    zlib: { level: 9 }, // Sets the compression level.
  });

  archive.on("error", (err) => {
    throw err;
  });

  output.on("close", () => {
    console.log("ZIP created successfully");
    console.log(
      `Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`
    );
  });

  archive.pipe(output);
  archive.directory(deployDir, false);
  await archive.finalize();
}

zipDeploy().catch((err) => {
  console.error(err);
  process.exit(1);
});
