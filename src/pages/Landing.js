import React, { Component } from "react";
import { Card, Table } from "reactstrap";
import { toast } from "react-toastify";
import web3 from "../helpers/web3";
import { Grid, Col, Row } from "../helpers/Grid";
import counterErcKovan from "../helpers/contractInstances/counterErcKovan";
import counterErcRinkeby from "../helpers/contractInstances/counterErcRinkeby";
import {
  Header,
  Trade,
  Claim,
  Toast,
  TradeModal,
  ClaimModal,
  Refund
} from "../components";
import counterKovan from "../helpers/contractInstances/counterKovan";
import counterRinkeby from "../helpers/contractInstances/counterRinkeby";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      network: undefined,
      kovanBalance: 0,
      rinkebyBalance: 0,
      modal: false,
      claimModal: false,
      hasTransactionAlready: false,
      hasRefunded: false,
      hash: "",
      toastText:"",
      transactions: []
    };
  }

  async componentDidMount() {
    const account = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    let hasTransactionAlready;
    let kovanBalance = 0;
    let rinkebyBalance = 0;
    if (network === "kovan") {
      kovanBalance = await counterErcKovan.methods.balanceOf(account[0]).call();
      hasTransactionAlready = await counterKovan.methods
        .transactionMapping(account[0])
        .call();
    }
    if (network === "rinkeby") {
      rinkebyBalance = await counterErcRinkeby.methods
        .balanceOf(account[0])
        .call();
      hasTransactionAlready = await counterRinkeby.methods
        .transactionMapping(account[0])
        .call();
    }
    if (localStorage.getItem("txHistory") !== null) {
      const txHistory = JSON.parse(localStorage.getItem("txHistory"));
      txHistory.clean(null);
      // Removing the duplicates object
      const txArray = [...this.state.transactions, ...txHistory];
      var uniqueArray = this.removeDuplicates(txArray, "hash");
      this.setState({
        transactions: uniqueArray
      });
    }
    //Property to check if has transaction
    this.setState({
      account: account[0],
      network: network,
      kovanBalance: kovanBalance,
      rinkebyBalance: rinkebyBalance,
      hasTransactionAlready:
        hasTransactionAlready && hasTransactionAlready.amount !== "0",
      hasRefunded: hasTransactionAlready && hasTransactionAlready.amount === "0"
    });
  }

  removeDuplicates = (array, key) => {
    return array.reduce((arr, item) => {
      const removed = arr.filter(i => i[key] !== item[key]);
      return [...removed, item];
    }, []);
  };

  onRefundClick = async () => {
    try {
      const account = await web3.eth.getAccounts();
      const network = await web3.eth.net.getNetworkType();
      let txHash;
      if (network === "kovan") {
        txHash = (await counterKovan.methods.refund().send({
          from: account[0]
        })).transactionHash;
      }
      if (network === "rinkeby") {
        txHash = (await counterRinkeby.methods.refund().send({
          from: account[0]
        })).transactionHash;
      }
      this.setState({ hasRefunded: true });
      this.onTransaction(network, txHash, account[0], "refund");
    } catch (error) {
      this.setState({ hasRefunded: false });
    }
  };

  onTransaction = (network, txHash, user, type) => {
    this.setState({
      toastText:
        "Check Status here: " +
        "https://" +
        network +
        ".etherscan.io/tx/" +
        txHash,
      hash:"https://" + network + ".etherscan.io/tx/" + txHash,
      transactions: this.state.transactions.concat({
        network: network,
        hash: "https://" + network + ".etherscan.io/tx/" + txHash,
        user: user,
        type: type
      })
    });
    let txOld = JSON.parse(localStorage.getItem("txHistory"));
    if (txOld !== undefined && txOld !== null)
      localStorage.setItem(
        "txHistory",
        JSON.stringify(this.state.transactions.concat(txOld))
      );
    else
      localStorage.setItem(
        "txHistory",
        JSON.stringify(this.state.transactions)
      );
    this.notify();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  claimToggle = () => {
    this.setState({
      claimModal: !this.state.claimModal
    });
  };

  notify = () => toast.success(<a href={this.state.hash} target="_blank">{this.state.toastText}</a>,
  {
    closeOnClick: false
  });

  render() {
    const transArray = this.state.transactions;
    const userAccount = this.state.account;
    const userNetwork = this.state.network;

    const filteredList = transArray.filter(val => {
      return (val.user === userAccount && val.network === userNetwork)
    })
  
    return (
      <div className="landing-img">
        <Header account={this.state.account} />
        <Grid>
          <Row>
            <Col
              lg={7}
              xs={12}
              style={{ height: "100vh" }}
              className="push-top--150"
            >
              <Card style={{ padding: "20px", width: "650px" }}>
                <div className="txt-xxxxl txt-grad">Transaction History </div>
                <Table borderless className="push--top txt-xxl">
                  <tbody>
                    {filteredList &&
                      filteredList.map((item, i) => (
                          <tr style={{color: 'rgba(0,0,0,0.8)'}} key={i}>
                            <td>{item.type}</td>
                            <td>
                               <a href={item.hash} style={{color: 'black', fontSize: '12px'}} target="_blank"><div>{item.hash}</div> </a>
                            </td>
                          </tr> 
                      ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col
              lg={5}
              xs={12}
              style={{ height: "100vh" }}
              className="push-top--150"
            >
              <Card style={{ padding: "40px", width: "500px" }}>
                <div className="fnt-65 txt-grad">COUNTER</div>
                <div className="txt-xxxxl opacity-50 mrgn-landng-txt">
                  OTC Trades made easy
                </div>
                {// this.state.network !== "" ? (
                this.state.network !== undefined ? (
                  <div>
                    {this.state.network === "kovan" ? (
                      <div className="push-top--45 txt-xxl">
                        <Table borderless>
                          <tbody>
                            <tr>
                              <td>Network Type</td>
                              <td>Kovan</td>
                            </tr>
                            <tr>
                              <td>Token Name</td>
                              <td>Stokens Fund SPV</td>
                            </tr>
                            <tr>
                              <td>Token Balance</td>
                              <td>{this.state.kovanBalance}</td>
                            </tr>
                          </tbody>
                        </Table>
                        <Trade
                          class="push--top txt-l"
                          disabled={this.state.hasTransactionAlready}
                          onClick={this.toggle}
                        />
                        <Claim
                          class="push--top push--left txt-l"
                          onClick={this.claimToggle}
                        />
                        <Refund
                          class="push--top push--left txt-l"
                          disabled={this.state.hasRefunded}
                          onClick={this.onRefundClick}
                        />
                      </div>
                    ) : this.state.network === "rinkeby" ? (
                      <div className="push-top--45 txt-xxl">
                        <Table borderless>
                          <tbody>
                            <tr>
                              <td>Network Type</td>
                              <td>Rinkeby</td>
                            </tr>
                            <tr>
                              <td>Token Name</td>
                              <td>New York Tower One</td>
                            </tr>
                            <tr>
                              <td>Token Balance</td>
                              <td>{this.state.rinkebyBalance}</td>
                            </tr>
                          </tbody>
                        </Table>
                        <Trade
                          class="push--top txt-l"
                          onClick={this.toggle}
                          disabled={this.state.hasTransactionAlready}
                        />
                        <Claim
                          class="push--top push--left txt-l"
                          onClick={this.claimToggle}
                        />
                        <Refund
                          class="push--top push--left txt-l"
                          disabled={this.state.hasRefunded}
                          onClick={this.onRefundClick}
                        />
                      </div>
                    ) : (
                      <div className="txt-xl text--primary push-top--45">
                        Please note that only Rinkeby/Kovan networks are
                        supported
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="txt-xl text--primary push-top--45">
                    Please unlock/install metamask and then refresh the page
                  </div>
                )

                //) : (
                //   <div className="txt-xl text--primary push-top--45">
                //     Please unlock/install metamask and then refresh the page
                //   </div>
                // )
                }
              </Card>
            </Col>
          </Row>
        </Grid>
        <TradeModal
          toggle={this.toggle}
          modal={this.state.modal}
          onTransaction={this.onTransaction}
        />
        <ClaimModal
          claimModal={this.state.claimModal}
          claimToggle={this.claimToggle}
          onTransaction={this.onTransaction}
        />
        <Toast />
      </div>
    );
  }
}

export default Landing;
