const solc = require("solc");
const path = require("path");
const fs = require("fs");

const counterPath = path.resolve(__dirname,".." ,"contracts", "NytoToken.sol");
const counterFileStream = fs.readFileSync(counterPath, "utf8");

module.exports = solc.compile(counterFileStream, 1).contracts[':NytoToken'];
//npm install --save solc