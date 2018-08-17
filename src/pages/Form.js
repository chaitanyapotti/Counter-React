import React, { Component } from "react";
import web3 from '../web3'
import counterRinkeby from '../counterRinkeby'
import counterErcRinkeby from '../counterErcRinkeby'
import counterKovan from '../counterKovan'

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secret: "",
      amountNyto: "",
      amountSpv: "",
      addressTrading: ""
    };
  }

  onApproveClick = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts()
    this.setState({message: "waiting on approve..."});
    await counterErcRinkeby.methods.approve(counterErcRinkeby.options.address, this.state.amountNyto).send({from:accounts[0]})
    this.setState({message: "approved..."});
  };
  onTransactionClick = async (event) => {
    const encodedSecret = await web3.utils.soliditySha3(this.state.secret);
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message: "waiting on approve..."});
    //2nd param should be state's trading with partner
    await counterRinkeby.methods.createTx(true, this.state.addressTrading, encodedSecret, 
        counterErcRinkeby.options.address, this.state.amountNyto).send({
        from: accounts[0]
    });
    this.setState({message: "approved..."});
  };
  onClaimClick = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message: "waiting on approve..."});
    //address trading with should be param 2
    await counterKovan.methods.claim(this.state.secret, this.state.addressTrading, this.state.amountSpv).send({
        from: accounts[0]
    });
    this.setState({message: "approved..."});
  };
  render() {
    console.log('state', this.state);
    return (
      <div>
        <h2>Transaction Details</h2>
        <form>
          <label>Secret:</label>
          <input
            type="text"
            name="name"
            className="secret"
            value={this.state.secret}
            onChange={event => this.setState({ secret: event.target.value })}
          />
          <label>Amount Nyto:</label>
          <input
            type="text"
            name="name"
            className="amount-nyto"
            value={this.state.amountNyto}
            onChange={event =>
              this.setState({ amountNyto: event.target.value })
            }
          />
          <label>Amount Spv:</label>
          <input
            type="text"
            name="name"
            className="amount-spv"
            value={this.state.amountSpv}
            onChange={event => this.setState({ amountSpv: event.target.value })}
          />

          <label>Address Trading With:</label>
          <input
            type="text"
            name="name"
            className="address-trading"
            value={this.state.addressTrading}
            onChange={event =>
              this.setState({ addressTrading: event.target.value })
            }
          />
        </form>

        <input type="submit" value="Approve" onClick={this.onApproveClick} />
        <br/>
        <input type="submit" value="Create Transaction" onClick={this.onTransactionClick} />
        <br/>
        <input type="submit" value="Claim" onClick={this.onClaimClick} />
      </div>
    );
  }
}

export default Form;
