export function sortAlphabetically(a: string, b: string): number {
  return a.toLocaleLowerCase() > b.toLocaleLowerCase() ? 1 : -1;
}
