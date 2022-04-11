import { Route, Routes } from 'react-router-dom'

import Header from './components/header'

import Home from './components/homepage'
import Login from './components/login'

const App = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>



    </div>
  );
}

export default App;
