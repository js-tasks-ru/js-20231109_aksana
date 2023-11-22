/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(path) {
  const fields = path.split('.');
  return obj => {
    let value = obj[fields.shift()];
    for (let field of fields) {
      if (!value) break;
      value = value?.[field];
    }
    return value;
  }
}
