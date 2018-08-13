import React, { Component } from "react";

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secret: this.props.secret,
      amountNyto: this.props.amountNyto,
      amountSpv: this.props.amountSpv,
      addressTrading: this.props.addressTrading
    };
  }
  render() {
    return (
      <div>
        <h2>Transaction Details</h2>
        <form>
          <label>Secret:</label>
          <input
            type="text"
            name="name"
            className="secret"
            value={this.state.secret}
            onChange={event => this.setState({ secret: event.target.value })}
          />
          <label>Amount Nyto:</label>
          <input
            type="text"
            name="name"
            className="amount-nyto"
            value={this.state.amountNyto}
            onChange={event =>
              this.setState({ amountNyto: event.target.value })
            }
          />
          <label>Amount Spv:</label>
          <input
            type="text"
            name="name"
            className="amount-spv"
            value={this.state.amountSpv}
            onChange={event => this.setState({ amountSpv: event.target.value })}
          />

          <label>Address Trading With:</label>
          <input
            type="text"
            name="name"
            className="address-trading"
            value={this.state.addressTrading}
            onChange={event =>
              this.setState({ addressTrading: event.target.value })
            }
          />
        </form>
      </div>
    );
  }
}

export default UserForm;
