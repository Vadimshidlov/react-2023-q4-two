export default function getPagesArray(pagesCount: number): number[] {
  const result: number[] = [];

  for (let i = 1; i <= pagesCount; i += 1) {
    result.push(i);
  }

  return result;
}
