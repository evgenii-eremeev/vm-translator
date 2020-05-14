#! /usr/bin/env node

const fs = require('fs');
const { readFile, writeFile, lstat, readdir, unlink } = fs.promises;
const path = require('path');
const parser = require('./src/parser');
const writer = require('./src/codeWriter');

const sourcePath = path.resolve(process.cwd(), process.argv[2]);
const source = path.parse(sourcePath);
const asmPath = path.resolve(process.cwd(), source.name + '.asm');

async function processFile(filePath, fileName) {
  const vmCode = await readFile(filePath, 'utf8');
  const commands = parser(vmCode);
  const asmCode = [...writer(commands, fileName)].join('\n') + '\n';
  await writeFile(asmPath, asmCode, { flag: 'a' });
}

async function main() {
  try {
    await unlink(asmPath);
  } catch (_) {}

  const stat = await lstat(sourcePath);
  if (stat.isDirectory()) {
    const rawFiles = await readdir(sourcePath);
    const files = rawFiles.map(path.parse).filter(file => file.ext === '.vm');
    for (const file of files) {
      const filePath = path.resolve(sourcePath, file.base);
      await processFile(filePath, file.name);
    }
  } else if (stat.isFile()) {
    await processFile(sourcePath, source.name);
  } else {
    throw new Error('Wrong source path:', sourcePath);
  }
}

main().catch(console.error);
