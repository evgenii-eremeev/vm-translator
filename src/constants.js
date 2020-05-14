const COMMAND_TYPES = {
  ARITHMETIC: 'C_ARITHMETIC',
  PUSH: 'C_PUSH',
  POP: 'C_POP',
  LABEL: 'C_LABEL',
  GOTO: 'C_GOTO',
  IF: 'C_IF',
  FUNCTION: 'C_FUNCTION',
  RETURN: 'C_RETURN',
  CALL: 'C_CALL',
};

const SEGMENTS = {
  local: 'LCL',
  argument: 'ARG',
  this: 'THIS',
  that: 'THAT',
};

const SNIPPETS = {
  POP_M: [
    // SP--, M = *SP
    '@SP',
    'AM=M-1',
  ],
  POP_D: [
    // SP--, D = *SP,
    '@SP',
    'AM=M-1',
    'D=M',
  ],
  PUSH: [
    // *SP = D, SP++
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1',
  ],
};

module.exports = { COMMAND_TYPES, SEGMENTS, SNIPPETS };
