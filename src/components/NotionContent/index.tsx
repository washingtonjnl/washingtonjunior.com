import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ExtendedRecordMap } from 'notion-types';
import * as React from 'react';
import { NotionRenderer } from 'react-notion-x';
import TweetEmbed from 'react-tweet-embed';

// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

const Code = dynamic(
  async () =>
    await import('react-notion-x/build/third-party/code').then(m => m.Code),
);

// const Collection = dynamic(
//   async () =>
//     await import('react-notion-x/build/third-party/collection').then(
//       m => m.Collection,
//     ),
// );

const Equation = dynamic(
  async () =>
    await import('react-notion-x/build/third-party/equation').then(
      m => m.Equation,
    ),
);

const Pdf = dynamic(
  async () =>
    await import('react-notion-x/build/third-party/pdf').then(m => m.Pdf),
  {
    ssr: false,
  },
);

const Modal = dynamic(
  async () =>
    await import('react-notion-x/build/third-party/modal').then(m => m.Modal),
  {
    ssr: false,
  },
);

const Tweet = ({ id }: { id: string }): JSX.Element => {
  return <TweetEmbed tweetId={id} />;
};

export function NotionContent({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={false}
      disableHeader={true}
      darkMode={false}
      previewImages={false}
      components={{
        nextImage: Image,
        nextLink: Link,
        Code,
        // Collection,
        Equation,
        Pdf,
        Modal,
        Tweet,
      }}
    />
  );
}
