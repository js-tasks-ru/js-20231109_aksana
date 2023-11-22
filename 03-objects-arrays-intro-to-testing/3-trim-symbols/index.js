/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) return '';
  if (!size) return string;

  let trimmedStr = '';
  let identicalCharsQty = 1;
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) === string.charCodeAt(i - 1)) identicalCharsQty++;
    trimmedStr += string[i];

    if (identicalCharsQty === size) {
      while (string.charCodeAt(i + 1) === string.charCodeAt(i) && i < string.length - 1) {
        i++;
      }
      identicalCharsQty = 1
    }
  }
  return trimmedStr;
}
