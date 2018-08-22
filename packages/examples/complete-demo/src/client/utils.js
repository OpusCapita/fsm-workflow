export const baseUrl = (document.baseURI || '/').replace(new RegExp(`\.+${window.location.host}`), '');

export const url = path => `${baseUrl}${path}`.replace(/\/{2,}/, '/');
