import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './static/css/app.css';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === deleteValue) {         
        this.splice(i, 1);
        i--;
      }
    }
    return this;
};
  
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
