import { css } from '@emotion/react';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Button from 'src/components/common/Button/Button';
import TextField from 'src/components/common/TextField/TextField';
import {
  ButtonCSS,
  ButtonWrapperCSS,
  FormNameCSS,
  FormWrapperCSS,
  LayoutCSS,
} from 'src/components/mypage/Mypage.styles';
import {
  IconButtonCSS,
  ImageFormContainerCSS,
  ProfileImageSkeletonCSS,
} from 'src/components/profile/ProfileImageForm/ProfileImageForm.styles';
import SupportsHead from 'src/components/supports/SupportsHead';
import useAccount from 'src/hooks/common/useAccount';
import { useUser } from 'src/hooks/mypage/useUser';
import Layout from 'src/layout/Layout';
import { mypagePrivacyFormSchema } from 'src/schemas/mypage.schema';
import { userApi } from 'src/services/user_api';
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

export default function PrivacyPage() {
  const title = '개인정보 수정';
  const router = useRouter();
  const { query } = router;
  const { returnPath } = query;
  const [image, setImage] = React.useState<string>('');
  const [name, setName] = React.useState('');
  const [creatorName, setCreatorName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState({
    first: '',
    second: '',
    third: '',
  });
  const [email, setEmail] = React.useState('');
  const [isSaveActive, setIsSaveActive] = React.useState(false);
  const { address } = useAccount();

  const { user, refetch } = useUser();

  useEffect(() => {
    if (user) {
      setName(user.name);
      const [first, second, third] = user.phoneNumber.split('-');
      setPhoneNumber({
        first,
        second,
        third,
      });
      setImage(user.userProfileUrl);
      setCreatorName(user.creatorName);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    mypagePrivacyFormSchema
      .validate(
        {
          profileImage: image,
          name,
          creatorName,
          phoneNumber,
        },
        { abortEarly: true },
      )
      .then(() => {
        if (!user) return;
        const userName = user.name;
        const [first, second, third] = user.phoneNumber.split('-');
        const profileImage = user.userProfileUrl;

        if (
          name === userName &&
          phoneNumber.first === first &&
          phoneNumber.second === second &&
          phoneNumber.third === third &&
          image === profileImage &&
          creatorName === user.creatorName
        ) {
          setIsSaveActive(false);
        } else {
          setIsSaveActive(true);
        }
      })
      .catch(() => {
        setIsSaveActive(false);
      });
  }, [image, user, name, phoneNumber, creatorName]);

  const handleImageChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
    };
    input.click();
  };
  const handleImageDelete = () => {
    setImage('');
  };

  const handleSave = async () => {
    if (!address) return;

    const imageFile = image
      ? image !== user.userProfileUrl
        ? dataURLtoFile(image, 'profile.png')
        : user.userProfileUrl
      : undefined;

    const profileInfo = new FormData();
    if (imageFile) {
      profileInfo.append('profileImage', imageFile);
    }
    if (name) {
      profileInfo.append('name', name);
    }
    if (creatorName) {
      profileInfo.append('creatorName', creatorName);
    }
    if (email) {
      profileInfo.append('email', email);
    }
    if (phoneNumber.first && phoneNumber.second && phoneNumber.third) {
      profileInfo.append(
        'phoneNumber',
        `${phoneNumber.first}-${phoneNumber.second}-${phoneNumber.third}`,
      );
    }
    await userApi.updateProfile(address, profileInfo);
    refetch();
    alert('저장되었습니다.');
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
          title="개인정보 수정"
          description={'고객님의 성함, 휴대폰번호를 올바르게 입력해주세요.'}
        />
        <div css={FormWrapperCSS}>
          <p css={FormNameCSS}>프로필 사진</p>
          <div css={[ImageFormContainerCSS, css({ marginTop: 10 })]}>
            {image ? (
              <Image
                alt="profile image"
                src={image}
                width={120}
                height={120}
                css={css({
                  borderRadius: '50%',
                })}
              />
            ) : (
              <div
                css={[
                  ProfileImageSkeletonCSS,
                  css({
                    width: 120,
                    height: 120,
                  }),
                ]}
              />
            )}
            <button
              type="button"
              onClick={handleImageChange}
              css={[IconButtonCSS, css({ marginLeft: -30 })]}
            >
              <Image
                alt="camera icon"
                src="/icons/profile/ic_camera.svg"
                width={20.7}
                height={18}
              />
            </button>
            <button
              type="button"
              onClick={handleImageDelete}
              css={[IconButtonCSS, css({ marginLeft: 12 })]}
            >
              <Image
                alt="x icon"
                src="/icons/profile/ic_x_gray.svg"
                width={16.7}
                height={16.7}
              />
            </button>
          </div>
        </div>

        <div css={FormWrapperCSS}>
          <p css={FormNameCSS}>성명</p>
          <TextField
            placeholder="이름을 입력해주세요"
            css={css({ marginTop: 10 })}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div css={FormWrapperCSS}>
          <p css={FormNameCSS}>이메일</p>
          {/* <TextField disabled css={css({ marginTop: 10 })} value={email} /> */}
        </div>
        <div css={FormWrapperCSS}>
          <p css={FormNameCSS}>판매자명</p>
          <TextField
            placeholder="판매자명을 입력해주세요"
            css={css({ marginTop: 10 })}
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
          />
        </div>
        <div css={FormWrapperCSS}>
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
              type="string"
              maxLength={3}
              value={phoneNumber.first}
              // disabled
              onChange={(e) => {
                const regex = /^[0-9]*$/;
                if (!regex.test(e.target.value)) return;
                setPhoneNumber({ ...phoneNumber, first: e.target.value });
              }}
            />
            <TextField
              type="string"
              maxLength={4}
              value={phoneNumber.second}
              // disabled
              onChange={(e) => {
                const regex = /^[0-9]*$/;
                if (!regex.test(e.target.value)) return;
                setPhoneNumber({ ...phoneNumber, second: e.target.value });
              }}
            />
            <TextField
              type="string"
              maxLength={4}
              value={phoneNumber.third}
              // disabled
              onChange={(e) => {
                const regex = /^[0-9]*$/;
                if (!regex.test(e.target.value)) return;
                setPhoneNumber({ ...phoneNumber, third: e.target.value });
              }}
            />
          </div>
        </div>

        <div css={ButtonWrapperCSS}>
          <Button
            onClick={handleSave}
            // disabled={!isSaveActive}
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
