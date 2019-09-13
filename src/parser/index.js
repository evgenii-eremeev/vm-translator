const { lines } = require('../util');
const parseLine = require('./parseLine');

function* parser(vmCode) {
  let count = 0;
  for (const line of lines(vmCode)) {
    try {
      yield parseLine(line);
    } catch (error) {
      throw new Error(
        `[PARSE ERROR] ${error.messsage} in line ${line}:${count}`
      );
    }
    count++;
  }
}

module.exports = parser;
