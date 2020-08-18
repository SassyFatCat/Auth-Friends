import React, {useState} from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import PrivateRoute from './Components/PrivateRoute';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
const [form, setForm] = useState({
  username: 'Lambda School',
  password: 'i<3Lambd4'
});
const [loading, setLoading] = useState(false);

  return (
    <section>
      <header>
          <h1>Auth-Friends App</h1>
            <nav className='nav'>
              <Link className='link' to='/login'>Login</Link>
              <Link className='link' to='dashboard'>Dashboard</Link>
            </nav>
      </header>
      
      <Switch>
        <Route exact path='/'>
          <h2>Welcome to Auth-Friends App</h2>
        </Route>

        <Route path='/login' component={Login} />

        <PrivateRoute path='/dashboard' component={Dashboard} />
      </Switch>

    </section>
  );
}

export default App;
