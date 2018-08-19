/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

class ModalComponent extends React.Component {

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop="static" size="lg">
          <ModalBody>
            {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggle}>Ok</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;