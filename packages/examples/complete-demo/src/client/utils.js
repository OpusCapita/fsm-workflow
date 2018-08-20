export const baseUrl = process.env.BASE_URL || '/';

console.log('client baseUrl', { baseUrl });

export const url = path => `${baseUrl}${path}`.replace(/\/{2,}/, '/');
