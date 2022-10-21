import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from '../redux/store';
import '../styles/globals.scss';
import '../styles/reset.scss';
import theme from '../theme/theme';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <CssBaseline />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
