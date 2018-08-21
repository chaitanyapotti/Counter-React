import React, { Component } from "react";
import { Form } from "reactstrap";
import web3 from "../helpers/web3";
import counterRinkeby from "../helpers/contractInstances/counterRinkeby";
import counterKovan from "../helpers/contractInstances/counterKovan";
import { TextField, FetchDetails, Claim } from "../components";

class ClaimForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counterpartyAddress: "",
      secret: "",
      amount: "",
      isClaimed: false
    };
  }

  onClaimClick = async event => {
    event.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.net.getNetworkType();
      this.setState({ message: "waiting on approve..." });
      let txHash;
      //address trading with should be param 2
      if (network === "kovan") {
        txHash = await counterKovan.methods
          .claim(
            this.state.secret,
            this.state.counterpartyAddress,
            this.state.amount
          )
          .send({
            from: accounts[0]
          }).transactionHash;
      } else if (network === "rinkeby") {
        txHash = await counterRinkeby.methods
          .claim(
            this.state.secret,
            this.state.counterpartyAddress,
            this.state.amount
          )
          .send({
            from: accounts[0]
          }).transactionHash;
      }
      this.props.onTransaction(network, txHash, accounts[0], "claim");
      this.setState({
        message: "approved...",
        isClaimed: true
      });
    } catch (error) {
      this.setState({
        message: "something went wrong. Please try again",
        isClaimed: false
      });
    }
  };

  onFetchDetails = async event => {
    const network = await web3.eth.net.getNetworkType();
    let txResponse;
    if (network === "rinkeby") {
      txResponse = await counterRinkeby.methods
        .transactionMapping(this.state.counterpartyAddress)
        .call();
    } else if (network === "kovan") {
      txResponse = await counterKovan.methods
        .transactionMapping(this.state.counterpartyAddress)
        .call();
    }
    console.log(txResponse);
    this.setState({
      amount: txResponse.amount
    });
  };

  render() {
    return (
      <div>
        <h2>Transaction Details</h2>

        <Form>
          <div>
            <TextField
              label="Enter the counterparty address"
              placeholder="Address"
              value={this.state.counterpartyAddress}
              onChange={event =>
                this.setState({ counterpartyAddress: event.target.value })
              }
            />
            <FetchDetails class="push--bottom" onClick={this.onFetchDetails} />
          </div>
          <TextField
            label="Secret"
            name="secret"
            value={this.state.secret}
            onChange={event => this.setState({ secret: event.target.value })}
          />
          <TextField label="Amount" name="amount" value={this.state.amount} />
        </Form>

        <Claim onClick={this.onClaimClick} disabled={this.state.isClaimed} />
      </div>
    );
  }
}

export default ClaimForm;
