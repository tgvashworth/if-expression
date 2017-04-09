export default function iff(...args) {
  // Nada left to do
  if (args.length === 0) {
    return;
  }
  // Else clause
  if (args.length === 1 && typeof args[0] === 'function') {
    return args[0]();
  }
  // Default value
  if (args.length === 1) {
    return args[0];
  }

  // Check the predicate (initally, called q)
  const [q, c, ...rest] = args;
  const p = (typeof q === 'function' ? q() : q);
  const f = (typeof c === 'function' ? c : () => c);
  return (p ? f() : iff(...rest));
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

  assert(
    iff(
      true,
      1,
      0
    ) === 1,
    'second clause is returned if it\'s not a function'
  );

  assert(
    iff(
      () => false,
      () => 1,
      () => 0
    ) === 0,
    'clauses can be functions'
  );
}
