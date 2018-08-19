import React from "react";
import ModalComponent from "../ModalComponent";
import ClaimForm from "../../pages/ClaimForm";
import TextField from "../TextField";

const ClaimModal = props => (
  <ModalComponent toggle={props.claimToggle} modal={props.claimModal}>
    <ClaimForm />
  </ModalComponent>
);

export default ClaimModal;
