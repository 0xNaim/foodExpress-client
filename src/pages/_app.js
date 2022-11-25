import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Layout from '../components/layout';
import Loading from '../components/ui/loading/Loading';
import { persistor, store } from '../redux/store';
import '../styles/globals.scss';
import '../styles/reset.scss';
import theme from '../theme/theme';

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Elements stripe={stripePromise}>
            <Suspense fallback={<Loading />}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Suspense>
          </Elements>
          <CssBaseline />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
