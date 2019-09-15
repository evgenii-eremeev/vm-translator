const { PUSH, POP } = require('../parser/commandTypes');
const { writePush, writePop } = require('./core');

function* writer(commandsIt) {
  for (const { commandType, arg1, arg2, vmLine } of commandsIt) {
    yield `// ${vmLine}`;
    switch (commandType) {
      case PUSH:
        yield writePush(arg1, arg2);
        break;
      case POP:
        yield writePop(arg1, arg2);
        break;
      default:
        throw new Error(`Unknown command type ${commandType}`);
    }
  }
}

module.exports = writer;
