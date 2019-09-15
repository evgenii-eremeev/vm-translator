const fs = require('fs');
const { readFile, writeFile } = fs.promises;
const path = require('path');
const parser = require('./src/parser');
const writer = require('./src/codeWriter');

const { name: fileName } = path.parse(process.argv[2]);
const vmPath = path.resolve(process.cwd(), process.argv[2]);
const asmPath = path.resolve(process.cwd(), fileName + '.asm');

async function main() {
  const vmCode = await readFile(vmPath, 'utf8');
  const commandsIt = parser(vmCode);
  const asmCode = [...writer(commandsIt)].join('\n');
  await writeFile(asmPath, asmCode, 'utf8');
}

main().catch(console.error);
