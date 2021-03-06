const abi = [
  {
    constant: false,
    inputs: [
      { name: "_hash", type: "string" },
      { name: "_initiator", type: "address" },
      { name: "_amountExpected", type: "uint256" }
    ],
    name: "claim",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "refund",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "transactionMapping",
    outputs: [
      { name: "isInitiator", type: "bool" },
      { name: "timeOut", type: "uint256" },
      { name: "amount", type: "uint256" },
      { name: "destination", type: "address" },
      { name: "erc20", type: "address" },
      { name: "digest", type: "bytes32" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "isInitiator", type: "bool" },
      { name: "dest", type: "address" },
      { name: "digest", type: "bytes32" },
      { name: "erc20", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    name: "createTx",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  }
];

const counterKovanAddress = "0x2DCc83F3abdcAee34E96733fc8845132e82515Ce";
const counterRinkebyAddress = "0x1D6184C2F2D960A593264ABF5d95DA66eEd4a972";

export { abi, counterKovanAddress, counterRinkebyAddress };
