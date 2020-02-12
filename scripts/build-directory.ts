import fs from 'fs';

const output = (files: string[]) => {
  let content = '// @ts-ignore\r\r';
  let filesMapArrString = 'export const DATA = [';

  files.forEach((fileName, index) => {
    content += `import md${index} from '@/assets/blogs/${fileName}';\r`;
    filesMapArrString += `{ content : md${index}, name : "${fileName.replace(
      /\.md$/,
      ''
    )}" }`;
    if (index === files.length - 1) {
      filesMapArrString += '];';
    } else {
      filesMapArrString += ', ';
    }
  });
  content += `\r${filesMapArrString}\r`;
  content +=
    '\rexport default [{ divider: true }, { heading: "Blogs" }, ...DATA.map((file, index) => ({  icon: null,  text: file.name,  to: `/blogs/${index}`}))];\r';

  fs.writeFile('./src/configs/blogs.ts', content, err => {
    if (err) throw err;
    // @ts-ignore
    else console.log('写文件操作成功');
  });
};

fs.readdir('./src/assets/blogs', (err, files) => {
  if (err) throw err;
  if (files.length) output(files);
});
