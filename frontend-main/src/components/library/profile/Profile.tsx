import Image from 'next/image';
import {
  ProfileFlexCSS,
  ProfileImageCSS,
  UsernameCSS,
  AddressNameCSS,
  UserInfoWrapperCSS,
} from './Profile.styles';
import { reduceString } from 'src/utils/format';
import CopyIcon from 'src/icons/library/CopyIcon';
import { useUser } from 'src/hooks/mypage/useUser';

export default function Profile() {
  const { user } = useUser();

  if (!user) return <></>;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user?.userAddress);
      alert('주소가 복사되었습니다.');
    } catch (e) {
      alert('주소 복사에 실패하였습니다.');
    }
  };

  return (
    <div css={ProfileFlexCSS}>
      <Image
        alt="profile"
        src={
          user?.userProfileUrl
            ? user?.userProfileUrl
            : '/imgs/library/default-profile.png'
        }
        width={56}
        height={56}
        css={ProfileImageCSS}
      />
      <div css={UserInfoWrapperCSS}>
        <p css={UsernameCSS}>{user?.name}님 안녕하세요</p>
        {/* <p css={AddressNameCSS} onClick={handleCopy}>
          {reduceString(user?.userAddress)}
          <CopyIcon />
        </p> */}
      </div>
    </div>
  );
}
