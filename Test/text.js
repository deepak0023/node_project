const { people, ages } = require('./Test/people');
const os = require('os');

console.log(people, ages);
console.log(os.platform(), os.homedir());

const speak = () => {
    console.log('hello, students');
}
  
speak();

// Can also use global.setTimeout()

setTimeout(() => {
    console.log('in the timeout');
    clearInterval(int);
  }, 3000);
  
  const int = setInterval(() => {
    console.log('in the interval');
  }, 1000);
  
  console.log(__dirname);
  console.log(__filename);
  