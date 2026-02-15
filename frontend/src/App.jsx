import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import MainPage from './pages/MainPage.jsx';
import RegistrationForm from './pages/PageLogin.jsx';
import NotFound from './pages/PageNotFound.jsx';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="login" element={<RegistrationForm />} />
        <Route path="notFound" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;