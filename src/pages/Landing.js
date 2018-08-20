import React, { Component } from "react";
import { Card, Table } from "reactstrap";
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
      network: "",
      kovanBalance: 0,
      rinkebyBalance: 0,
      modal: false,
      claimModal: false,
      hasTransactionAlready: false,
      hasRefunded: false,
      transactions: [
        {
          name: 'kovan',
          address: 'dsjddfgdshfsdjkfsjkfs'
        },
        {
          name: 'rinkeby',
          address: 'dsjddfgdshfsdjkfsjkfs'
        },
        {
          name: 'ropstan',
          address: 'dsjddfgdshfsdjkfsjkfs'
        }
      ]
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
    //Property to check if has transaction
    this.setState({
      account: account[0],
      network: network,
      kovanBalance: kovanBalance,
      rinkebyBalance: rinkebyBalance,
      hasTransactionAlready: hasTransactionAlready && hasTransactionAlready.amount !== "0",
      hasRefunded: hasTransactionAlready && hasTransactionAlready.amount === "0"
    });
  }

  onRefundClick = async () => {
    try {
      const account = await web3.eth.getAccounts();
      const network = await web3.eth.net.getNetworkType();

      if (network === "kovan") {
        await counterKovan.methods.refund().send({
          from: account[0]
        });
      }
      if (network === "rinkeby") {
        await counterRinkeby.methods.refund().send({
          from: account[0]
        });
      }
      this.setState({ hasRefunded: true });
    } catch (error) {
      this.setState({ hasRefunded: false });
    }
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

  render() {
    console.log('state', this.state)
    return (
      <div className="landing-img">
        <Header account={this.state.account} />
        <Grid>
          <Row>
            <Col lg={7} xs={12} style={{ height: "100vh" }} className="push-top--150">
              <Card style={{ padding: "40px", width: "500px" }}>
                <div className="txt-xxxxl txt-grad">Transaction History </div>
                <Table borderless className="push--top txt-xxl">
                  <tbody>
                    {this.state.transactions.map(item => 
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                      </tr>
                    )}
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
                {this.state.account !== "" ?
                  this.state.account !== undefined ? (
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
                    ) : (
                      this.state.network === "rinkeby" ? (
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
                      )
                    :
                      (
                        <div className="txt-xl text--primary push-top--45">
                          Please unlock/install metamask and then refresh the page
                        </div>
                      )
                    )
                  }
                  </div>
                ) : (
                  <div className="txt-xl text--primary push-top--45">
                    Please unlock/install metamask and then refresh the page
                  </div>
                )
                :
                (
                  <div className="txt-xl text--primary push-top--45">
                    Please unlock/install metamask and then refresh the page
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </Grid>
        <TradeModal toggle={this.toggle} modal={this.state.modal} />
        <ClaimModal
          claimModal={this.state.claimModal}
          claimToggle={this.claimToggle}
        />
        <Toast />
      </div>
    );
  }
}

export default Landing;
