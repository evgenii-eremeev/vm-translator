const { asm } = require('../util/util');
const { SNIPPETS, FRAME_SIZE } = require('../constants');

function writeReturn() {
  return asm(
    // endFrame = R13 = D = LCL
    '@LCL',
    'D=M',
    '@R13',
    'M=D',
    // retAddr = R14 = *(endFrame - FRAME_SIZE)
    `@${FRAME_SIZE}`,
    'D=D-A',
    'A=D',
    'D=M',
    '@R14',
    'M=D',
    // *ARG = pop()
    ...SNIPPETS.POP_D,
    '@ARG',
    'A=M',
    'M=D',
    // SP = ARG + 1
    '@ARG',
    'D=M',
    '@SP',
    'M=D+1',
    // THAT = *(endFrame – 1)
    '@R13',
    'AM=M-1',
    'D=M',
    '@THAT',
    'M=D',
    // THIS = *(endFrame – 2)
    '@R13',
    'AM=M-1',
    'D=M',
    '@THIS',
    'M=D',
    // ARG = *(endFrame – 3)
    '@R13',
    'AM=M-1',
    'D=M',
    '@ARG',
    'M=D',
    // LCL = *(endFrame – 4)
    '@R13',
    'AM=M-1',
    'D=M',
    '@LCL',
    'M=D',
    // goto retAddr
    '@R14',
    'A=M',
    '0;JMP'
  );
}

module.exports = {
  writeReturn,
};
