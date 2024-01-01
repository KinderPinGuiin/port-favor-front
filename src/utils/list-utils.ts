export function preprend<T>(list: T[], value: T) {
  const newList = list.slice();
  newList.unshift(value);
  return newList;
}

export function fill<T>(arr: T[], value: T, start: number, end: number) {
  const newArray = arr.slice(0);

  for (let i = start; i <= end; i++) {
    newArray[i] = value;
  }

  return newArray;
}