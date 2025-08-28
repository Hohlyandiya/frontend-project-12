import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import MainPage from './Components/MainPage.jsx';
import RegistrationForm from './Components/Pages/Login/PageLogin.jsx';
import NotFound from './Components/Pages/NotFound/PageNotFound.jsx';

const App = () => {

  return (
    /* { <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} >
          <Route index element={<div>No page is selected.</div> } />
          <Route path="login" element={<RegistrationForm />} />
          <Route path="notFound" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter> } */
    <>
      <RegistrationForm />
    </>
  );
}

export default App;