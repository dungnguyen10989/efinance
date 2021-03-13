const fs = require('fs');

const extensions = ['.png', '.jpg', '.jpeg', '.json'];

const readFiles = (path) => {
  const array = fs
    .readdirSync(path)
    .filter((file) => {
      const dot = file.lastIndexOf('.');
      const ext = file.slice(dot, file.length);
      return extensions.includes(ext.toLowerCase());
    })
    .map((fileNameFilter) =>
      fileNameFilter.replace('@2x', '').replace('@3x', ''),
    );

  return Array.from(new Set(array));
};

const writeFile = (path) => {
  const propertiesImage = readFiles(path)
    .map((file) => {
      const dot = file.lastIndexOf('.');
      const ext = file.slice(dot, file.length);
      const name = file.slice(0, dot);
      const key = name.replace(/-/g, '_');

      return `  ${key}: require('./${name}${ext}')`;
    })
    .join(',\n');
  const line = propertiesImage ? `${propertiesImage},` : '';
  const string = `export default {
${line}
};
`;

  fs.writeFileSync(`${path}/index.ts`, string, 'utf8');
};

const execute = () => {
  writeFile('src/assets/icon');
  writeFile('src/assets/img');
  writeFile('src/assets/lottie');
};

execute();
