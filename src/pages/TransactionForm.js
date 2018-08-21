import React, { Component } from "react";
import { Form } from "reactstrap";
import web3 from "../helpers/web3";
import counterRinkeby from "../helpers/contractInstances/counterRinkeby";
import counterErcRinkeby from "../helpers/contractInstances/counterErcRinkeby";
import counterKovan from "../helpers/contractInstances/counterKovan";
import { TextField, Approve, CreateTransaction } from "../components";
import counterErcKovan from "../helpers/contractInstances/counterErcKovan";

class TransactionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secret: "",
      amountNyto: "",
      amountSpv: "",
      addressTrading: "",
      encodedSecret: "",
      isApproved: false,
      isCreated: true,
      message: "" //Use message to set what to show on error window
    };
  }

  calculateEncodedSecret = async event => {
    event.persist();
    const secret = event.target.value;
    const encodedSecret = await web3.utils.soliditySha3(secret);
    console.log(encodedSecret);
    this.setState({ encodedSecret: encodedSecret, secret: secret });
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
      this.props.onTransaction(
        network,
        txResponse.transactionHash,
        accounts[0],
        "approve"
      );
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
      this.props.onTransaction(
        network,
        txResponse.transactionHash,
        accounts[0],
        "create"
      );
      if (typeof txResponse !== undefined)
        this.setState({ message: "approved...", isCreated: true });
    } catch (error) {
      this.setState({
        message: "something went wrong. Please try again",
        isCreated: false
      });
    }
  };

  render() {
    return (
      <div>
        <h2>Transaction Details</h2>
        <Form>
          <TextField
            label="Secret"
            name="secret"
            value={this.state.secret}
            onChange={event => this.calculateEncodedSecret(event)}
          />
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
            onChange={event =>
              this.setState({ addressTrading: event.target.value })
            }
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

export default TransactionForm;
