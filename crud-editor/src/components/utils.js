export const state2rs = value => ({ value, label: value });

export const rs2state = ({ value }) => value;

export const getExistingStates = transitions => transitions.reduce(
  (states, { from, to }) => [
    ...states,
    ...[from, to].filter(name => states.indexOf(name) === -1)
  ], []
).filter(Boolean)

// prefixed (semi)UUID
export const uidFor = prefix => `${prefix}_${String(Math.random() * Math.random()).slice(2)}`;

export const isDef = v => v !== undefined && v !== null;
