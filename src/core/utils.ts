import { DATA } from '@/configs/blogs';

export function randomNumber(min: number, max: number) {
  return parseInt(String(Math.random() * (max - min + 1)), 10) + min;
}

export function getBlogsDetails(id: string | (string | null)[]) {
  if (Array.isArray(id) || id === null) return '';
  return DATA[+id].content || id;
}
