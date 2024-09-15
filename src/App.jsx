import Authentication from './components/pages/authentication/Authentication';
import Home from './components/pages/home/Home';
import './index.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/authentication" element={<Authentication />} />
    </Routes>
  );
}

export default App;
