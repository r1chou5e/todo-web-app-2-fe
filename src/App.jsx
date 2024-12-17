// App.js
import Authentication from './components/pages/authentication/Authentication';
import { LoadingProvider, useLoading } from './context/LoadingProvider';
import Home from './components/pages/home/Home';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Loading from './components/templates/common/loading/Loading';
import EmailConfirmation from './components/pages/authentication/EmailConfirmation';
import { AlertProvider, useAlert } from './context/AlertProvider';
import Alert from './components/templates/common/alert/Alert';

function App() {
  return (
    <LoadingProvider>
      <AlertProvider>
        <AppContent />
      </AlertProvider>
    </LoadingProvider>
  );
}

const AppContent = () => {
  const { isLoading } = useLoading();
  const { alert } = useAlert();

  return (
    <>
      <Loading isLoading={isLoading} />
      <Alert
        message={alert.message}
        type={alert.type}
        isVisible={alert.isVisible}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentication mode="login" />} />
        <Route path="/register" element={<Authentication mode="register" />} />
        <Route path="/verify" element={<Authentication mode="verify" />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />
      </Routes>
    </>
  );
};

export default App;
