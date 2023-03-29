/* eslint-disable @next/next/no-html-link-for-pages */

import Link from 'next/link';
import { useContext } from 'react';
import { Moon, Sun } from 'react-feather';

import { ThemeContext } from '@/contexts/ThemeContext';

import styles from './styles.module.scss';

export function Header(): JSX.Element {
  const { currentTheme, switchTheme } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <Link
        href="/"
        className={styles.logo}
      >
        washington junior.
      </Link>
      <nav className={styles.nav}>
        <Link href="/">home</Link>
        <a href="/#projects">projetos</a>
        <Link
          target="_blank"
          href="/curriculo_washington_junior.pdf"
        >
          currículo
        </Link>
        <button
          onClick={switchTheme}
          className={styles.themeButton}
        >
          {currentTheme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </nav>
    </header>
  );
}

export default Header;
