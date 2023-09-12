const { readFile, writeFile } = require("fs").promises;
/* const util = require("util"); //! a module makes promise structure for us
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile); */

//! Default promise structure
/* const getText = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}; */

//! async function for default promise
/* const start = async () => {
  try {
    const first = await getText("./content/first.txt");
    const second = await getText("./content/second.txt");
    console.log(first);
    console.log(second);
  } catch (error) {
    console.log(error);
  }
}; */

//! util
/* const start = async () => {
  try {
    const first = await readFilePromise("./content/first.txt","utf8");
    const second = await readFilePromise("./content/second.txt","utf8");
    await writeFilePromise('./content/result-mind-grenade.txt', `THIS IS AWESOME: ${first}, ${second}`, {flag:'a'})
    console.log(first,second);

  } catch (error) {
    console.log(error);
  }
}; */


const start = async () => {
  try {
    const first = await readFile("./content/first.txt","utf8");
    const second = await readFile("./content/second.txt","utf8");
    await writeFile('./content/result-mind-grenade.txt', `THIS IS AWESOME: ${first}, ${second}`, {flag:'a'})
    console.log(first,second);

  } catch (error) {
    console.log(error);
  }
};
start();
