export const baseUrl = (document.baseURI || '/').replace(new RegExp(`\.+${window.location.host}`), '');

console.log('client baseUrl', { baseUrl });

export const url = path => `${baseUrl}${path}`.replace(/\/{2,}/, '/');
