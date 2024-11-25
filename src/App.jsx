// App.js
import Authentication from './components/pages/authentication/Authentication';
import { LoadingProvider, useLoading } from './context/LoadingProvider';
import Home from './components/pages/home/Home';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Loading from './components/templates/common/loading/Loading';

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

const AppContent = () => {
  const { isLoading } = useLoading();

  return (
    <>
      <Loading isLoading={isLoading} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentication mode="login" />} />
        <Route path="/register" element={<Authentication mode="register" />} />
        <Route path="/verify" element={<Authentication mode="verify" />} />
      </Routes>
    </>
  );
};

export default App;
