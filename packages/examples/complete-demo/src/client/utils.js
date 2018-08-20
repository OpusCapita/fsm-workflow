export const baseUrl = process.env.BASE_URL || '/';

export const url = path => `${baseUrl}${path}`.replace(/\/{2,}/, '/');
