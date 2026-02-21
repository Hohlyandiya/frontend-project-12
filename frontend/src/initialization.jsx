import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/index.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import i18next from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import resources from './locales/index.jsx'

const initialization = () => {

  const i18n = i18next.createInstance()

  i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru",
  });

  return (
    <I18nextProvider i18n={ i18n }>
      <AuthProvider>
        <Provider store={ store }>
          <App />
        </Provider>
      </AuthProvider>
    </I18nextProvider>
  )
}

export default initialization