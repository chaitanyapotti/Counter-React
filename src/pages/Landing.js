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
  ClaimModal
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
    console.log(hasTransactionAlready.amount === 0);
    this.setState({
      account: account[0],
      network: network,
      kovanBalance: kovanBalance,
      rinkebyBalance: rinkebyBalance
    });
  }

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
    console.log("state", this.state);
    return (
      <div className="landing-img">
        <Header account={this.state.account} />
        <Grid>
          <Row>
            <Col lg={7} xs={12} style={{ height: "100vh" }}>
              ""
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
                {this.state.account !== undefined ? (
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
                        <Trade class="push--top txt-l" onClick={this.toggle} />
                        <Claim
                          class="push--top push--left txt-l"
                          onClick={this.claimToggle}
                        />
                      </div>
                    ) : (
                      this.state.network === "rinkeby" && (
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
                          />
                          <Claim
                            class="push--top push--left txt-l"
                            onClick={this.claimToggle}
                          />
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="txt-xl text--primary push-top--45">
                    Please unlock/install metamask and then refresh the page
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </Grid>
        <TradeModal
          toggle={this.toggle}
          modal={this.state.modal}
        />
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
