import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import web3 from "../web3";
import { Grid, Col, Row } from "../helpers/Grid";

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
    return (
      <Grid>
        <Row>
          <Col lg={8} xs={12}>
            Image
          </Col>
          <Col lg={4} xs={12}>
            <div>COUNTER</div>
            <div>OTC Trades made easy</div>
            {this.state.account !== undefined ? (
              <div>
                <div>
                  You're logged in as {this.state.account} in the{" "}
                  {this.state.network} network
                </div>
                <Link to="/form">
                  <Button color="primary">Initiate Trade</Button>
                </Link>
              </div>
            ) : (
              <div>
                Please unlock/install metamask and then refresh the page
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Landing;
