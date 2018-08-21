import React from "react";
import ModalComponent from "../ModalComponent";
import ClaimForm from "../../pages/ClaimForm";

const ClaimModal = props => (
  <ModalComponent toggle={props.claimToggle} modal={props.claimModal}>
    <ClaimForm onTransaction={props.onTransaction} />
  </ModalComponent>
);

export default ClaimModal;
