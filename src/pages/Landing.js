import React, { Component } from "react";
import { Button, Card } from "reactstrap";
import { Link } from "react-router-dom";
import web3 from "../utility/web3";
import { Grid, Col, Row } from "../helpers/Grid";
import {Header} from '../components';

class Landing extends Component {
  state = {
    account: "",
    network: ""
  };

  async componentDidMount() {
    const account = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    this.setState({
      account: account[0],
      network: network
    });
  }

  render() {
      console.log('network', this.state.network);
    return (
        <div className="landing-img">
            <Header account={this.state.account}/>
            <Grid>
                <Row>
                <Col lg={8} xs={12} style={{height:'100vh'}}></Col>
                <Col lg={4} xs={12} style={{height:'100vh'}} className="push-top--150">
                    <Card style={{padding: '40px'}}>
                        <div className="fnt-65 txt-grad">COUNTER</div>
                        <div className="txt-xxxxl opacity-50 mrgn-landng-txt">OTC Trades made easy</div>
                        {this.state.account !== undefined ? (
                        <div>
                            {
                            this.state.network === "kovan"?
                                <div className="push-top--45 txt-xxl">
                                    <div>Network Type - Kovan</div>
                                    <div>Spv - 100</div>
                                    <Link to="/form">
                                        <Button className="push--top txt-l" color="primary">Trade</Button>
                                    </Link>
                                    <Link to="/form">
                                        <Button className="push--top push--left txt-l" color="primary">Claim</Button>
                                    </Link>
                                </div>
                            :
                                <div className="push-top--45 txt-xxl">
                                    <div>RinkeBy</div>
                                    <div>Ny to: 100</div>
                                    <Link to="/form">
                                        <Button className="push--top txt-l" color="primary">Trade</Button>
                                    </Link>
                                    <Link to="/form">
                                        <Button className="push--top push--left txt-l" color="primary">Claim</Button>
                                    </Link>
                                </div>
                            }
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
