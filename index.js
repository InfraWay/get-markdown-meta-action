const fs = require('fs');
const md = require('meta-marked');

const {
  INPUT_MARKDOWN_FILE,
  INPUT_BASE_URL = '',
} = process.env;

const getFileContents = async (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

(async () => {
  try {
    const data = await getFileContents(INPUT_MARKDOWN_FILE);
    const { meta } = md(data);
    Object.keys(meta).forEach(key => {
      if (meta.hasOwnProperty(key)) {
        let value;
        if (Array.isArray(meta[key])) {
          value = meta[key].join(',');
          if (key === 'tags') {
            console.log(`::set-output name=social_tags::#${meta[key].join(' #')}`);
          }
        }
        if (typeof meta[key] === 'string') {
          value = meta[key];
        }
        if (!value) {
          return;
        }
        if (key === 'socialImage') {
          console.log(`::set-output name=social_image::${INPUT_BASE_URL}${value}`);
          return;
        }
        if (key === 'slug') {
          console.log(`::set-output name=url::${INPUT_BASE_URL}/posts/${value}`);
        }
        console.log(`::set-output name=${key}::${value}`);
      }
    });
    process.exit(0);
  } catch (err) {
    console.log(`::error ::${err.message}`);
    process.exit(1);
  }
})();
