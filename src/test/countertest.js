const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const assert = require("assert");

const seedWords = "young hurdle crash lounge because walk captain cruise garden column receive water";

const providerRinkeby = new HDWalletProvider(seedWords,
    "https://rinkeby.infura.io/v3/dc22c9c6245742069d5fe663bfa8a698", 0, 10
);

const providerKovan = new HDWalletProvider(seedWords,
    "https://kovan.infura.io/v3/3a8a111599ea498c8317dd8a1796cc16", 0, 10
);

//npm install --save web3
//npm install --save truffle-hdwallet-provider

const rinkebyContractAddress = "0x1D6184C2F2D960A593264ABF5d95DA66eEd4a972";
const rinkebyERCContractAddress = "0x9af4dB363Dade1835FCEa3beA93a26bA6baFd208";
const kovanContractAddress = "0x2DCc83F3abdcAee34E96733fc8845132e82515Ce";
const kovanERCContractAddress = "0x44997F9D7b218d05FC1F6b9C0A8EaaCBE88A6A2C";
let accountsRinkeby;
let accountskovan;

let rinkebyContract;
let rinkebyERCContract;
let kovanContract;
let kovanERCContract;

const counterABI = [{"constant":false,"inputs":[{"name":"_hash","type":"string"},{"name":"_initiator","type":"address"},{"name":"_amountExpected","type":"uint256"}],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"refund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"transactionMapping","outputs":[{"name":"isInitiator","type":"bool"},{"name":"timeOut","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"destination","type":"address"},{"name":"erc20","type":"address"},{"name":"digest","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"isInitiator","type":"bool"},{"name":"dest","type":"address"},{"name":"digest","type":"bytes32"},{"name":"erc20","type":"address"},{"name":"amount","type":"uint256"}],"name":"createTx","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
const tokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupplyAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

//Rinkeby
const web3Rinkeby = new Web3(providerRinkeby);
//Ropsten
const web3Kovan = new Web3(providerKovan);

const setupAccounts = async () => {
    accountsRinkeby = await web3Rinkeby.eth.getAccounts();
    accountsKovan = await web3Kovan.eth.getAccounts();
    //console.log("Hi2");
    rinkebyContract = await new web3Rinkeby.eth.Contract(counterABI, rinkebyContractAddress);
    rinkebyERCContract = await new web3Rinkeby.eth.Contract(tokenABI, rinkebyERCContractAddress);
    kovanContract = await new web3Kovan.eth.Contract(counterABI, kovanContractAddress);
    kovanERCContract = await new web3Kovan.eth.Contract(tokenABI, kovanERCContractAddress);

    console.log(rinkebyContract.options.address);
};

const setup = async () => {
    //console.log("Hi");
    await setupAccounts();
    await createTx();
};

setup();

const createTx = async () => {
    
        const secret = "electus";
        const amountNyto = 1000;
        const amountSpv = 200;
        const encodedSecret = await web3Rinkeby.utils.soliditySha3(secret);
        console.log(encodedSecret);
        await rinkebyERCContract.methods.approve(rinkebyContract.options.address, amountNyto).send({
            from: accountsRinkeby[1]
        });
        console.log("approval 1 done");
        await kovanERCContract.methods.approve(kovanContract.options.address, amountSpv).send({
            from: accountsKovan[2]
        });
        console.log("approval 2 done");
        await rinkebyContract.methods.createTx(true, accountsKovan[2], encodedSecret, 
            rinkebyERCContract.options.address, amountNyto).send({
            from: accountsRinkeby[1]
        });
        console.log("create 1 done");
        await kovanContract.methods.createTx(false, accountsRinkeby[1], encodedSecret, 
            kovanERCContract.options.address, amountSpv).send({
            from: accountsKovan[2]
        });
        console.log("create 2 done");
        await kovanContract.methods.claim(secret, accountsKovan[2], amountSpv).send({
            from: accountsRinkeby[1]
        });
        console.log("claim 1 done");
        await rinkebyContract.methods.claim(secret, accountsRinkeby[1], amountNyto).send({
            from: accountsKovan[2]
        });
        console.log("claim 2 done");
    };

    // it("refund transactions", async () => {
    //     try {
    //         const secret = "electus";
    //         const amountNyto = 1000;
    //         const amountSpv = 200;
    //         const encodedSecret = await web3Rinkeby.utils.soliditySha3(secret);
    //         await rinkebyERCContract.methods.approve(rinkebyContract.options.address, amountNyto).send({
    //             from: accountsRinkeby[1]
    //         });
    
    //         await kovanERCContract.methods.approve(kovanContract.options.address, amountSpv).send({
    //             from: accountsKovan[2]
    //         });
    
    //         await rinkebyContract.methods.createTx(true, kovanaccounts[2], encodedSecret, 
    //             rinkebyERCContract.options.address, amountNyto).send({
    //             from: accountsRinkeby[1]
    //         });
    
    //         await kovanContract.methods.createTx(false, rinkebyaccounts[1], encodedSecret, 
    //             kovanERCContract.options.address, amountSpv).send({
    //             from: accountsKovan[2]
    //         });
    //         //Do this after 1 hr
    //         //wait(3600000);
    //         await rinkebyContract.methods.refund().send({
    //             from: accountsRinkeby[1]
    //         });
    
    //         await kovanContract.methods.refund().send({
    //             from: accountsKovan[2]
    //         });
    //     } catch (error) {
    //         assert(error);
    //     }
        
    // });