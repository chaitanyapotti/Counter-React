const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const {
    interface,
    bytecode
} = require("../compile/compileNyto");

const seedWords = "young hurdle crash lounge because walk captain cruise garden column receive water";

const providerRinkeby = new HDWalletProvider(seedWords,
    "https://rinkeby.infura.io/v3/dc22c9c6245742069d5fe663bfa8a698", 0, 10
);

//rinkeby - nyto
//kovan - spv

//Address - 0x9af4dB363Dade1835FCEa3beA93a26bA6baFd208

//npm install --save web3
//npm install --save truffle-hdwallet-provider

let rinkebyToken;
let accounts;

//Rinkeby
const web3Rinkeby = new Web3(providerRinkeby);

const deployBoth = async () => {
    rinkebyToken = await deploy(web3Rinkeby, interface, bytecode);
    await rinkebyToken.methods.transfer(accounts[1], 100).send({
        from: accounts[0]
    });
}

const deploy = async (web3, iface, bcode) => {
    accounts = await web3.eth.getAccounts();

    console.log("preparing to deploy from : ", accounts[0]);

    const counter = await new web3.eth.Contract(JSON.parse(iface)).deploy({
        data: "0x" + bcode
    }).send({
        from: accounts[0],
        gas: 2000000
    });

    console.log("Contract in Network is deployed at ", counter.options.address);
    return counter;
}

deployBoth();