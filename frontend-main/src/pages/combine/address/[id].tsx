import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import PageHead from 'src/components/combine/PageHead/PageHead';
import Button from 'src/components/common/Button/Button';
import { HeaderLayoutEnum } from 'src/components/common/Header/Header.types';
import TextField from 'src/components/common/TextField/TextField';
import { FormNameCSS } from 'src/components/mypage/Mypage.styles';
import AddressForm from 'src/components/mypage/address/AddressForm';
import { useResponsive } from 'src/hooks/common/useResponsive';
import Layout from 'src/layout/Layout';
import { mypageAddressFormSchema } from 'src/schemas/mypage.schema';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { maxWidth } from 'src/styles/styles';
import { onlyNumber } from 'src/utils/format';
import { getSession, useSession } from 'next-auth/react';
import { combineApi } from 'src/services/combine_api';
import useAccount from 'src/hooks/common/useAccount';
import { useCombineDetail } from 'src/hooks/combine/useCombineDetail';

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

export default function CombineAddressPage() {
  const router = useRouter();
  const { id } = router.query;
  const combineId = Number(id);
  const { isDesktop } = useResponsive();

  const phoneNum2Ref = React.useRef<HTMLInputElement>(null);
  const phoneNum3Ref = React.useRef<HTMLInputElement>(null);
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState({
    first: '',
    second: '',
    third: '',
  });
  const [address, setAddress] = React.useState({
    zonecode: '',
    address: '',
    detailAddress: '',
  });
  const isSaveAvailable = mypageAddressFormSchema.isValidSync(
    {
      name,
      phoneNumber,
      address,
    },
    { abortEarly: true },
  );
  const { address: userAddress } = useAccount();
  const { combine } = useCombineDetail(combineId);
  const { status } = useSession();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      if (!combine) return;
      if (combine?.combineDelivery) {
        alert('이미 복각본이 신청된 육필 시 노트북입니다.');
        router.push('/combine/list');
      }
    }
  }, [status, combine]);

  const handleSave = async () => {
    await combineApi.deliveryCombine(combineId, {
      userAddress,
      name,
      phoneNumber: `${phoneNumber.first}-${phoneNumber.second}-${phoneNumber.third}`,
      postCode: address.zonecode,
      mainAddress: address.address,
      detailAddress: address.detailAddress,
    });
    router.push(`/combine/book-complete/${combineId}`);
  };

  const button = (
    <Button
      layout="contained"
      onClick={handleSave}
      css={ButtonCSS}
      disabled={!isSaveAvailable}
    >
      저장하기
    </Button>
  );

  return (
    <>
      <Head>
        <title>주소 입력하기</title>
        <style>
          {`
            body {
              background: ${color.background.container.black} !important;
            }
          `}
        </style>
      </Head>
      <Layout
        headerLayout={HeaderLayoutEnum.DARK}
        title="주소 입력하기"
        {...(!isDesktop && { showTitle: true })}
        css={LayoutCSS}
        noFooter={true}
      >
        <PageHead
          title={'배송 받을\n주소 입력하기'}
          description={'실물 배송되는 복각본을 받으실 주소를 입력해주세요.'}
          {...(isDesktop && { button })}
        />

        <div>
          <p css={FormNameCSS}>받으시는 분</p>
          <TextField
            placeholder="이름을 입력해주세요"
            css={css({ marginTop: 10 })}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <p css={FormNameCSS}>휴대폰번호</p>
          <div
            css={css({
              marginTop: 10,
              gap: 4,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
            })}
          >
            <TextField
              maxLength={3}
              value={phoneNumber.first}
              onChange={(e) => {
                const value = onlyNumber(e.target.value);
                if (value.length === 3) {
                  phoneNum2Ref.current?.focus();
                }
                setPhoneNumber({ ...phoneNumber, first: value });
              }}
            />
            <TextField
              ref={phoneNum2Ref}
              maxLength={4}
              value={phoneNumber.second}
              onChange={(e) => {
                const value = onlyNumber(e.target.value);
                if (value.length === 4) {
                  phoneNum3Ref.current?.focus();
                }
                setPhoneNumber({ ...phoneNumber, second: value });
              }}
            />
            <TextField
              ref={phoneNum3Ref}
              maxLength={4}
              value={phoneNumber.third}
              onChange={(e) => {
                const value = onlyNumber(e.target.value);
                setPhoneNumber({ ...phoneNumber, third: value });
              }}
            />
          </div>
        </div>

        <AddressForm
          address={address}
          setAddress={setAddress}
          theme="dark"
          css={css({ padding: 0 })}
        />

        {!isDesktop && <div css={ButtonWrapperCSS}>{button}</div>}
      </Layout>
    </>
  );
}

const LayoutCSS = css({
  marginTop: 100,
  paddingLeft: 30,
  paddingRight: 30,
  paddingBottom: 400,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: maxWidth,
  boxSizing: 'border-box',
  letterSpacing: '-0.165px',
  gap: 40,

  '& input': {
    background: color.background.container.charcoal,
    color: '#fff',
    border: 'none',
  },

  [mq.mobile]: {
    marginTop: 20,
    paddingLeft: 26,
    paddingRight: 26,
  },
  [mq.tablet]: {
    marginTop: 40,
  },
});

export const NoticeWrapperCSS = css({
  marginTop: 20,
  gap: 10,
  display: 'flex',
  padding: '11px 12px',
  border: `1px solid ${color.orange}`,
  borderRadius: 7,
  fontSize: 14,
  lineHeight: '120%',
  color: color.orange,
});

const ButtonWrapperCSS = css({
  margin: '6px auto 0 auto',

  [mq.mobile]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '0 26px 26px 26px',
    boxSizing: 'border-box',
    backdropFilter: 'blur(20px)',
  },
});

const ButtonCSS = css({
  background: color.purple,
  width: '100%',

  [mq.desktop]: {
    width: 200,
    height: 52,
  },
  [mq.tablet]: {
    width: 340,
  },
});
