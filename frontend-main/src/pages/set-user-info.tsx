import { css } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import AddressSection from 'src/components/address/AddressSection';
import Button from 'src/components/common/Button/Button';
import { LayoutCSS } from 'src/components/mypage/Mypage.styles';
import Password from 'src/components/password/Password';
import SupportsHead from 'src/components/supports/SupportsHead';
import { useResponsive } from 'src/hooks/common/useResponsive';
import Layout from 'src/layout/Layout';
import { mypageAddressFormSchema } from 'src/schemas/mypage.schema';
import FindPassword from 'src/sections/FindPassword/FindPassword';
import { authApi } from 'src/services/auth_api';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';

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

export default function SetUserInfoPage() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { isMobile } = useResponsive();

  // 1. start: 비밀번호 설정 안내
  // 2. verification: 전화번호 인증
  // 3. address: 주소지 입력
  // 4. input: 비밀번호 입력
  // 5. confirm: 비밀번호 확인
  const [step, setStep] = React.useState<
    'start' | 'verification' | 'address' | 'input' | 'confirm'
  >('start');
  const title = React.useMemo(() => {
    switch (step) {
      case 'verification':
        return '전화번호 인증';
      case 'address':
        return '주소 입력';
      default:
        return '비밀번호 설정';
    }
  }, [step]);
  const [authPhone, setAuthPhone] = React.useState(undefined);
  const [sendNumber, setSendNumber] = React.useState<number>(null);
  const [confirmNumber, setConfirmNumber] = React.useState<number>(null);
  const [error, setError] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  // 주소지 화면 관련 정보
  const [name, setName] = React.useState(undefined);
  const [phoneNumber, setPhoneNumber] = React.useState({
    first: '',
    second: '',
    third: '',
  });
  const [address, setAddress] = React.useState({
    zonecode: undefined,
    address: undefined,
    detailAddress: undefined,
  });

  // const handleClickNext = async () => {
  //   switch (step) {
  //     case 'start':
  //       setStep('verification');
  //       break;
  //     case 'verification':
  //       if (sendNumber !== null && sendNumber === confirmNumber) {
  //         setStep('address');
  //       } else {
  //         setError(true);
  //         setConfirmNumber(null);
  //       }
  //       break;
  //     case 'address':
  //       setStep('input');
  //       break;
  //     case 'input':
  //       setStep('confirm');
  //       break;
  //     case 'confirm':
  //       if (password !== confirmPassword) {
  //         setError(true);
  //         setConfirmPassword('');
  //         return;
  //       }
  //       const accessToken = sessionStorage.getItem('accessToken');
  //       const phone = `${phoneNumber.first}-${phoneNumber.second}-${phoneNumber.third}`;

  //       const res = await authApi.makeWallet(accessToken, password, phone, {
  //         name: name,
  //         phoneNumber: phone,
  //         mainAddress: address.address,
  //         detailAddress: address.detailAddress,
  //         postCode: address.zonecode,
  //       });
  //       if (!res.success) {
  //         alert(res.error);
  //         return;
  //       }
  //       await queryClient.invalidateQueries({ queryKey: ['user'] });
  //       if (window.gtag) {
  //         window.gtag('event', 'conversion', {
  //           send_to: 'AW-16539262850/QEPgCPT-3rAZEIK_xM49',
  //         });
  //       }
  //       router.push('/');

  //       break;
  //   }
  // };

  const handleClickNext = async () => {
    switch (step) {
      case 'start':
        setStep('input'); // 🚀 전화번호 인증 없이 비밀번호 설정으로 바로 이동
        break;
      case 'input':
        setStep('confirm');
        break;
      case 'confirm':
        if (password !== confirmPassword) {
          setError(true);
          setConfirmPassword('');
          return;
        }
        const accessToken = sessionStorage.getItem('accessToken');

        const phone = `${phoneNumber.first}-${phoneNumber.second}-${phoneNumber.third}`;
        const res = await authApi.makeWallet(accessToken, password, phone, {
          name: name,
          phoneNumber: phone,
          mainAddress: address.address,
          detailAddress: address.detailAddress,
          postCode: address.zonecode,
        });

        if (!res.success) {
          alert(res.error);
          return;
        }
        await queryClient.invalidateQueries({ queryKey: ['user'] });

        router.push('/');
        break;
    }
  };

  // const leaveButtonText = React.useMemo(() => {
  //   return step === 'verification' ? '나중에 인증하기' : '나중에 설정하기';
  // }, [step]);
  const leaveButtonText = '나중에 설정하기';
  const nextButtonText = React.useMemo(() => {
    if (step === 'start') {
      return '다음';
    }
    if (step === 'verification') {
      return '인증하기';
    }
    if (step === 'address') {
      return '저장하기';
    }
    if (isMobile) {
      return '설정하기';
    }
    return '비밀번호 설정하기';
  }, [isMobile, step]);
  const isNextButtonDisabled = React.useMemo(() => {
    if (step === 'input') {
      return password.length < 7;
    }
    if (step === 'address') {
      return !mypageAddressFormSchema.isValidSync(
        { name, phoneNumber, address },
        { abortEarly: true },
      );
    }
    if (step === 'confirm') {
      return confirmPassword.length < 7;
    }
    return false;
  }, [password, confirmPassword, step, name, address]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16539262850"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
          
            gtag("config", "AW-16539262850");
          `,
          }}
        />
      </Head>
      <Layout
        css={[
          LayoutCSS,
          css({
            alignItems: 'center',

            [mq.mobile]: {
              alignItems: ['input', 'confirm'].includes(step)
                ? 'center'
                : 'flex-start',
            },
          }),
        ]}
        title={title}
        showTitle={!['start', 'verification'].includes(step)}
        showPrev={true}
        onClickPrev={() => {
          if (step === 'address') {
            setStep('verification');
          } else if (step === 'input') {
            setStep('address');
          } else if (step === 'confirm') {
            setStep('input');
          }
        }}
      >
        {step === 'start' && (
          <>
            <SupportsHead
              title={'회원가입을 완료해주세요'}
              description={
                '회원가입을 완료하시려면 비밀번호 설정과 \n전화번호 인증이 필요합니다. \n지금 설정하지 않으시려면 \n나중에 설정하기를 선택해주세요.'
              }
              css={css({
                alignItems: 'center',
                textAlign: 'center',
                [mq.mobile]: {
                  alignItems: 'flex-start',
                  textAlign: 'left',
                },
              })}
            />

            <div css={ImageWrapperCSS}>
              <Image
                alt="비밀번호 설정 완료"
                src="/imgs/mypage/img_pass_complete.png"
                fill
              />
            </div>
          </>
        )}
        {/* {step === 'verification' && (
          <>
            <p css={VerificationTextCSS}>전화번호 인증을 해주세요</p>
            <FindPassword
              phoneNumber={authPhone}
              setPhoneNumber={setAuthPhone}
              confirmNumber={confirmNumber}
              setConfirmNumber={setConfirmNumber}
              error={error}
              onFocus={() => setError(false)}
              setSendNumber={setSendNumber}
              css={css({
                width: '100%',
                padding: '0 20px',
                [mq.mobile]: {
                  padding: 0,
                },
              })}
            />
          </>
        )} */}
        {step === 'address' && (
          <>
            {isMobile && (
              <p css={VerificationTextCSS}>주소지 입력을 해주세요</p>
            )}
            <div css={AddressSectionCSS}>
              <AddressSection
                name={name}
                phoneNumber={phoneNumber}
                address={address}
                setName={setName}
                setPhoneNumber={setPhoneNumber}
                setAddress={setAddress}
              />
            </div>
          </>
        )}
        {step === 'input' && (
          <Password
            text="비밀번호를 입력해주세요"
            value={password}
            setValue={setPassword}
          />
        )}
        {step === 'confirm' && (
          <Password
            text={
              error ? (
                <span
                  css={css({
                    color: color.red.main,
                  })}
                >
                  비밀번호가 틀립니다
                </span>
              ) : (
                '확인을 위해 다시 입력해주세요'
              )
            }
            value={confirmPassword}
            setValue={(val) => {
              setConfirmPassword(val);
              setError(false);
            }}
          />
        )}

        <div css={ButtonWrapperCSS}>
          <Button
            layout="contained"
            css={[
              ButtonCSS,
              css({
                background: color.line.secondary,
                color: color.text.primary,
              }),
            ]}
            onClick={() => {
              signOut();
            }}
          >
            {leaveButtonText}
          </Button>
          <Button
            onClick={handleClickNext}
            disabled={isNextButtonDisabled}
            layout="contained"
            css={ButtonCSS}
          >
            {nextButtonText}
          </Button>
        </div>
      </Layout>
    </>
  );
}

const ImageWrapperCSS = css({
  position: 'relative',
  width: '100%',
  maxWidth: 300,
  height: 'auto',
  aspectRatio: '1215 / 1108',
  margin: '0 auto',
});

const ButtonWrapperCSS = css({
  marginTop: 20,
  gap: 12,
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 390,

  [mq.mobile]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    borderTop: `1px solid ${color.border.primary}`,
    background: '#fff',
    padding: '12px 20px 30px 20px',
    boxSizing: 'border-box',
    maxWidth: '100%',
  },
});

const ButtonCSS = css({
  width: '100%',
  maxWidth: 308,
  [mq.mobile]: {
    maxWidth: 'none',

    '&[disabled]': {
      background: color.background.container.gray,
      color: color.text.primary,
    },
  },
});

const VerificationTextCSS = css({
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '120%',
  margin: '0 auto 10px auto',
});

const AddressSectionCSS = css({
  gap: 40,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});
