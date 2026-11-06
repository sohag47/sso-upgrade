import fs from "fs-extra";
import path from "path";

const rootDir = process.cwd();

async function clean() {
  console.log('Cleaning deploy files...');
  await fs.remove(path.join(rootDir, 'deploy'));
  await fs.remove(path.join(rootDir, 'ju-access.zip'));
  console.log('Clean complete!');
}

clean().catch(console.error);
