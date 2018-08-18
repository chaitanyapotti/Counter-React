import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
 
class Toast extends Component {
    notify = () => toast("Wow so easy !");
 
    render(){
      return (
        <div>
          <button onClick={this.notify}>Notify !</button>
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