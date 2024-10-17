import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Grouper from './Grouper'
import { ApiProvider } from '../hooks/UseApiContext';

const App = () => {
  return (
    <ApiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Grouper/*" element={<Grouper />} />
        </Routes>
      </Router>
    </ApiProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
