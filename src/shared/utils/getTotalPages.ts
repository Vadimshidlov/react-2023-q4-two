export default function getTotalPages(countElements: number): number {
  return Math.ceil(countElements / 10);
}
