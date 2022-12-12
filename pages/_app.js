import { Provider } from 'react-redux';
import '../styles/globals.css';
import { store } from '../redux/store';
import Layout from '../components/Layout/Layout';
import { persisterStore } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persisterStore}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
