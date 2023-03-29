import { HTMLProps } from 'react';

import styles from './styles.module.scss';

type Props = HTMLProps<HTMLAnchorElement> & {
  disabled?: boolean;
};

export function CTA({ children, disabled, ...rest }: Props): JSX.Element {
  return (
    <a
      {...rest}
      className={`${styles.cta} ${disabled && styles.disabled}`}
    >
      {children}
    </a>
  );
}
