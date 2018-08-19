import React from 'react';
import ModalComponent from '../ModalComponent';
import Form from '../../pages/Form';
import ToggleSwitch from '../ToggleSwitch';
import TextField from '../TextField';

const TradeModal = (props) => 
    <ModalComponent toggle={props.toggle} modal={props.modal}>
        {
            props.checked ?
            <div>
                <ToggleSwitch checked={props.checked} onToggle={props.onToggle} />
                <Form />
            </div>
            :
            <div>
                <ToggleSwitch checked={props.checked} onToggle={props.onToggle} />
                <TextField label="Enter the Metamask Address" />
            </div>
        }
        
    </ModalComponent>

export default TradeModal;