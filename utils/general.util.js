exports.createIdRandomNumber = () => {
const min = 10000;
const max = 99999;
const num = Math.floor(Math.random() * (max - min + 1)) + min;
return num;
}
