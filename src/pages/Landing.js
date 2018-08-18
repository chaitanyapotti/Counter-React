import React, { Component } from "react";
import { Button, Card } from "reactstrap";
import { Link } from "react-router-dom";
import web3 from "../helpers/web3";
import { Grid, Col, Row } from "../helpers/Grid";
import { Header } from "../components";
import counterErcKovan from "../helpers/contractInstances/counterErcKovan";
import counterErcRinkeby from "../helpers/contractInstances/counterErcRinkeby";

class Landing extends Component {
  state = {
    account: "",
    network: "",
    kovanBalance: 0,
    rinkebyBalance: 0
  };

  async componentDidMount() {
    const account = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    let kovanBalance = 0;
    let rinkebyBalance = 0;
    if (network === "kovan") {
      kovanBalance = await counterErcKovan.methods.balanceOf(account[0]).call();
    }
    if (network === "rinkeby") {
      rinkebyBalance = await counterErcRinkeby.methods
        .balanceOf(account[0])
        .call();
    }
    this.setState({
      account: account[0],
      network: network,
      kovanBalance: kovanBalance,
      rinkebyBalance: rinkebyBalance
    });
  }

  render() {
    return (
      <div className="landing-img">
        <Header account={this.state.account} />
        <Grid>
          <Row>
            <Col lg={8} xs={12} style={{ height: "100vh" }} />
            <Col
              lg={4}
              xs={12}
              style={{ height: "100vh" }}
              className="push-top--150"
            >
              <Card style={{ padding: "40px" }}>
                <div className="fnt-65 txt-grad">COUNTER</div>
                <div className="txt-xxxxl opacity-50 mrgn-landng-txt">
                  OTC Trades made easy
                </div>
                {this.state.account !== undefined ? (
                  <div>
                    {this.state.network === "kovan" ? (
                      <div className="push-top--45 txt-xxl">
                        <div>Network Type - Kovan</div>
                        <div>Token Name - Stokens Fund SPV</div>
                        <div>Token Balance - {this.state.kovanBalance}</div>
                        <Link to="/form">
                          <Button className="push--top txt-l" color="primary">
                            Trade
                          </Button>
                        </Link>
                        <Link to="/form">
                          <Button
                            className="push--top push--left txt-l"
                            color="primary"
                          >
                            Claim
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      this.state.network === "rinkeby" && (
                        <div className="push-top--45 txt-xxl">
                          <div>Network Type - Rinkeby</div>
                          <div>Token Name - New York Tower One</div>
                          <div>Token Balance - {this.state.rinkebyBalance}</div>
                          <Link to="/form">
                            <Button className="push--top txt-l" color="primary">
                              Trade
                            </Button>
                          </Link>
                          <Link to="/form">
                            <Button
                              className="push--top push--left txt-l"
                              color="primary"
                            >
                              Claim
                            </Button>
                          </Link>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div>
                    Please unlock/install metamask and then refresh the page
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Landing;
