export default function iff(...args) {
  // nada left to do
  if (!args.length) {
    return;
  }
  // else clause
  if (args.length === 1 && typeof args[0] === 'function') {
    return args[0]();
  }
  // default value
  if (args.length === 1) {
    return args[0];
  }

  // check the predicate
  const [p, c, ...rest] = args;
  return (p ? c() : iff(...rest));
}

if (process.env.NODE_ENV === 'test') {
  const assert = (v, msg = '') => {
    if (!v) {
      throw new Error(`Assert failed: ${msg}`);
    }
  };

  assert(
    iff(() => 1) === 1,
    'else clause is always called if it\'s the only thing supplied'
  );

  assert(
    iff(
      true,
      () => 2,
      () => 1
    ) === 2,
    'first clause is called if first predicate matches'
  );

  assert(
    iff(
      false,
      () => 3,
      true,
      () => 2,
      () => 1
    ) === 2,
    'second clause is called if second predicate matches'
  );

  assert(
    iff(
      false,
      () => 1
    ) === undefined,
    'returns undefined if no clause matches'
  );

  assert(
    iff(
      false,
      () => 1,
      0
    ) === 0,
    'returns default value if no clause matches and value supplied'
  );
}
