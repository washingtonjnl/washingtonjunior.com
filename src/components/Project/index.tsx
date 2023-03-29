import { FileText, LockSimple, ClockCountdown } from '@phosphor-icons/react';

import { toNotionImageUrl } from '@/core/notion';

import { Project as ProjectInterface } from '@/types/project';

import { CTA } from '../CTA';
import styles from './styles.module.scss';

type ProjectSummaryProps = Pick<
  ProjectInterface,
  'slug' | 'images' | 'tags' | 'title' | 'preview' | 'visibility'
>;

export function Project({
  slug,
  images,
  tags,
  title,
  preview,
  visibility,
}: ProjectSummaryProps): JSX.Element {
  return (
    <div className={styles.project}>
      {images.length > 0 && (
        <img
          src={toNotionImageUrl(images[0].url)}
          alt={title}
        />
      )}
      <div className={styles.content}>
        <label>{tags.map((tag, i) => (i > 0 ? `| ${tag}` : tag))}</label>
        <strong>{title}</strong>
        <p>{preview}</p>
        {
          {
            free: (
              <CTA href={`/projetos/${slug}`}>
                <FileText size={20} />
                ver projeto completo
              </CTA>
            ),
            restrict: (
              <CTA href={`/projetos/${slug}`}>
                <LockSimple size={20} />
                ver projeto completo
              </CTA>
            ),
            soon: (
              <CTA disabled>
                <ClockCountdown size={20} />
                em breve
              </CTA>
            ),
          }[visibility]
        }
      </div>
    </div>
  );
}
