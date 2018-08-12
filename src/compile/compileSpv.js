const solc = require("solc");
const path = require("path");
const fs = require("fs");

const counterPath = path.resolve(__dirname,"..", "contracts", "SpvToken.sol");
const counterFileStream = fs.readFileSync(counterPath, "utf8");
console.log(solc.compile(counterFileStream, 1).contracts[':SpvToken']);
module.exports = solc.compile(counterFileStream, 1).contracts[':SpvToken'];
//npm install --save solc