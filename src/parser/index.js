const { lines, clean } = require('../util/util');
const parseLine = require('./parseLine');

function* parser(vmCode) {
  let count = 0;
  for (let line of lines(vmCode)) {
    line = clean(line);
    if (!line) continue;
    try {
      yield parseLine(line);
    } catch (error) {
      throw new Error(
        `[PARSE ERROR] ${error.messsage || error} in line ${line}:${count}`
      );
    }
    count++;
  }
}

module.exports = parser;
