import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const COMMANDS = [
  "export:backend-class-manifest",
  "export:backend-feat-manifest",
  "export:backend-item-manifest",
  "export:backend-monster-manifest",
  "export:backend-origin-manifest",
  "export:backend-specie-manifest",
  "export:backend-spell-manifest",
] as const;

function runCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn("pnpm", [command], {
      stdio: "inherit",
      cwd: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.."),
      shell: true,
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Falha ao executar ${command}. Exit code=${code ?? -1}`));
    });
  });
}

async function main() {
  for (const command of COMMANDS) {
    await runCommand(command);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
