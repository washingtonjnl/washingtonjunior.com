import styles from './styles.module.scss';

interface PrincipleProps {
  title: string;
  description: string;
}

export function Principle({ title, description }: PrincipleProps): JSX.Element {
  return (
    <div className={styles.principle}>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}
