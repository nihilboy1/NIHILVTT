import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const COMMANDS = [
  "check:backend-class-manifest-sync",
  "check:backend-feat-manifest-sync",
  "check:backend-item-manifest-sync",
  "check:backend-monster-manifest-sync",
  "check:backend-origin-manifest-sync",
  "check:backend-specie-manifest-sync",
  "check:backend-spell-manifest-sync",
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
