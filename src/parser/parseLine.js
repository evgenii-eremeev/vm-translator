const commandTypes = require('./commandTypes');

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
        commandType: commandTypes.PUSH,
        arg1,
        arg2: toInt(arg2),
      };
    }
    case 'pop':
      return {
        commandType: commandTypes.POP,
        arg1,
        arg2: toInt(arg2),
      };
    case 'add':
    case 'sub':
    case 'neg':
    case 'eq':
    case 'gt':
    case 'lt':
    case 'end':
    case 'or':
    case 'not':
      return {
        commandType: commandTypes.ARITHMETIC,
        arg1: command,
      };
    default:
      throw new Error(`Unvalid command ${command}`);
  }
}

module.exports = parseLine;
