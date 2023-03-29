import styles from './styles.module.scss';

interface ContactLinkProps {
  href: string;
  title: string;
  description: string;
}

export function ContactLink({
  href,
  title,
  description,
}: ContactLinkProps): JSX.Element {
  return (
    <div className={styles.contact}>
      <a
        target="_blank"
        href={href}
        rel="noreferrer"
      >
        {title}
      </a>
      <p>{description}</p>
    </div>
  );
}
