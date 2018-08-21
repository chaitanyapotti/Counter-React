import React, { Component } from "react";
import ModalComponent from "../ModalComponent";
import TransactionForm from "../../pages/TransactionForm";
import InitiatedForm from "../../pages/InitiatedForm";
import ToggleSwitch from "../ToggleSwitch";

//Need to pass toggle state into transaction form
class TradeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      disabled: true
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
            <TransactionForm
              isInitiator={this.state.checked}
              onTransaction={this.props.onTransaction}
            />
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
            <InitiatedForm
              isInitiator={this.state.checked}
              onTransaction={this.props.onTransaction}
            />
          </div>
        )}
      </ModalComponent>
    );
  }
}

export default TradeModal;
