/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const locales = ['ru', 'en'];
  const arrCopy = [...arr];

  return arrCopy.sort((a, b) => {
    const result = a.localeCompare(b, locales, {caseFirst: 'upper'});
    if (param === 'asc') { return result; }
    if (result === -1) { return 1; }
    else if (result === 1) { return -1; }
    return 0;
  });
}
