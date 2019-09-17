exports.COMMAND_TYPES = {
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

exports.SEGMENTS = {
  local: 'LCL',
  argument: 'ARG',
  this: 'THIS',
  that: 'THAT',
};