import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Initiator from "./components/initiator";
import UserForm from "./components/userForm"
import Approve from './components/approve'
import CreateTransaction from './components/createTransaction'
import Claim from './components/claim'
import web3 from './web3'
import counterRinkeby from './counterRinkeby'
import counterErcRinkeby from './counterErcRinkeby'
import counterKovan from './counterKovan'

class App extends Component {
    state = {
        secret: "",
        amountNyto: " ",
        amountSpv: " ",
        addressTrading: " "
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
        return (
            <div className="App">
                    <Initiator />
                    <UserForm secret={this.state.secret} amountNyto={this.state.amountNyto} amountSpv={this.state.amountSpv} addressTrading={this.state.addressTrading} />
                    <input type="submit" value="Approve" onClick={this.onApproveClick} />
                    <br/>
                    <input type="submit" value="Create Transaction" onClick={this.onTransactionClick} />
                    <br/>
                    <input type="submit" value="Claim" onClick={this.onClaimClick} />
            </div>
        );
    }
}

export default App;
