import { css } from '@emotion/react';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import LoadingScreen from 'src/components/common/LoadingScreen/LoadingScreen';
import NFTForm1 from 'src/components/studio/createNFT/NFTForm1';
import NFTForm2 from 'src/components/studio/createNFT/NFTForm2';
import NFTForm3 from 'src/components/studio/createNFT/NFTForm3';
import NFTForm4 from 'src/components/studio/createNFT/NFTForm4';
import NFTForm5 from 'src/components/studio/createNFT/NFTForm5';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { useUser } from 'src/hooks/mypage/useUser';
import Layout from 'src/layout/Layout';
import { imageApi } from 'src/services/image_api';
import { nftApi } from 'src/services/nft_api';
import { useCreateNftStore } from 'src/stores/createNft/createNft.store';
import { mq } from 'src/styles/mediaQuery';
import { dataURLtoFile } from 'src/utils/file';
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

export default function CreateEBookPage() {
  const title = '작품 등록하기';
  const router = useRouter();
  const { isMobile } = useResponsive();
  const [isComplete, setIsComplete] = React.useState(false);
  const {
    resetCreateNftStore,
    covers,
    detail,
    pages,
    name,
    category,
    theme,
    attributes,
    price,
    royalty,
    amount,
    description,
  } = useCreateNftStore();
  const { user } = useUser();
  const { status } = useSession();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      if (user === undefined) return;
      if (user?.role === UserRole.USER) {
        alert('크리에이터 전용 페이지입니다.');
        router.push('/');
      }
      // if (!user.creatorName) {
        // router.push('/create-profile');
      // }
    }
  }, [status, user]);

  React.useEffect(() => {
    if (isComplete) return;
    const handleRouteChange = () => {
      if (!user?.creatorName) return;
      if (
        !window.confirm('작성 중이던 내용이 사라집니다. 정말 나가시겠습니까?')
      ) {
        router.events.emit('routeChangeError');
        throw 'routeChange aborted.';
      } else {
        resetCreateNftStore();
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [isComplete]);

  const submitForm = async () => {
    if (!user) return;
    setLoading(true);
    const bookImagesPromises = pages.map((page, idx) => {
      return new Promise<string>((resolve, reject) => {
        const file = dataURLtoFile(page, idx.toString() + '.png');
        console.log(file);
        imageApi
          .uploadImage(file, 'books')
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
    const bookImages = await Promise.all(bookImagesPromises);
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
      const res = await nftApi.createNft({
        name,
        description,
        nftImages: coverImages,
        nftDetailDescription: detailText,
        nftDetailImage: detailImage,
        bookImages,
        creatorAddress: user.userAddress,
        collectionAddress: '0xtest',
        category,
        theme,
        nftAttributes: attributes,
        price,
        royalty,
        count: amount,
      });
      if (!res.success) {
        alert(res.error);
        setLoading(false);
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
      <Layout showHeader={!isMobile} css={LayoutCSS}>
        {loading && <LoadingScreen />}
        <NFTForm1 />
        <NFTForm2 />
        <NFTForm3 />
        <NFTForm4 />
        <NFTForm5 onComplete={submitForm} />
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
