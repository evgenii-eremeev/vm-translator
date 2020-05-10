const { asm } = require('../util');
const { SEGMENTS } = require('../constants');

function writePopSegment(segment, index) {
  const segmentPointer = SEGMENTS[segment];

  return asm(
    // addr = segmentPointer + i
    `@${index}`,
    `D=A`,
    `@${segmentPointer}`,
    `D=D+M`,
    `@R13`,
    `M=D`,
    // SP--
    `@SP`,
    `AM=M-1`,
    `D=M`,
    // *addr = *SP
    `@R13`,
    `A=M`,
    `M=D`
  );
}

function writePopLabel(label) {
  // prettier-ignore
  return asm(
    `@SP`,
    `AM=M-1`,
    `D=M`,
    `@${label}`,
    `M=D`,
  );
}

function writePop(segment, index, fileName) {
  switch (segment) {
    case 'local':
    case 'argument':
    case 'this':
    case 'that':
      return writePopSegment(segment, index);
    case 'static':
      return writePopLabel(`${fileName}.${index}`);
    case 'temp': {
      if (index > 7)
        throw new Error('Index for temp should be in [0..7] range');
      const label = 'R' + (5 + index);
      return writePopLabel(label);
    }
    case 'pointer': {
      if (![0, 1].includes(index))
        throw new Error('Index of push should be 0 or 1');
      const label = index === 0 ? 'THIS' : 'THAT';
      return writePopLabel(label);
    }
    default:
      throw new Error(`Unknown pop serment ${segment}`);
  }
}

module.exports = writePop;
