export default (array, active) => {
  let center = array[active];
  let right1 = array[active + 1] !== undefined ? array[active + 1] : array[0];
  let right2 =
    array[active + 2] !== undefined
      ? array[active + 2]
      : array[active + 1] !== undefined
      ? array[0]
      : array[1];
  let right3 =
    array[active + 3] !== undefined
      ? array[active + 3]
      : array[active + 2] !== undefined
      ? array[0]
      : array[active + 1] !== undefined
      ? array[1]
      : array[2];
  let left1 =
    array[active - 1] !== undefined
      ? array[active - 1]
      : array[array.length - 1];
  let left2 =
    array[active - 2] !== undefined
      ? array[active - 2]
      : array[active - 1] !== undefined
      ? array[array.length - 1]
      : array[array.length - 2];
  let left3 =
    array[active - 3] !== undefined
      ? array[active - 3]
      : array[active - 2] !== undefined
      ? array[array.length - 1]
      : array[active - 1] !== undefined
      ? array[array.length - 2]
      : array[array.length - 3];

  return [left3, left2, left1, center, right1, right2, right3];
};
