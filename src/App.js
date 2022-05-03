// import { Route, Routes } from 'react-router-dom'

import Header from './components/header'

import Home from './components/home/home'
import Login from './components/login/login'

const App = () => {
  return (
    <div className="App">
      <Header />

        <Routes>
          <Route path="/home" element={<Home path="home"/>} />
          <Route path="/" element={<Login />} />
          <Route path="/order/:id" element={<Home path="order" />} />
          <Route path="/order/:id/:deliveryId" element={<Home path="order" />} />
        </Routes>



    </div>
  );
}

export default App;
