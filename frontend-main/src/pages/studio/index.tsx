import { css } from '@emotion/react';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Button from 'src/components/common/Button/Button';
import Pagination from 'src/components/common/Pagination/Pagination';
import StudioProducts from 'src/components/studio/products/StudioProducts';
import { useUser } from 'src/hooks/mypage/useUser';
import useStudio from 'src/hooks/studio/useStudio';
import Layout from 'src/layout/Layout';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { UserRole } from '~/types/user';

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return { props: {} };
  }
  return {
    props: {},
  };
};

export default function StudioPage() {
  const title = '크리에이터 스튜디오';
  const router = useRouter();
  const { query } = router;
  const { page } = query;
  const { studio, refetch } = useStudio(Number(page));
  const { status } = useSession();
  const { user } = useUser();
  console.log('User Data:', user);
  console.log('Fetched User:', user);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      if (user === undefined) return;
      if (user?.role === UserRole.USER) {
        alert('관리자 전용 페이지입니다.');
        router.push('/');
      }
    }
  }, [status]);

  const handleClickCreate = () => {
    // if (!user.creatorName || !user.userProfileUrl) {
    //   router.push('/create-profile');
    // } else {
    router.push('/studio/create-ebook');
    // }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout css={LayoutCSS}>
        <div css={BodyHeadFlexCSS}>
          <div>
            <h1 css={PageTitleCSS}>{title}</h1>
            <p css={PageDescriptionCSS}>
              활동하실 판매자명과 프로필 이미지를 확인해 주세요.
            </p>
          </div>
          <Button
            layout="contained"
            onClick={handleClickCreate}
            css={css({
              marginLeft: 'auto',
              [mq.mobile]: { marginLeft: 0, marginRight: 'auto' },
            })}
          >
            새 상품 등록하기
          </Button>
        </div>

        {studio && <StudioProducts data={studio.data} refetch={refetch} />}
        {studio && studio.totalPage > 0 && (
          <Pagination
            currentPage={Number(page || 1)}
            lastPage={studio.totalPage}
            onClick={(val) => router.push({ query: { page: val } })}
            css={PaginationCSS}
          />
        )}
      </Layout>
    </>
  );
}

const LayoutCSS = css({
  marginTop: 80,
  marginBottom: 400,
  paddingLeft: 30,
  paddingRight: 30,
  letterSpacing: '-0.165px',
  [mq.mobile]: {
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 0,
  },
});

export const BodyHeadFlexCSS = css({
  display: 'flex',
  alignItems: 'center',
  gap: 40,
  marginLeft: 16,

  [mq.mobile]: {
    margin: '0 20px 16px 20px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  },
});

const PageTitleCSS = css({
  fontSize: 34,
  fontWeight: 600,
  lineHeight: '38px',
  letterSpacing: '-0.6px',
});

const PageDescriptionCSS = css({
  marginTop: 12,
  lineHeight: '130%',
});

const PaginationCSS = css({
  margin: '50px auto 0 auto',
  gap: 6,

  [mq.mobile]: {
    width: '100%',
    margin: 0,
    padding: '60px 20px',
    boxSizing: 'border-box',
    background: color.background.container.primary,
  },
});
