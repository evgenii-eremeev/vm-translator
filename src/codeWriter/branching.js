const { SNIPPETS } = require('../constants');
const { asm } = require('../util/util');

function writeLabel(label) {
  return `(${label})`;
}

function writeGoto(label) {
  // prettier-ignore
  return asm(
    `@${label}`,
    '0;JMP'
  );
}

function writeIf(label) {
  // prettier-ignore
  return asm(
    ...SNIPPETS.POP_D,
    `@${label}`,
    'D;JNE'
  );
}

module.exports = {
  writeLabel,
  writeGoto,
  writeIf,
};
