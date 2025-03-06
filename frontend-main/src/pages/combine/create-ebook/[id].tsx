import { css } from '@emotion/react';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import LoadingScreen from 'src/components/common/LoadingScreen/LoadingScreen';
import CreateProfileForm from 'src/components/profile/CreateProfileForm/CreateProfileForm';
import NFTForm2 from 'src/components/studio/createNFT/NFTForm2';
import NFTForm4 from 'src/components/studio/createNFT/NFTForm4';
import NFTForm5 from 'src/components/studio/createNFT/NFTForm5';
import { useCombineDetail } from 'src/hooks/combine/useCombineDetail';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { useUser } from 'src/hooks/mypage/useUser';
import Layout from 'src/layout/Layout';
import { combineApi } from 'src/services/combine_api';
import { imageApi } from 'src/services/image_api';
import { useCreateNftStore } from 'src/stores/createNft/createNft.store';
import { mq } from 'src/styles/mediaQuery';
import { dataURLtoFile } from 'src/utils/file';

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

export default function CreateEBookPage() {
  const title = '육필 시 노트북 정보 작성하기';
  const router = useRouter();
  const { id } = router.query;
  const combineId = Number(id);
  const { isMobile } = useResponsive();
  const [isComplete, setIsComplete] = React.useState(false);
  const { combine } = useCombineDetail(combineId);

  const {
    resetCreateNftStore,
    covers,
    detail,
    name,
    price,
    royalty,
    description,
    setNftId,
  } = useCreateNftStore();
  const { user, refetch } = useUser();
  const { status } = useSession();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      if (combine?.combineMint) {
        alert('이미 민팅된 육필 시 노트북입니다.');
        router.push('/combine/list');
      }
    }
  }, [status, combine]);

  React.useEffect(() => {
    if (isComplete) return;
    const handleRouteChange = () => {
      // if (!user?.creatorName) return;
      // if (
      //   !window.confirm('작성 중이던 내용이 사라집니다. 정말 나가시겠습니까?')
      // ) {
      //   router.events.emit('routeChangeError');
      //   throw 'routeChange aborted.';
      // } else {
      resetCreateNftStore();
      // }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [isComplete]);

  const submitForm = async () => {
    if (!user) return;
    setLoading(true);
    const coverImagesPromises = covers.map((cover, idx) => {
      return new Promise<string>((resolve, reject) => {
        const file = dataURLtoFile(
          cover,
          'cover' + (idx + 1).toString() + '.png',
        );
        imageApi
          .uploadImage(file, 'covers')
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
    const coverImages = await Promise.all(coverImagesPromises);
    const detailImage = detail.image
      ? await new Promise<string>((resolve, reject) => {
          const file = dataURLtoFile(detail.image, 'detail.png');
          imageApi
            .uploadImage(file, 'details')
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        })
      : null;
    const detailText = detail.text;
    try {
      const res = await combineApi.mintCombine(combineId, {
        name,
        description,
        nftImages: coverImages,
        nftDetailDescription: detailText,
        nftDetailImage: detailImage,
        collectionAddress: '0xtest',
        price,
        royalty,
        userAddress: user.userAddress,
      });
      if (!res.success) {
        alert(res.error);
        setLoading(false);
        setNftId(res.data.nftId);
        return;
      }
    } catch (e) {
      alert(e);
      setLoading(false);
      return;
    }
    setLoading(false);
    setIsComplete(true);
  };
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout
        title="육필 시 노트북 제작"
        showHeader={!isMobile}
        css={LayoutCSS}
        noFooter={true}
      >
        {user ? (
          <>
            {user.creatorName ? (
              <>
                {loading && <LoadingScreen />}
                <NFTForm2 step={1} totalStep={3} isCountForm={false} />
                <NFTForm4 step={2} totalStep={3} />
                <NFTForm5 step={3} totalStep={3} onComplete={submitForm} />
              </>
            ) : (
              <CreateProfileForm
                callback={() => {
                  refetch();
                }}
              />
            )}
          </>
        ) : null}
      </Layout>
    </>
  );
}

const LayoutCSS = css({
  marginTop: 80,
  marginBottom: 400,
  paddingLeft: 30,
  paddingRight: 30,
  gap: 60,
  letterSpacing: '-0.165px',

  [mq.mobile]: {
    marginBottom: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
