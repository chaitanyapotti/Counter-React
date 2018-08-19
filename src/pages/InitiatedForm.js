import React, { Component } from "react";
import { Form } from "reactstrap";
import Web3 from "web3";
import web3 from "../helpers/web3";
import counterRinkeby from "../helpers/contractInstances/counterRinkeby";
import counterErcRinkeby from "../helpers/contractInstances/counterErcRinkeby";
import counterKovan from "../helpers/contractInstances/counterKovan";
import {
  abi,
  counterKovanAddress,
  counterRinkebyAddress
} from "../helpers/contractInstances/counterDetails";
import {
  TextField,
  Approve,
  CreateTransaction,
  FetchDetails
} from "../components";
import counterErcKovan from "../helpers/contractInstances/counterErcKovan";

class InitiatedForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initiatorAddress: "",
      amountNyto: "",
      amountSpv: "",
      addressTrading: "",
      encodedSecret: "",
      isApproved: false,
      isCreated: false,
      message: "" //Use message to set what to show on error window
    };
  }

  web3Read = network => {
    const kovanInfura =
      "https://kovan.infura.io/v3/dc22c9c6245742069d5fe663bfa8a698";
    const rinkebyInfura =
      "https://rinkeby.infura.io/v3/dc22c9c6245742069d5fe663bfa8a698";
    switch (network) {
      case "rinkeby":
      default:
        return new Web3(rinkebyInfura);
      case "kovan":
        return new Web3(kovanInfura);
    }
  };

  onApproveClick = async event => {
    event.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.net.getNetworkType();
      let txResponse;
      this.setState({ message: "waiting on approve..." });
      if (network === "rinkeby") {
        txResponse = await counterErcRinkeby.methods
          .approve(counterRinkeby.options.address, this.state.amountNyto)
          .send({ from: accounts[0] });
      } else if (network === "kovan") {
        txResponse = await counterErcKovan.methods
          .approve(counterKovan.options.address, this.state.amountSpv)
          .send({ from: accounts[0] });
      }
      if (typeof txResponse !== undefined)
        this.setState({
          message: "approved...",
          isApproved: true,
          isCreated: false
        });
    } catch (error) {
      this.setState({
        message: "something went wrong. Please try again",
        isApproved: false
      });
    }
  };

  onTransactionClick = async event => {
    event.preventDefault();
    //Show encodedSecret to user in the input form
    try {
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.net.getNetworkType();
      let txResponse;
      this.setState({ message: "waiting on approve..." });
      //2nd param should be state's trading with partner
      if (network === "rinkeby") {
        txResponse = await counterRinkeby.methods
          .createTx(
            this.props.isInitiator,
            this.state.addressTrading,
            this.state.encodedSecret,
            counterErcRinkeby.options.address,
            this.state.amountNyto
          )
          .send({
            from: accounts[0]
          });
      } else if (network === "kovan") {
        txResponse = await counterKovan.methods
          .createTx(
            this.props.isInitiator,
            this.state.addressTrading,
            this.state.encodedSecret,
            counterErcKovan.options.address,
            this.state.amountSpv
          )
          .send({
            from: accounts[0]
          });
      }
      if (typeof txResponse !== undefined)
        this.setState({ message: "approved...", isCreated: true });
    } catch (error) {
      this.setState({
        message: "something went wrong. Please try again",
        isCreated: false
      });
    }
  };

  onFetchDetails = async event => {
    const network = await web3.eth.net.getNetworkType();
    let txResponse;
    const web3Read = this.web3Read(network === "rinkeby" ? "kovan" : "rinkeby");
    if (network === "rinkeby") {
      txResponse = await new web3Read.eth.Contract(
        abi,
        counterKovanAddress
      ).methods
        .transactionMapping(this.state.initiatorAddress)
        .call();

      this.setState({
        amountSpv: txResponse.amount
      });
    } else if (network === "kovan") {
      txResponse = await new web3Read.eth.Contract(
        abi,
        counterRinkebyAddress
      ).methods
        .transactionMapping(this.state.initiatorAddress)
        .call();
      this.setState({
        amountNyto: txResponse.amount
      });
    }
    console.log(txResponse);
    this.setState({
      encodedSecret: txResponse.digest,
      addressTrading: this.state.initiatorAddress
    });
  };

  render() {
    return (
      <div>
        <h2>Transaction Details</h2>
        <TextField
          label="Enter the address of the Initiator"
          placeholder="Address"
          value={this.state.initiatorAddress}
          onChange={event =>
            this.setState({ initiatorAddress: event.target.value })
          }
        />
        <FetchDetails onClick={this.onFetchDetails} />
        <Form>
          <TextField
            label="Encoded Secret"
            name="encodedSecret"
            value={this.state.encodedSecret}
          />
          <TextField
            label="Amount Nyto:"
            name="amountNyto"
            value={this.state.amountNyto}
            onChange={event =>
              this.setState({ amountNyto: event.target.value })
            }
          />
          <TextField
            label="Amount Spv:"
            name="amount-spv"
            value={this.state.amountSpv}
            onChange={event => this.setState({ amountSpv: event.target.value })}
          />
          <TextField
            label="Address Trading With:"
            name="address-trading"
            value={this.state.addressTrading}
          />
        </Form>

        <div>
          <Approve
            onClick={this.onApproveClick}
            disabled={this.state.isApproved}
          />
          <CreateTransaction
            disabled={this.state.isCreated}
            class="push--left"
            onClick={this.onTransactionClick}
          />
        </div>
      </div>
    );
  }
}
export default InitiatedForm;
