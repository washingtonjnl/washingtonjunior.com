import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
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

  if (!thisProject) {
    throw Error('Project not found');
  }

  if (!thisProject.published) {
    throw Error('Project not published');
  }

  // if (thisProject.visibility === 'restrict') {
  //   throw Error('Project requires a password');
  // }

  const projectContent = await getPageBlocks(thisProject.id);

  return {
    props: {
      projectSummary: thisProject,
      projectContent,
    },
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
      <Head>
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
      </Head>
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
              {new Date(projectSummary.date).getFullYear()})
              {projectSummary.tags.map(tag => ` ‎ | ‎ ${tag}`)}
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
