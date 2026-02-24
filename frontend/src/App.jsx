import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import MainPage from './pages/MainPage.jsx';
import RegistrationForm from './pages/PageLogin.jsx';
import NotFound from './pages/PageNotFound.jsx';
import PageSignup from './pages/PageSignup.jsx';
import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<RegistrationForm />} />
        <Route path="*" element={<NotFound />} />
        <Route path="signup" element={<PageSignup />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  );
}

export default App;