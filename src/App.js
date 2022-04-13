import { Route, Routes } from 'react-router-dom'

import Header from './components/header'

import Home from './components/home/home'
import Login from './components/login/login'

const App = () => {
  return (
    <div className="App">
      <Header />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>



    </div>
  );
}

export default App;
