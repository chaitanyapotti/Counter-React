import React from 'react';
import ModalComponent from '../ModalComponent';
import Form from '../../pages/Form';
import ToggleSwitch from '../ToggleSwitch';
import TextField from '../TextField';

const ClaimModal = (props) => 
    <ModalComponent toggle={props.claimToggle} modal={props.claimModal}>
        Claim Modal
    </ModalComponent>

export default ClaimModal;