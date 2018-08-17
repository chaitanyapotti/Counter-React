import Web3 from "web3";

let web3;
if (window.web3 != null) web3 = new Web3(window.web3.currentProvider);
else console.log("Install Metamask");
export default web3;
