const { asm, label } = require('../util');

function jump(op) {
  return {
    eq: 'JEQ',
    gt: 'JGT',
    lt: 'JLT',
  }[op];
}

// prettier-ignore
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
    'D=M'
  ],
  PUSH: [
    // *SP = D, SP++
    '@SP', 
    'A=M', 
    'M=D', 
    '@SP', 
    'M=M+1'
  ]
};

function writeArithmetic2(op) {
  const TRUE = label('TRUE');
  const END = label('END');
  const code = [
    // M = x, D = y
    ...SNIPPETS.POP_D,
    ...SNIPPETS.POP_M,
  ];
  switch (op) {
    case 'add':
      code.push('D=D+M');
      break;
    case 'sub':
      code.push('D=M-D');
      break;
    case 'and':
      code.push('D=D&M');
      break;
    case 'or':
      code.push('D=D|M');
      break;
    case 'eq':
    case 'gt':
    case 'lt':
      code.push(
        'D=M-D',
        `@${TRUE}`,
        `D;${jump(op)}`,
        'D=0',
        `@${END}`,
        '0;JMP',
        `(${TRUE})`,
        'D=-1',
        `(${END})`
      );
      break;
  }
  code.push(...SNIPPETS.PUSH);
  return asm(...code);
}

function writeArithmetic1(op) {
  const code = [...SNIPPETS.POP_D];
  switch (op) {
    case 'neg':
      code.push('D=-D');
      break;
    case 'not':
      code.push('D=!D');
      break;
  }
  code.push(...SNIPPETS.PUSH);
  return asm(...code);
}

function writeArithmetic(op) {
  switch (op) {
    case 'add':
    case 'sub':
    case 'eq':
    case 'gt':
    case 'lt':
    case 'and':
    case 'or':
      return writeArithmetic2(op);
    case 'neg':
    case 'not':
      return writeArithmetic1(op);
    default:
      throw new Error(`Unknown operation ${op}`);
  }
}

module.exports = writeArithmetic;
