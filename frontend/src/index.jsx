import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/index.jsx';
import AuthProvider from './context/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('chat'))
  .render(
    <AuthProvider>
      <Provider store={ store }>
        <App />
      </Provider>
    </AuthProvider>
);