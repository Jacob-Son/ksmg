import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import AddressSection from 'src/components/address/AddressSection';
import Button from 'src/components/common/Button/Button';
import {
  ButtonCSS,
  ButtonWrapperCSS,
  LayoutCSS,
} from 'src/components/mypage/Mypage.styles';
import SupportsHead from 'src/components/supports/SupportsHead';
import useAccount from 'src/hooks/common/useAccount';
import { useShipping } from 'src/hooks/mypage/useShipping';
import Layout from 'src/layout/Layout';
import { mypageAddressFormSchema } from 'src/schemas/mypage.schema';
import { userApi } from 'src/services/user_api';

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

export default function AddressPage() {
  const title = '주소록 관리';
  const router = useRouter();
  const { query } = router;
  const { returnPath } = query;

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
  const [isSaveAvailable, setIsSaveAvailable] = React.useState(false);
  const { address: walletAddress } = useAccount();
  const { shipping, refetch } = useShipping();

  React.useEffect(() => {
    if (shipping) {
      setName(shipping.name);
      const [first, second, third] = shipping.phoneNumber.split('-');
      setPhoneNumber({
        first,
        second,
        third,
      });
      setAddress({
        zonecode: shipping.postCode,
        address: shipping.mainAddress,
        detailAddress: shipping.detailAddress,
      });
    }
  }, [shipping]);

  React.useEffect(() => {
    mypageAddressFormSchema
      .validate({ name, phoneNumber, address }, { abortEarly: true })
      .then(() => {
        if (!shipping) return setIsSaveAvailable(true);

        const {
          name: originName,
          phoneNumber: originPhone,
          postCode: originCode,
          mainAddress: originMainAddress,
          detailAddress: originDetailAddress,
        } = shipping;
        if (
          name === originName &&
          phoneNumber.first === originPhone.split('-')[0] &&
          phoneNumber.second === originPhone.split('-')[1] &&
          phoneNumber.third === originPhone.split('-')[2] &&
          address.zonecode === originCode &&
          address.address === originMainAddress &&
          address.detailAddress === originDetailAddress
        ) {
          setIsSaveAvailable(false);
        } else {
          setIsSaveAvailable(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsSaveAvailable(false);
      });
  }, [name, phoneNumber, address, shipping]);

  const handleSave = async () => {
    if (!walletAddress) return;
    try {
      await userApi.updateShippingInfo(walletAddress, {
        name,
        phoneNumber: `${phoneNumber.first}-${phoneNumber.second}-${phoneNumber.third}`,
        postCode: address.zonecode,
        mainAddress: address.address,
        detailAddress: address.detailAddress,
      });
      alert('주소가 저장되었습니다.');
      refetch();
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
          title="주소록 관리"
          description={'배송 받으실 주소를 입력해주세요.'}
          returnUrl="/mypage/address"
        />

        <AddressSection
          name={name}
          phoneNumber={phoneNumber}
          address={address}
          setName={setName}
          setPhoneNumber={setPhoneNumber}
          setAddress={setAddress}
        />

        <div css={ButtonWrapperCSS}>
          <Button
            onClick={handleSave}
            disabled={!isSaveAvailable}
            layout="contained"
            css={ButtonCSS}
          >
            저장하기
          </Button>
        </div>
      </Layout>
    </>
  );
}
