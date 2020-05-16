const { asm } = require('../util/util');
const { SNIPPETS, FRAME_SIZE } = require('../constants');

function pushAddress(label) {
  // prettier-ignore
  return asm(
    `@${label}`,
    'D=A',
    ...SNIPPETS.PUSH_D
  )
}

function pushValue(label) {
  // prettier-ignore
  return asm(
    `@${label}`,
    'D=M',
    ...SNIPPETS.PUSH_D
  )
}

function writeCall(functionName, nArgs, returnSymbol) {
  return asm(
    pushAddress(returnSymbol),
    pushValue('LCL'),
    pushValue('ARG'),
    pushValue('THIS'),
    pushValue('THAT'),
    // ARG = SP-5-nArgs
    '@SP',
    'D=M',
    `@${FRAME_SIZE + nArgs}`,
    'D=D-A',
    '@ARG',
    'M=D',
    // LCL = SP
    '@SP',
    'D=M',
    '@LCL',
    'M=D',
    // goto functionName
    `@${functionName}`,
    '0;JMP',
    `(${returnSymbol})`
  );
}

module.exports = {
  writeCall,
};
