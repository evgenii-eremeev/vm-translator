const labelCount = {};
function label(a) {
  labelCount[a] = labelCount[a] || 0;
  return `${a}_${labelCount[a]++}`;
}

function jump(op) {
  return {
    eq: 'JEQ',
    gt: 'JGT',
    lt: 'JLT',
  }[op];
}

function asm(...args) {
  return args.join('\n');
}

// prettier-ignore
function writeArithmetic2(op) {
  const TRUE = label('TRUE');
  const END = label('END');
  const code = [
    // SP--, R13 = *SP
    '@SP',
    'AM=M-1',
    'D=M',
    '@R13',
    'M=D',
    // SP--, R14 = *SP
    '@SP',
    'AM=M-1',
    'D=M',
    '@R14',
    'M=D',
    // D = R14 = x, M = R13 = y
    '@R14',
    'D=M',
    '@R13',
  ];
  switch (op) {
    case 'add':
      code.push('D=D+M');
      break;
    case 'sub':
      code.push('D=D-M');
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
        'D=D-M',
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
  code.push(
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1'
  );
  return asm(...code);
}

// prettier-ignore
function writeArithmetic1(op) {
  const code = [
    // SP--, D = *SP
    '@SP',
    'AM=M-1',
    'D=M',
  ];
  switch (op) {
    case 'neg':
      code.push('D=-D');
      break;
    case 'not':
      code.push('D=!D');
      break;
  }
  code.push(
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1'
  );
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
