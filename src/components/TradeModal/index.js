import React from 'react';
import { Form } from "reactstrap";
import ModalComponent from '../ModalComponent';
import TransactionForm from '../../pages/TransactionForm';
import ToggleSwitch from '../ToggleSwitch';
import TextField from '../TextField';

const TradeModal = (props) => 
    <ModalComponent toggle={props.toggle} modal={props.modal}>
        {
            props.checked ?
            <div>
                <ToggleSwitch checked={props.checked} onToggle={props.onToggle} />
                <TransactionForm />
            </div>
            :
            <div>
                <ToggleSwitch checked={props.checked} onToggle={props.onToggle} />
                <Form>
                    <TextField label="Enter the Metamask Address" />
                </Form>
            </div>
        }
        
    </ModalComponent>

export default TradeModal;