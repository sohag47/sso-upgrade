import fs from "fs-extra";
import path from "path";

const rootDir = process.cwd();
const deployDir = path.join(rootDir, "deploy");

async function buildDeploy() {
  await fs.remove(deployDir);
  await fs.ensureDir(deployDir);

  console.log("Copy standalone server...");
  await fs.copy(
    path.join(rootDir, ".next/standalone"),
    path.join(deployDir),
    {
      // Dereference symlinks to copy real files/folders on Windows without EPERM
      dereference: true,
    }
  );

  console.log("Copy static files...");
  await fs.copy(
    path.join(rootDir, ".next/static"),
    path.join(deployDir, ".next/static")
  );

  console.log("Copy public...");
  if (await fs.pathExists(path.join(rootDir, "public"))) {
    await fs.copy(
      path.join(rootDir, "public"),
      path.join(deployDir, "public")
    );
  }

  console.log("Done: deploy folder is ready for deployment");
}

buildDeploy().catch((err) => {
  console.error("Deployment preparation failed:", err);
  process.exit(1);
});
