const { error } = require('console');
const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find the file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('There was an error writing data');
      resolve('Success writing file!');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
    await writeFilePro('dog-image.txt', res.body.message);
    console.log('Random dog image saved to a file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
};

getDogPic();

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     return writeFilePro('dog-image.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to a file!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
