import { css } from '@emotion/react';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Button from 'src/components/common/Button/Button';
import Select from 'src/components/common/Select/Select';
import TextField from 'src/components/common/TextField/TextField';
import {
  ButtonCSS,
  ButtonWrapperCSS,
  FormNameCSS,
  FormWrapperCSS,
  LayoutCSS,
} from 'src/components/mypage/Mypage.styles';
import BankModal from 'src/components/mypage/modal/BankModal';
import Checkbox from 'src/components/mypage/withdrawal/Checkbox';
import { bankOptions } from 'src/components/studio/createNFT/NFTForm.constants';
import SupportsHead from 'src/components/supports/SupportsHead';
import { useUser } from 'src/hooks/mypage/useUser';
import Layout from 'src/layout/Layout';
import { mypageBankFormSchema } from 'src/schemas/mypage.schema';
import { userApi } from 'src/services/user_api';
import { color } from 'src/styles/colors';

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

export default function BankPage() {
  const title = '계좌번호 관리';
  const router = useRouter();
  const { query } = router;
  const { returnPath, prevPath } = query;
  const [privacyAgree, setPrivacyAgree] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [bank, setBank] = React.useState({
    bankName: '',
    accountNumber: '',
    accountOwner: '',
  });
  const [isSaveActive, setIsSaveActive] = React.useState(false);
  const { user, refetch } = useUser();

  React.useEffect(() => {
    if (user) {
      setBank({
        bankName: user.bankName,
        accountNumber: user.accountNumber,
        accountOwner: user.accountOwner,
      });
    }
  }, [user]);

  React.useEffect(() => {
    mypageBankFormSchema
      .validate({ bank }, { abortEarly: true })
      .then(() => {
        const isSame =
          user?.bankName === bank.bankName &&
          user?.accountNumber === bank.accountNumber &&
          user.accountOwner === bank.accountOwner;
        setIsSaveActive(true && privacyAgree && !isSame);
      })
      .catch(() => setIsSaveActive(false && privacyAgree));
  }, [bank, privacyAgree]);

  const handleSave = async () => {
    if (!user) return;
    try {
      await userApi.updateUserAccount(user.userAddress, bank);
      alert('정보가 저장되었습니다.');
      refetch();
      if (prevPath) {
        router.push(prevPath as string);
      }
    } catch (error) {}
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
          title="계좌번호 관리"
          description={
            '환불, 정산 받으실 계좌정보를 입력해주세요.\n숫자만 입력해주세요.'
          }
        />

        <div css={[FormWrapperCSS, css({ display: 'flex', gap: 10 })]}>
          <div>
            <p css={FormNameCSS}>은행사</p>
            <Select
              value={bank.bankName}
              options={bankOptions}
              onChange={(value) => setBank({ ...bank, bankName: value })}
              css={css({
                marginTop: 10,
                width: 130,
                height: 60,
                paddingRight: 20,
              })}
              endAdornment={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6.33203L8 10.332L4 6.33203H12Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="1.33333"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
          <div css={css({ flex: 1 })}>
            <p css={FormNameCSS}>계좌번호</p>
            <TextField
              value={bank.accountNumber}
              placeholder="0000000000"
              onChange={(e) => {
                // 숫자만 입력 가능하도록
                const reg = /^[0-9]*$/;
                if (!reg.test(e.target.value)) return;
                setBank({ ...bank, accountNumber: e.target.value });
              }}
              css={TextFieldCSS}
            />
          </div>
        </div>

        <div css={FormWrapperCSS}>
          <p css={FormNameCSS}>예금주</p>
          <TextField
            value={bank.accountOwner}
            placeholder="홍길동"
            onChange={(e) => setBank({ ...bank, accountOwner: e.target.value })}
            css={TextFieldCSS}
          />
        </div>

        <div css={FormWrapperCSS}>
          <div
            css={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <Checkbox
              checked={privacyAgree}
              onChange={(e) => setPrivacyAgree(e.target.checked)}
              text="개인정보 수집 및 이용에 대한 동의"
            />
            <button
              type="button"
              css={ModalOpenButtonCSS}
              onClick={() => setModalOpen(true)}
            >
              내용보기
            </button>
          </div>
          <ul css={NotificationListCSS}>
            <li>
              고객님 본인계좌만 등록 가능하며, 타인 계좌 등록으로 환불이 된 경우
              이에 대한 책임을 지지 않습니다.
            </li>
            <li>
              계좌의 폐기 또는 중지로 인해 환불이 지연될 수 있으니 고객님의
              주거래 은행계좌를 등록 부탁드립니다.
            </li>
          </ul>
        </div>

        <div css={ButtonWrapperCSS}>
          <Button
            onClick={handleSave}
            disabled={!isSaveActive}
            layout="contained"
            css={ButtonCSS}
          >
            저장하기
          </Button>
        </div>
      </Layout>
      <BankModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

const TextFieldCSS = css({
  marginTop: 10,
  width: '100%',
  height: 60,
});

const ModalOpenButtonCSS = css({
  padding: 0,
  background: 'none',
  border: 'none',
  textDecoration: 'underline',
  fontSize: 14,
  lineHeight: '120%',
  color: color.text.secondary,
  width: 'fit-content',
  height: 'fit-content',
});

const NotificationListCSS = css({
  marginTop: 14,
  display: 'flex',
  flexDirection: 'column',
  listStyleType: '"·  "',
  paddingLeft: 18,
  gap: 8,

  '& li': {
    color: color.text.secondary,
    fontSize: 12,
    lineHeight: '120%',
  },
});
