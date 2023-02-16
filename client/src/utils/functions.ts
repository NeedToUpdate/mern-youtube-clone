export function shuffle(input: any[]): any[] {
  let array = Array.from(input);
  let ind = array.length;
  while (ind !== 0) {
    let rand = (Math.random() * ind) | 0;
    ind--;
    let temp = array[ind];
    array[ind] = array[rand];
    array[rand] = temp;
  }
  return array;
}
