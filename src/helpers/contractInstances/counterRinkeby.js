import web3 from "../web3";
import { abi, counterRinkebyAddress } from "./counterDetails";
export default new web3.eth.Contract(abi, counterRinkebyAddress);
