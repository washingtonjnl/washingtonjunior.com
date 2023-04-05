import { GetStaticProps, GetStaticPaths } from 'next';
import { ExtendedRecordMap } from 'notion-types';

import { getPageTable, getPageBlocks } from '@/core/blog';
import { toNotionImageUrl } from '@/core/notion';

import { Project as ProjectInterface } from '@/types/project';

import { ContactSection } from '@/sections/Contact';

import { NotionContent } from '@/components/NotionContent';
import { SEO } from '@/components/SEO';

import styles from '@/styles/Project.module.scss';

//
//
//

const databaseId =
  process.env.NOTION_DATABASE_ID ?? 'f0b7ca8787b74850ac55bbe4084f6917';

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getPageTable<ProjectInterface>(databaseId);

  const projectSlugs = projects.map(p => ({
    params: { projectSlug: p.slug },
  }));

  return {
    paths: projectSlugs,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const projectSlug = context.params?.projectSlug;

  if (!projectSlug) {
    throw Error('No slug given');
  }

  const allProjects = await getPageTable<ProjectInterface>(databaseId);
  const thisProject = allProjects.find(p => p.slug === projectSlug);

  if (
    !thisProject || // project not found
    !thisProject.published // project not published
    // thisProject.visibility === 'restrict' || // project requires a password
    // thisProject.visibility === 'soon' // project not finished
  ) {
    return {
      notFound: true,
    };
  }

  const projectContent = await getPageBlocks(thisProject.id);

  return {
    props: {
      projectSummary: thisProject,
      projectContent,
    },
    revalidate: 10 * 1 * 60, // 10 minutes
  };
};

export default function ProjectDetail({
  projectSummary,
  projectContent,
}: {
  projectSummary: ProjectInterface;
  projectContent: ExtendedRecordMap;
}): JSX.Element {
  return (
    <>
      <SEO
        url={`https://www.washingtonjunior.com/projetos/${projectSummary.slug}`}
        title={projectSummary.title}
        description={projectSummary.preview}
        ogImg={
          projectSummary.images.length > 0
            ? toNotionImageUrl(projectSummary.images[0].url)
            : '/og-img.jpg'
        }
      />
      {projectSummary.images.length > 0 && (
        <div className={styles.coverSection}>
          <img
            className={styles.cover}
            src={toNotionImageUrl(projectSummary.images[0].url)}
            alt={projectSummary.title}
          />
        </div>
      )}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.projectSummary}>
            <label>
              {projectSummary.client} (
              {new Date(projectSummary.date).getFullYear()}){' ‎ | ‎ '}
              {projectSummary.tags.map((tag, i, arr) =>
                i > 0 ? (i === arr.length - 1 ? ` e ${tag}` : `, ${tag}`) : tag,
              )}
            </label>
            <h1>{projectSummary.title}</h1>
            <h2>{projectSummary.preview}</h2>
          </div>
        </div>
      </section>
      <section className={styles.page}>
        <NotionContent recordMap={projectContent} />
      </section>
      <ContactSection />
    </>
  );
}
