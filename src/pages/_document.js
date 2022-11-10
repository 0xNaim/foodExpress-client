import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <meta charSet='utf-8' />
        <meta
          name='description'
          content='FoodExpress E-commerce Web Application'
        />
        <meta name='theme-color' content='#fff' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/apple-touch-icon.png' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png'></link>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
