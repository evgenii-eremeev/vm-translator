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
const { writePush } = require('./writePush');
const writePop = require('./writePop');
const writeArithmetic = require('./writeArithmetic');
const { writeLabel, writeGoto, writeIf } = require('./branching');
const { writeCall } = require('./writeCall');
const { writeFunction } = require('./writeFunction');
const { writeReturn } = require('./writeReturn');

function getLabelSymbol(functionName, label) {
  return `${functionName}$${label}`;
}

function createGenReturnLabel() {
  const labels = {};
  return functionName => {
    labels[functionName] = (labels[functionName] || 0) + 1;
    return `${functionName}$ret.${labels[functionName]}`;
  };
}

function* writer(commands, fileName) {
  const genReturnLabel = createGenReturnLabel();
  let functionName = null;
  for (const { commandType, arg1, arg2, vm } of commands) {
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
        yield writeLabel(getLabelSymbol(functionName, arg1));
        break;
      case GOTO:
        yield writeGoto(getLabelSymbol(functionName, arg1));
        break;
      case IF:
        yield writeIf(getLabelSymbol(functionName, arg1));
        break;
      case FUNCTION:
        functionName = arg1;
        yield writeFunction(arg1, arg2);
        break;
      case CALL:
        yield writeCall(arg1, arg2, genReturnLabel(functionName));
        break;
      case RETURN:
        yield writeReturn();
        break;
      default:
        throw new Error(`Unknown command type ${commandType}`);
    }
  }
}

module.exports = writer;
