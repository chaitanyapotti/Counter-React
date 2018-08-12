const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const {
    interface,
    bytecode
} = require("../compile/compileCounter");

const seedWords = "young hurdle crash lounge because walk captain cruise garden column receive water";

const providerKovan = new HDWalletProvider(seedWords,
    "https://kovan.infura.io/v3/3a8a111599ea498c8317dd8a1796cc16", 0, 10
);

//Contract - 0x2DCc83F3abdcAee34E96733fc8845132e82515Ce

//npm install --save web3
//npm install --save truffle-hdwallet-provider

let kovanAddress;
let accounts;

//Kovan
const web3Kovan = new Web3(providerKovan);

const deployBoth = async () => {
    kovanToken = await deploy(web3Kovan, interface, bytecode);
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