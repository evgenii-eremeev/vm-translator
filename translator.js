#! /usr/bin/env node

const fs = require('fs');
const { readFile, writeFile, lstat, readdir } = fs.promises;
const path = require('path');
const parser = require('./src/parser');
const writer = require('./src/codeWriter/codeWriter');
const { writeInit } = require('./src/codeWriter/writeInit');
const { asm } = require('./src/util/util');

const sourcePath = path.resolve(process.cwd(), process.argv[2]);
const source = path.parse(sourcePath);
const asmPath = path.resolve(process.cwd(), source.name + '.asm');

async function processFile({ filePath, fileName, isFirst }) {
  const vmCode = await readFile(filePath, 'utf8');
  const commands = parser(vmCode);
  const asmCode = asm(
    isFirst ? writeInit() : '',
    ...writer(commands, fileName)
  );
  await writeFile(asmPath, asmCode, { flag: isFirst ? 'w' : 'a' });
}

async function main() {
  const stat = await lstat(sourcePath);
  if (stat.isDirectory()) {
    const rawFiles = await readdir(sourcePath);
    const files = rawFiles.map(path.parse).filter(file => file.ext === '.vm');
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.resolve(sourcePath, file.base);
      await processFile({ filePath, fileName: file.name, isFirst: i === 0 });
    }
  } else if (stat.isFile()) {
    await processFile({
      filePath: sourcePath,
      fileName: source.name,
      isFirst: true,
    });
  } else {
    throw new Error('Wrong source path:', sourcePath);
  }
}

main().catch(console.error);
