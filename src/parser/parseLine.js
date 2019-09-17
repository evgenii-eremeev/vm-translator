const { PUSH, POP, ARITHMETIC } = require('../constants').COMMAND_TYPES;

function toInt(arg) {
  if (!/^[0-9]+$/.test(arg)) {
    throw new Error(`Int parsing error of "${arg}"`);
  }
  return Number(arg);
}

function parseLine(line) {
  const [command, arg1, arg2] = line.split(' ');
  switch (command) {
    case 'push': {
      return {
        commandType: PUSH,
        arg1,
        arg2: toInt(arg2),
        vm: line,
      };
    }
    case 'pop':
      return {
        commandType: POP,
        arg1,
        arg2: toInt(arg2),
        vm: line,
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
        vm: line,
      };
    default:
      throw new Error(`Unvalid command ${command}`);
  }
}

module.exports = parseLine;
