import React, { Component } from "react";
import { Button } from "reactstrap";
import {Link} from "react-router-dom";
import web3 from "../web3";
import { Grid, Col, Row } from "../helpers/Grid";

class Landing extends Component {
  state = {
    account: ""
  };

  async componentDidMount() {
    const account = await web3.eth.getAccounts();
    this.setState({
      account: account[0]
    });
  }

  render() {
      console.log(this.state.account)
    return (
      <Grid>
        <Row>
          <Col lg={8} xs={12}>
            Image
          </Col>
          <Col lg={4} xs={12}>
            <div>COUNTER</div>
            <div>OTC Trades made easy</div>
            {
                this.state.account !== undefined ? 
                    <div>
                        <div>You're logged in as {this.state.account}</div>
                        <Link to="/form">
                            <Button color="primary">Initiate Trade</Button>
                        </Link>
                    </div>
                :
                    <div>Please Login with the metamask and then refresh the site</div>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Landing;
