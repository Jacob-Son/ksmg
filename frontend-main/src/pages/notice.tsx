import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { LayoutCSS } from 'src/components/mypage/Mypage.styles';
import Supports from 'src/components/supports/Supports';
import useNotice from 'src/hooks/notice/useNotice';
import Layout from 'src/layout/Layout';

export default function NoticePage() {
  const title = '공지사항';
  const router = useRouter();
  const { query } = router;
  const { returnPath } = query;
  const { noticeList, isPending } = useNotice();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout
        css={LayoutCSS}
        title={title}
        onClickPrev={() => {
          if (returnPath) {
            router.push(returnPath as string);
          } else {
            router.back();
          }
        }}
      >
        {!isPending && (
          <Supports
            title="공지사항"
            description="공지사항에 궁금한 사항이 있으시면, 언제든 피카펜 카카오톡 채널을 통해 문의해주세요."
            returnUrl="/notice"
            showDate={true}
            data={noticeList}
          />
        )}
      </Layout>
    </>
  );
}
