import Web3 from "web3";

const kovanInfura =
  "https://kovan.infura.io/v3/dc22c9c6245742069d5fe663bfa8a698";
const rinkebyInfura =
  "https://rinkeby.infura.io/v3/dc22c9c6245742069d5fe663bfa8a698";

function getWeb3(network) {
  switch (network) {
    case "rinkeby":
    default:
      return new Web3(rinkebyInfura);
    case "kovan":
      return new Web3(kovanInfura);
  }
}

export default function getWeb3(network);
