import React, { Component } from "react";
import { Form } from "reactstrap";
import ModalComponent from "../ModalComponent";
import TransactionForm from "../../pages/TransactionForm";
import InitiatedForm from "../../pages/InitiatedForm";
import ToggleSwitch from "../ToggleSwitch";
import TextField from "../TextField";

//Need to passs toggle state into transaction form
class TradeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      disabled: true,
      initiatorAddress: ""
    };
  }
  onToggle = () => {
    this.setState({
      checked: !this.state.checked
    });
  };
  render() {
    return (
      <ModalComponent toggle={this.props.toggle} modal={this.props.modal}>
        {this.state.checked ? (
          <div>
            <div className="push--bottom">
              <span className="txt-xl push--right">
                Do you wish to initate a trade{" "}
              </span>
              <ToggleSwitch
                checked={this.state.checked}
                onToggle={this.onToggle}
              />
            </div>
            <TransactionForm isInitiator={this.state.checked} />
          </div>
        ) : (
          <div className="push--bottom">
            <div className="txt-xl push--right">
              <span>Do you wish to initate a trade </span>
              <ToggleSwitch
                checked={this.state.checked}
                onToggle={this.onToggle}
              />
            </div>
            <TextField
              label="Enter the address of the Initiator"
              placeholder="Address"
              value={this.state.initiatorAddress}
              onChange={event =>
                this.setState({ initiatorAddress: event.target.value })
              }
            />
            <InitiatedForm
              isInitiator={this.state.checked}
              initiatorAddress={this.state.initiatorAddress}
            />
          </div>
        )}
      </ModalComponent>
    );
  }
}

export default TradeModal;
