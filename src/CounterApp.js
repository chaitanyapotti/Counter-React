import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class CounterApp extends React.PureComponent {
  
  render() {
    return (
      <div>
        {/* <HeaderPartial /> */}
        <div className="main-content">
          {this.props.children}
          {/* <FooterPartial /> */}
        </div>
      </div>
    );
  }
}

CounterApp.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(CounterApp);