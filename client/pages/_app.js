import '../styles/globals.css'
import { Provider } from 'react-redux';
import { store } from '../reducers';
import AuthProvider from '../components/AuthProvider';
import Head from 'next/head';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    return <Provider store={store}>
        <Head>
          <title>Селективная парфюмерия - Select Parfumeries</title>
          <meta name="description" content="Select Parfumeries — это возможность приобрести ароматы по приятным ценам как целиком (под заказ), так и на распив от 5 мл. Мы работаем исключительно с оригинальной продукцией! Любой человек сможет позволить себе разнообразие ароматов благодаря Select Parfumeries. Наша миссия подарить возможность каждому ощутить на себе ароматы мировых брендов." />
          <meta property="og:title" content="Селективная парфюмерия - Select Parfumeries" key="og-title"/>
          <meta property="og:description" content="Select Parfumeries — это возможность приобрести ароматы по приятным ценам как целиком (под заказ), так и на распив от 5 мл. Мы работаем исключительно с оригинальной продукцией! Любой человек сможет позволить себе разнообразие ароматов благодаря Select Parfumeries. Наша миссия подарить возможность каждому ощутить на себе ароматы мировых брендов." key="og-description"/>
          <meta property="og:image" content="https://selectparfumeries.ru:8080/7437b878-39e1-4c5c-b1c5-8a61e2095e0e.webp" key="og-image"/>
          <meta property="og:type" content="website" key="og-type"/>
          <meta property="og:url" content={'https://selectparfumeries.ru' + router.asPath}/>
          <meta
            name="color-scheme"
            content="only light"
          />
          <link rel="icon" href="https://selectparfumeries.ru/favicon.ico" type="image/x-icon"></link>
      </Head>
        <AuthProvider>
            <Component {...pageProps}/>
        </AuthProvider>
    </Provider>
}

export default MyApp