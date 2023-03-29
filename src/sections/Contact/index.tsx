import { MessageCircle } from 'react-feather';

import { ContactLink } from '@/components/ContactLink';

import styles from './styles.module.scss';

export function ContactSection(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.h2}>
          <MessageCircle size={32} />
          Fale comigo
        </h2>
        <ContactLink
          href="https://api.whatsapp.com/send/?phone=5521990106262"
          title="+55 21 99010-6262"
          description="Me ligue ou mande uma mensagem no WhatsApp para nos conhecermos."
        />
        <ContactLink
          href="mailto:oi@washingtonjunior.com"
          title="oi@washingtonjunior.com"
          description="Precisa de ajuda para tirar seu projeto do papel? Me mande um
          e-mail."
        />
      </div>
    </section>
  );
}
