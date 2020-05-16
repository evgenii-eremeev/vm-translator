const { asm } = require('../util/util');
const { writeCall } = require('./writeCall');

function writeInit() {
  return asm(
    '// init',
    // SP=256
    '@256',
    'D=A',
    '@SP',
    'M=D',
    writeCall('Sys.init', 0, `null$ret.0`)
  );
}

module.exports = {
  writeInit,
};
