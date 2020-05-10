const { asm } = require('../util');

const { SEGMENTS } = require('../constants');

function writePushSegment(segment, index) {
  const segmentPointer = SEGMENTS[segment];

  return asm(
    // addr = segmentPointer + i
    `@${index}`,
    `D=A`,
    `@${segmentPointer}`,
    `A=D+M`,
    `D=M`,
    // *SP = *addr
    `@SP`,
    `A=M`,
    `M=D`,
    // SP++
    `@SP`,
    `M=M+1`
  );
}

function writePushConstant(c) {
  // prettier-ignore
  return asm(
    `@${c}`,
    `D=A`,
    `@SP`,
    `A=M`,
    `M=D`,
    `@SP`,
    `M=M+1`
  );
}

function writePushLabel(label) {
  // prettier-ignore
  return asm(
    `@${label}`,
    `D=M`,
    `@SP`,
    `A=M`,
    `M=D`,
    `@SP`,
    `M=M+1`
  );
}

function writePush(segment, index, fileName) {
  switch (segment) {
    case 'local':
    case 'argument':
    case 'this':
    case 'that':
      return writePushSegment(segment, index);
    case 'constant':
      return writePushConstant(index);
    case 'static':
      return writePushLabel(`${fileName}.${index}`);
    case 'temp': {
      if (index > 7)
        throw new Error('Index for temp should be in [0..7] range');
      const label = 'R' + (5 + index);
      return writePushLabel(label);
    }
    case 'pointer': {
      if (index < 0 || index > 1)
        throw new Error('Index of push should be 0 or 1');
      const label = index === 0 ? 'THIS' : 'THAT';
      return writePushLabel(label);
    }
    default:
      throw new Error(`Unknown push serment ${segment}`);
  }
}

module.exports = writePush;
