const parseLine = require('../parseLine');
const { COMMAND_TYPES } = require('../../constants');

test('parses push', () => {
  const line = 'push local 0';
  const result = {
    commandType: COMMAND_TYPES.PUSH,
    arg1: 'local',
    arg2: 0,
    vm: line,
  };
  expect(parseLine(line)).toEqual(result);
});

test('parses pop', () => {
  const line = 'pop static 71';
  const result = {
    commandType: COMMAND_TYPES.POP,
    arg1: 'static',
    arg2: 71,
    vm: line,
  };
  expect(parseLine(line)).toEqual(result);
});

test('parses arithmetic type', () => {
  const line = 'add';
  const result = {
    commandType: COMMAND_TYPES.ARITHMETIC,
    arg1: 'add',
    vm: line,
  };
  expect(parseLine(line)).toEqual(result);
});

test('throws error on invalid command', () => {
  const line = 'invalid static 0';
  expect(() => parseLine(line)).toThrow();
});

test('throws error on int in arg2', () => {
  const line = 'push constant ABC';
  expect(() => parseLine(line)).toThrow();
});
