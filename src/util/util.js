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
  return str.replace(/\/\/.*/, '').trim();
}

function asm(...args) {
  if (Array.isArray(args[0])) {
    args = args[0];
  }
  return args.join('\n');
}

const labelCount = {};
function label(a) {
  labelCount[a] = labelCount[a] || 0;
  return `${a}_${labelCount[a]++}`;
}

module.exports = {
  lines,
  clean,
  asm,
  label,
};
