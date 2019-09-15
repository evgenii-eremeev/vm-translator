const segmentPointers = {
  local: 'LCL',
  argument: 'ARG',
  this: 'THIS',
  that: 'THAT',
};

function writePush(segment, index) {
  const segmentPointer = segmentPointers[segment];

  return [
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
    `M=M+1`,
  ].join('\n');
}

function writePop(segment, index) {
  const segmentPointer = segmentPointers[segment];

  return [
    // addr = segmentPointer + i
    `@${index}`,
    `D=A`,
    `@${segmentPointer}`,
    `D=D+M`,
    `@addr`,
    `M=D`,
    // SP--
    `@SP`,
    `M=M-1`,
    `A=M`,
    `D=M`,
    // *addr = *SP
    `@addr`,
    `A=M`,
    `M=D`,
  ].join('\n');
}

module.exports = {
  writePush,
  writePop,
};
