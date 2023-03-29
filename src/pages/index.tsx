import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Compass, Layers, Search, Zap } from 'react-feather';

import { getPageTable } from '@/core/blog';

import { Project as ProjectInterface } from '@/types/project';

import { ContactSection } from '@/sections/Contact';

import { CTA } from '@/components/CTA';
import { Principle } from '@/components/Principle';
import { Project } from '@/components/Project';
import { SEO } from '@/components/SEO';

import styles from '@/styles/Home.module.scss';

//
//
//

export const getServerSideProps: GetServerSideProps = async () => {
  const databaseId =
    process.env.NOTION_DATABASE_ID ?? 'f0b7ca8787b74850ac55bbe4084f6917';

  const projects = await getPageTable<ProjectInterface>(databaseId);

  return {
    props: {
      designProjects: projects.filter(p => p.type === 'design'),
      researchProjects: projects.filter(p => p.type === 'research'),
    },
  };
};

//
//
//

interface HomeProps {
  designProjects: ProjectInterface[];
  researchProjects: ProjectInterface[];
}

export default function Home({
  designProjects,
  researchProjects,
}: HomeProps): JSX.Element {
  return (
    <>
      <Head>
        <SEO
          url="https://www.washingtonjunior.com/"
          title="Washington Junior | Design de Produto Centrado no Usuário"
          description="Conheça o trabalho de Washington Junior, product designer com mais de 7 anos de experiência, que transforma ideias em soluções eficientes para melhorar a experiência das pessoas usuárias."
          ogImg="/og-img.jpg"
        />
      </Head>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.heading}>
              <strong>Washington Junior,</strong> Product Designer
            </h1>
            <p className={styles.summary}>
              Há mais de 7 anos transformando ideias em soluções eficientes,
              sempre centrado na experiência das pessoas usuárias.
            </p>
            <CTA href="/#projects">
              <Zap size={18} />
              ver projetos selecionados
            </CTA>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2}>
            <Compass size={32} />
            Princípios
          </h2>
          <Principle
            title="o simples funciona"
            description="Utilizo processos bem definidos e validados, sempre com foco nos
          objetivos e flexíveis para projetos de todos os tamanhos."
          />
          <Principle
            title="honestidade e transparência"
            description="Uma comunicação clara, sem meias palavras e empática é tudo o que
          um projeto precisa para fluir com tranquilidade."
          />
          <Principle
            title="foco == qualidade"
            description="Limito o número de projetos que assumo ao mesmo tempo para
          garantir um tempo de qualidade a cada um, otimizando os
          resultados."
          />
          <Principle
            title="equilíbrio é essencial"
            description="É preciso atender às necessidades das pessoas, sem desconsiderar
          os objetivos do negócio e a viabilidade de implementação."
          />
        </div>
      </section>

      <section
        id="projects"
        className={styles.section}
      >
        <div className={styles.container}>
          <h2 className={styles.h2 + ' ' + styles.full}>
            <Layers size={32} />
            Projetos de design
          </h2>
          {designProjects.map(project => (
            <Project
              key={project.id}
              slug={project.slug}
              images={project.images}
              tags={project.tags}
              title={project.title}
              preview={project.preview}
              visibility={project.visibility}
            />
          ))}
        </div>
      </section>

      {researchProjects && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2 + ' ' + styles.full}>
              <Search size={32} />
              Projetos de pesquisa
            </h2>
            {researchProjects.map(project => (
              <Project
                key={project.id}
                slug={project.slug}
                images={project.images}
                tags={project.tags}
                title={project.title}
                preview={project.preview}
                visibility={project.visibility}
              />
            ))}
          </div>
        </section>
      )}

      <ContactSection />
    </>
  );
}
