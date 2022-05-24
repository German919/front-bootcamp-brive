import './App.css';
import Login from './components/login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';

function App() {

  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ <Login /> }/>
          <Route path="/dashboard" element={ <Dashboard /> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
