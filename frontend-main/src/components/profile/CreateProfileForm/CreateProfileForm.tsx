import React from 'react';
import ProfileNameForm from '../ProfileNameForm/ProfileNameForm';
import Button from 'src/components/common/Button/Button';
import {
  FormFlexCotainerCSS,
  SubmitButtonCSS,
} from './CreateProfileForm.styles';
import CreateProfileModal from '../modal/CreateProfileModal/CreateProfileModal';
import { useRouter } from 'next/router';
import { useProfileStore } from 'src/stores/profile/profile.store';
import { useUser } from 'src/hooks/mypage/useUser';
import { studioApi } from 'src/services/studio_api';

export default function CreateProfileForm({
  callback,
}: {
  callback?: () => void;
}) {
  const router = useRouter();
  const { user, refetch } = useUser();
  const { nickname, isNicknameValid, isComplete, setIsComplete, reset } =
    useProfileStore((state) => ({
      nickname: state.nickname,
      isNicknameValid: state.isNicknameValid,
      isComplete: state.isComplete,
      setIsComplete: state.setIsComplete,
      reset: state.resetProfileStore,
    }));
  const [showModal, setShowModal] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);

  React.useEffect(() => {
    if (!nickname || !isNicknameValid) return;
    setIsComplete(true);
  }, [nickname, isNicknameValid]);

  React.useEffect(() => {
    if (submit) return reset;
    const handleRouteChange = () => {
      if (
        !window.confirm('작성 중이던 내용이 사라집니다. 정말 나가시겠습니까?')
      ) {
        router.events.emit('routeChangeError');
        throw 'routeChange aborted.';
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      reset();
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [submit]);
  return (
    <>
      <div css={FormFlexCotainerCSS}>
        {user && <ProfileNameForm defaultName={user.creatorName} />}
      </div>

      <Button
        layout="contained"
        disabled={!isComplete}
        onClick={() => setShowModal(true)}
        css={SubmitButtonCSS}
      >
        {isComplete ? '작품 등록 시작하기' : '다음으로 넘어가기'}
      </Button>

      <CreateProfileModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={async () => {
          setSubmit(true);
          await studioApi.setCreatorProfile(user.userAddress, nickname);
          await refetch();
          if (callback) {
            callback();
          } else {
            router.push('/studio/create-ebook');
          }
        }}
      />
    </>
  );
}
