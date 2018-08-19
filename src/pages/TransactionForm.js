import React, { Component } from "react";
import { Form } from "reactstrap";
import web3 from "../helpers/web3";
import counterRinkeby from "../helpers/contractInstances/counterRinkeby";
import counterErcRinkeby from "../helpers/contractInstances/counterErcRinkeby";
import counterKovan from "../helpers/contractInstances/counterKovan";
import { TextField, Approve, Claim, CreateTransaction } from "../components";

class TransactionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secret: "",
      amountNyto: "",
      amountSpv: "",
      addressTrading: ""
    };
  }

  onApproveClick = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "waiting on approve..." });
    await counterErcRinkeby.methods
      .approve(counterErcRinkeby.options.address, this.state.amountNyto)
      .send({ from: accounts[0] });
    this.setState({ message: "approved..." });
  };
  onTransactionClick = async event => {
    const encodedSecret = await web3.utils.soliditySha3(this.state.secret);
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "waiting on approve..." });
    //2nd param should be state's trading with partner
    await counterRinkeby.methods
      .createTx(
        true,
        this.state.addressTrading,
        encodedSecret,
        counterErcRinkeby.options.address,
        this.state.amountNyto
      )
      .send({
        from: accounts[0]
      });
    this.setState({ message: "approved..." });
  };
  onClaimClick = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "waiting on approve..." });
    //address trading with should be param 2
    await counterKovan.methods
      .claim(this.state.secret, this.state.addressTrading, this.state.amountSpv)
      .send({
        from: accounts[0]
      });
    this.setState({ message: "approved..." });
  };
  render() {
    console.log("state", this.state);
    return (
      <div>
        <h2>Transaction Details</h2>
        <Form>
          <TextField 
            label="Secret"
            name="secret"
            value={this.state.secret}
            onChange={event => this.setState({ secret: event.target.value })}
          />
          <TextField 
            label="Amount Nyto:"
            name="amountNyto"
            value={this.state.amountNyto}
            onChange={event => this.setState({ amountNyto: event.target.value })}
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
            onChange={event => this.setState({ addressTrading: event.target.value })}
          />
        </Form>

        <div><Approve onClick={this.onApproveClick}/></div>
        <div><CreateTransaction onClick={this.onTransactionClick}/></div>
        <div><Claim onClick={this.onClaimClick}/></div>
      </div>
    );
  }
}

export default TransactionForm;
