// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';

import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
import { ReactNode, useContext, useEffect } from 'react';

import { ThemeContext, ThemeProvider } from '@/contexts/ThemeContext';

import Header from '@/components/Header';

function ThemedApp({ children }: { children: ReactNode }): JSX.Element {
  const { currentTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = `${currentTheme}-theme`;
  }, [currentTheme]);

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <ThemedApp>
        <Header />
        <Component {...pageProps} />
      </ThemedApp>
    </ThemeProvider>
  );
}
