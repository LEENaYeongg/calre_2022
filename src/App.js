import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Calendar } from './components';

class App extends Component {
  render() {
      return (
        <div>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login/>}/>
              <Route path="/calendar" element={<Calendar/>}/>
            </Routes>
          </Router>
        </div>
      );
  }
}

export default App;