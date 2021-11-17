import { IUsers } from "../types/data";


export const groupBy = (input: any[], key: string) => {
  return input.reduce((acc, currentValue) => {
    let groupKey = currentValue[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(currentValue);
    return acc;
  }, {});
};

//formula from 'https://newbedev.com/javascript-get-5-random-unique-elements-from-array-js-code-example'
export function getRandom(arr: IUsers[], n: number) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);

  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
