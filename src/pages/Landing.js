import React, { Component } from "react";
import { Form, FormGroup, Input } from "reactstrap";
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
    return (
      <Grid>
        <Row>
          <Col lg={8} xs={12}>
            Image
          </Col>
          <Col lg={4} xs={12}>
            <div>COUNTER</div>
            <div>OTC Trades made easy</div>
            <div>You're logged in as {this.state.account}</div>
            {/* <Form>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  value={this.state.account}
                />
              </FormGroup>
            </Form> */}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Landing;
