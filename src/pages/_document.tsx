import { Html, Head, Main, NextScript } from 'next/document';

import { ThemeProvider } from '@/contexts/ThemeContext';

import { Favicon } from '@/components/Favicon';

export default function Document(): JSX.Element {
  return (
    <ThemeProvider>
      <Html lang="pt-br">
        <Head>
          <Favicon />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </ThemeProvider>
  );
}
