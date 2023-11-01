export default function getHeroNumber(heroNumber: number, currentPage: number): number {
  return heroNumber + 1 + (currentPage - 1) * 10;
}
