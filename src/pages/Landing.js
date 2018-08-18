import React, { Component } from "react";
import { Card } from "reactstrap";
import web3 from "../helpers/web3";
import Form from "./Form";
import { Grid, Col, Row } from "../helpers/Grid";
import { Header } from "../components";
import counterErcKovan from "../helpers/contractInstances/counterErcKovan";
import counterErcRinkeby from "../helpers/contractInstances/counterErcRinkeby";
import {Header, ModalComponent, Trade, Claim} from '../components';

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: "",
            network: "",
            kovanBalance: 0,
            rinkebyBalance: 0,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }
  
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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
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
                                    <Trade class="push--top txt-l" onClick={this.toggle}/>
                                    <Claim class="push--top push--left txt-l"  onClick={this.toggle}/>
                                </div>
                            :
                                this.state.network === "rinkeby" &&
                                    <div className="push-top--45 txt-xxl">
                                        <div>RinkeBy</div>
                                        <div>Ny to: 100</div>
                                        <Trade class="push--top txt-l" onClick={this.toggle} />
                                        <Claim class="push--top push--left txt-l" onClick={this.toggle}/>
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
            <ModalComponent toggle={this.toggle} modal={this.state.modal}>
                <Form />
            </ModalComponent>
        </div>
    );
  }
}

export default Landing;
