function* lines(data) {
  let line = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i] === '\n') {
      yield line;
      line = '';
    } else if (data[i] === '\r' && data[i + 1] === '\n') {
      i++;
      yield line;
      line = '';
    } else {
      line += data[i];
    }
  }
  yield line;
}

function clean(str) {
  return str.replace(/\/\/.+/, '').trim();
}

function asm(...args) {
  return args.join('\n');
}

module.exports = {
  lines,
  clean,
  asm,
};
