const {
  PUSH,
  POP,
  ARITHMETIC,
  LABEL,
  GOTO,
  IF,
} = require('../constants').COMMAND_TYPES;
const writePush = require('./writePush');
const writePop = require('./writePop');
const writeArithmetic = require('./writeArithmetic');
const { writeLabel, writeGoto, writeIf } = require('./branching');

function* writer(commandsIt, fileName) {
  for (const { commandType, arg1, arg2, vm } of commandsIt) {
    yield `// ${vm}`;
    switch (commandType) {
      case PUSH:
        yield writePush(arg1, arg2, fileName);
        break;
      case POP:
        yield writePop(arg1, arg2, fileName);
        break;
      case ARITHMETIC:
        yield writeArithmetic(arg1);
        break;
      case LABEL:
        yield writeLabel(arg1);
        break;
      case GOTO:
        yield writeGoto(arg1);
        break;
      case IF:
        yield writeIf(arg1);
        break;
      default:
        throw new Error(`Unknown command type ${commandType}`);
    }
  }
}

module.exports = writer;
