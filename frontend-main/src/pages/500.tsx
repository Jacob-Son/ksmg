import Head from 'next/head';
import React from 'react';
import NotFound from 'src/sections/NotFound';

export default function InternalServerErrorPage() {
  const title = '500: Internal Server Error';
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <NotFound />
    </>
  );
}
