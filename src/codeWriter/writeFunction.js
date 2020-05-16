const { asm } = require('../util/util');
const { SNIPPETS } = require('../constants');

function* initLocal(nVars) {
  for (let i = 0; i < nVars; i++) {
    yield asm(
      // push 0
      'D=0',
      ...SNIPPETS.PUSH_D
    );
  }
}

function writeFunction(functionName, nVars) {
  // prettier-ignore
  return asm(
    `(${functionName})`,
    ...initLocal(nVars)
  );
}

module.exports = {
  writeFunction,
};
