import { css } from '@emotion/react';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Button from 'src/components/common/Button/Button';
import {
  ButtonCSS,
  ButtonWrapperCSS,
  LayoutCSS,
} from 'src/components/mypage/Mypage.styles';
import Password from 'src/components/password/Password';
import SupportsHead from 'src/components/supports/SupportsHead';
import Layout from 'src/layout/Layout';
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

export default function ChangePasswordPage() {
  const router = useRouter();
  const { query } = router;
  const { returnPath } = query;
  // 1. current: 현재 비밀번호 입력
  // 1-2. find: 비밀번호 재설정(찾기)
  // 2. new: 비밀번호 변경
  // 3. confirm: 비밀번호 변경 확인
  // 4. complete: 비밀번호 변경 완료
  const [step, setStep] = React.useState<
    'current' | 'find' | 'new' | 'confirm' | 'complete'
  >('current');
  const title = step === 'find' ? '비밀번호 재설정' : '2차 비밀번호 변경';
  const [phoneNumber, setPhoneNumber] = React.useState(undefined);
  const [sendNumber, setSendNumber] = React.useState<number>(null);
  const [confirmNumber, setConfirmNumber] = React.useState<number>(null);
  const [error, setError] = React.useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = React.useState<string>('');
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const isButtonDisabled = React.useMemo(() => {
    if (step === 'find') {
      return confirmNumber === null;
    }
    if (step === 'current') {
      return currentPassword.length < 7;
    }
    if (step === 'new') {
      return newPassword.length < 7;
    }
    if (step === 'confirm') {
      return confirmPassword.length < 7;
    }
    return false;
  }, [confirmNumber, currentPassword, newPassword, confirmPassword, step]);

  const handleClickPrev = () => {
    if (returnPath) {
      router.push(returnPath as string);
    } else {
      router.push('/mypage');
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout
        css={[
          LayoutCSS,
          css({
            ...(!['find', 'complete'].includes(step) && {
              alignItems: 'center',
            }),
          }),
        ]}
        title={title}
        showTitle
        onClickPrev={handleClickPrev}
      >
        {step === 'current' && (
          <>
            <Password
              text={
                error ? (
                  <span css={css({ color: color.red.main })}>
                    비밀번호가 틀립니다
                  </span>
                ) : (
                  '현재 비밀번호를 입력해주세요'
                )
              }
              value={currentPassword}
              setValue={(val) => {
                setCurrentPassword(val);
                setError(false);
              }}
            />
            <button
              type="button"
              css={FindPasswordButtonCSS}
              onClick={() => setStep('find')}
            >
              비밀번호를 잊어버리셨나요?
            </button>
          </>
        )}
        {step === 'find' && (
          <>
            <SupportsHead
              title="비밀번호 재설정"
              description={
                '환불, 정산 받으실 계좌정보를 입력해주세요. \n숫자만 입력해주세요.'
              }
            />
            <FindPassword
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              confirmNumber={confirmNumber}
              setConfirmNumber={setConfirmNumber}
              error={error}
              onFocus={() => setError(false)}
              setSendNumber={setSendNumber}
              css={css({
                padding: '0 20px',
                [mq.mobile]: {
                  padding: 0,
                },
              })}
            />
          </>
        )}
        {step === 'new' && (
          <Password
            text="변경할 비밀번호를 입력해주세요"
            value={newPassword}
            setValue={setNewPassword}
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
        {step === 'complete' && (
          <>
            <SupportsHead
              title={'비밀번호 설정이 \n완료되었습니다.'}
              description={
                '(주)케이에스엠지에 로그인하거나 \n작품을 구매 하기 위해서는 비밀번호가 필요합니다. \n비밀번호 설정 단계를 진행해 주세요.'
              }
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

        <div css={ButtonWrapperCSS}>
          <Button
            onClick={async () => {
              switch (step) {
                case 'current':
                  const token = sessionStorage.getItem('accessToken');
                  const res = await authApi.checkPassword(
                    token,
                    currentPassword,
                  );
                  if (res.success) {
                    setStep('new');
                  } else {
                    setError(true);
                  }
                  break;
                case 'find':
                  if (sendNumber === confirmNumber) {
                    setStep('new');
                  } else {
                    setError(true);
                    setConfirmNumber(null);
                  }
                  break;
                case 'new':
                  setStep('confirm');
                  break;
                case 'confirm':
                  if (newPassword !== confirmPassword) {
                    setError(true);
                    return;
                  } else {
                    const token = sessionStorage.getItem('accessToken');
                    const res = await authApi.resetWalletPassword(
                      token,
                      confirmPassword,
                    );
                    if (res.success) {
                      setStep('complete');
                    } else {
                      setStep('new');
                      setNewPassword('');
                      setConfirmPassword('');
                      alert('비밀번호 재설정에 실패했습니다');
                      return;
                    }
                  }
                  break;
                case 'complete':
                  handleClickPrev();
                  break;
              }
            }}
            disabled={isButtonDisabled}
            layout="contained"
            css={ButtonCSS}
          >
            {['find', 'complete'].includes(step) ? '확인' : '다음'}
          </Button>
        </div>
      </Layout>
    </>
  );
}

const FindPasswordButtonCSS = css({
  width: 'fit-content',
  color: color.purple,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '100%',
  border: 'none',
  background: 'none',

  '&:active': {
    border: 'none',
    background: 'none',
  },
});

const ImageWrapperCSS = css({
  position: 'relative',
  width: '100%',
  maxWidth: 300,
  height: 'auto',
  aspectRatio: '1215 / 1108',
  margin: '0 auto',
});
