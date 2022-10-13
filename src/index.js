import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Contextuser, { Context } from './firbase/store/Context';
import firebase from './firbase/config'
ReactDOM.render(
<Context.Provider value={{firebase}}>
<Contextuser>
    <App />
 </Contextuser>
</Context.Provider>
, document.getElementById('root'));
