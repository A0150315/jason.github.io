import md1 from '@/assets/blogs/从0开始学习Typescript.md';
import md2 from '@/assets/blogs/简单的富文本编辑器实践.md';
import md3 from '@/assets/blogs/Nuxt配合Node在实际生产中的应用.md';

export const DATA = [md1, md2, md3];

export default [
  { divider: true },
  { heading: 'Blogs' },
  ...DATA.map((_, index) => ({
    icon: 'mdi-@',
    text: `Article ${index}`,
    to: `/blogs/${index}`
  }))
];
