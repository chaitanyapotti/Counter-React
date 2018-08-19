import React from 'react';
import Toggle from 'react-toggle'

const ToggleSwitch = (props) =>
    <label>
        <Toggle
            defaultChecked={props.checked}
            className='custom-classname'
            onChange={props.onToggle} />
    </label>

export default ToggleSwitch;