import Head from 'next/head';

interface SEOProps {
  url: string;
  title: string;
  description: string;
  ogImg: string;
}

export function SEO({ url, title, description, ogImg }: SEOProps): JSX.Element {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="title"
        content={title}
      />
      <meta
        name="description"
        content={description}
      />

      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:url"
        content={url}
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:image"
        content={ogImg}
      />

      <meta
        property="twitter:card"
        content="summary_large_image"
      />
      <meta
        property="twitter:url"
        content={url}
      />
      <meta
        property="twitter:title"
        content={title}
      />
      <meta
        property="twitter:description"
        content={description}
      />
      <meta
        property="twitter:image"
        content={ogImg}
      />
    </Head>
  );
}
