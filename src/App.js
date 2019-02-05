import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

import ClientInput from './components/clientInput/ClientInput';
import StateTax from './components/StateTax';
import UserTaxes from './components/UserTaxes';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <div>
      <span><Link to="/clientinput"> Information Input - Step 1 </Link></span>
      <span><Link to="/clienttaxes"> Review your taxes - Step 2 </Link></span>
      <span><Link to="/statetax"> State Tax Details - Step 3 </Link></span>
      </div>
       <Route path="/clientinput" exact render={() => <ClientInput/>} />
       <Route path="/clienttaxes" exact render={() => <UserTaxes/>} />
       <Route path="/statetax" exact render={() => <StateTax/>} />
      </div>
      </Router>
    );
  }
}

export default App;
