const fs = require("fs");
const { readFile, writeFile } = fs.promises;
const path = require("path");

const fileName = path.parse(process.argv[2]).name;
const vmPath = path.resolve(process.cwd(), process.argv[2]);
const asmPath = path.resolve(process.cwd(), fileName + ".asm");

async function main() {
  const vmCode = await readFile(vmPath, "utf8");
  const asmCode = "";
  await writeFile(hackPath, machineCode, "utf8");
}

main().catch(console.error);
