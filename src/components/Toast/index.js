import React, { Component } from 'react';
import { ToastContainer} from 'react-toastify';
 
class Toast extends Component {
    render(){
      return (
        <div>
          <ToastContainer
            position="bottom-center"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange={false}
            draggable={false} />
        </div>
      );
    }
}

export default Toast;