import Head from 'next/head';
import React from 'react';
import NotFound from 'src/sections/NotFound';

export default function PageNotFound() {
  const title = '404: Page Not Found';
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <NotFound />
    </>
  );
}
