import '../styles/globals.css'
import { Provider } from 'react-redux';
import { store } from '../reducers';
import AuthProvider from '../components/AuthProvider';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return <Provider store={store}>
        <Head>
        <title>Select Parfumeries</title>
        <meta
          name="color-scheme"
          content="only light"
        />
      </Head>
        <AuthProvider Component={Component}  pageProps={pageProps}/>   
    </Provider>
}

export default MyApp