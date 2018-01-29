// prefixed (semi)UUID
export const uidFor = prefix => `${prefix}_${String(Math.random() * Math.random()).slice(2)}`;

export const isDef = v => v !== undefined && v !== null;

