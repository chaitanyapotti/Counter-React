import React, { Component } from "react";

class Initiator extends Component {
    state = {
        isInitiator: true
    }

    handleCheckClick = () => {
        this.setState({ isInitiator: !this.state.isInitiator });
    }

    render() {
        return (
            <div>               
                <form>
                    <div>
                        <label>Select if you wish to initiate a new trade</label>
                        <input type="checkbox" checked={this.state.isInitiator} onChange={this.handleCheckClick} className="checkbox-item" />                        
                    </div>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    };
}

export default Initiator;