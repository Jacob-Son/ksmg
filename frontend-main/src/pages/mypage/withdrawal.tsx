import { css } from '@emotion/react';
import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Button from 'src/components/common/Button/Button';
import {
  ButtonCSS,
  ButtonWrapperCSS,
  LayoutCSS,
} from 'src/components/mypage/Mypage.styles';
import Checkbox from 'src/components/mypage/withdrawal/Checkbox';
import WithdrawalNotification from 'src/components/mypage/withdrawal/notification/WithdrawalNotification';
import SupportsHead from 'src/components/supports/SupportsHead';
import useAccount from 'src/hooks/common/useAccount';
import useSettle from 'src/hooks/library/useSettle';
import Layout from 'src/layout/Layout';
import { userApi } from 'src/services/user_api';
import { useUserStore } from 'src/stores/user/user.store';
import { color } from 'src/styles/colors';
import { mq } from 'src/styles/mediaQuery';
import { addComma } from 'src/utils/format';

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

export default function WithdrawalPage() {
  const title = '회원탈퇴';
  const router = useRouter();
  const { query } = router;
  const { returnPath } = query;
  const [notificationAgree, setNotificationAgree] = React.useState(false);
  const [couponRemoveAgree, setCouponRemoveAgree] = React.useState(false);
  const { clearUser } = useUserStore();
  const { address } = useAccount();
  const { settlePrice } = useSettle();

  const handleWithdrawal = async () => {
    if (!address) return;
    try {
      await userApi.deleteUser(address);
      clearUser();
      sessionStorage.removeItem('accessToken');
      await signOut({
        callbackUrl: '/',
      });
      alert('회원탈퇴가 완료되었습니다.');
    } catch (e) {}
  };

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
            router.push('/mypage');
          }
        }}
      >
        <SupportsHead
          title="회원탈퇴"
          description={
            '고객님 KSMG 이용에 불편함이 있으셨나요?\n고객센터에 카카오톡 채널에 불만사항을 남겨주시면\n친절히 응대해 드리겠습니다.'
          }
          returnUrl="/mypage/withdrawal"
        />
        <WithdrawalNotification />

        <div
          css={css({
            padding: '0 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,

            [mq.mobile]: {
              padding: 0,
            },
          })}
        >
          <p css={css({ lineHeight: '130%' })}>탈퇴 전 반드시 확인해주세요</p>
          <div
            css={css({
              padding: 20,
              border: `1px solid ${color.line.secondary}`,
            })}
          >
            <p
              css={css({
                fontSize: 14,
                lineHeight: '120%',
                color: color.text.secondary,
              })}
            >
              잔여 판매 금액
            </p>
            <p css={css({ marginTop: 6, lineHeight: '130%' })}>
              {settlePrice ? `${addComma(settlePrice)}원` : '-'}
            </p>
          </div>
          <div
            css={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            })}
          >
            <Checkbox
              checked={notificationAgree}
              onChange={(e) => setNotificationAgree(e.target.checked)}
              text="탈퇴안내사항을 모두 확인하였으며 탈퇴에 동의합니다"
            />
            <Checkbox
              checked={couponRemoveAgree}
              onChange={(e) => setCouponRemoveAgree(e.target.checked)}
              text="쿠폰 및 잔여 포인트, 상품권 금액 자동 소멸에 동의합니다"
            />
          </div>
        </div>

        <div css={ButtonWrapperCSS}>
          <Button
            onClick={handleWithdrawal}
            disabled={!notificationAgree || !couponRemoveAgree}
            layout="contained"
            css={ButtonCSS}
          >
            동의하고 탈퇴하기
          </Button>
        </div>
      </Layout>
    </>
  );
}
