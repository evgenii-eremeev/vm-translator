const {
  PUSH,
  POP,
  ARITHMETIC,
  LABEL,
  GOTO,
  IF,
  CALL,
  FUNCTION,
  RETURN,
} = require('../constants').COMMAND_TYPES;

function toInt(arg) {
  if (!/^[0-9]+$/.test(arg)) {
    throw new Error(`Int parsing error of "${arg}"`);
  }
  return Number(arg);
}

function parseLine(vm) {
  const [command, arg1, arg2] = vm.split(' ');
  switch (command) {
    case 'push': {
      return {
        commandType: PUSH,
        arg1,
        arg2: toInt(arg2),
        vm,
      };
    }
    case 'pop':
      return {
        commandType: POP,
        arg1,
        arg2: toInt(arg2),
        vm,
      };
    case 'add':
    case 'sub':
    case 'neg':
    case 'eq':
    case 'gt':
    case 'lt':
    case 'and':
    case 'or':
    case 'not':
      return {
        commandType: ARITHMETIC,
        arg1: command,
        vm,
      };
    case 'label':
      return {
        commandType: LABEL,
        arg1,
        vm,
      };
    case 'goto':
      return {
        commandType: GOTO,
        arg1,
        vm,
      };
    case 'if-goto':
      return {
        commandType: IF,
        arg1,
        vm,
      };
    case 'call':
      return {
        commandType: CALL,
        arg1,
        arg2: toInt(arg2),
        vm,
      };
    case 'function':
      return {
        commandType: FUNCTION,
        arg1,
        arg2: toInt(arg2),
        vm,
      };
    case 'return':
      return {
        commandType: RETURN,
        vm,
      };
    default:
      throw new Error(`Unvalid command ${command}`);
  }
}

module.exports = parseLine;
