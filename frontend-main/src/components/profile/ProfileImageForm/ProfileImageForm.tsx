import Image from 'next/image';
import React, { useEffect } from 'react';
import {
  ContainerCSS,
  IconButtonCSS,
  ImageFormContainerCSS,
  ProfileImageSkeletonCSS,
} from './ProfileImageForm.styles';
import { css } from '@emotion/react';
import { useProfileStore } from 'src/stores/profile/profile.store';
import { useResponsive } from 'src/hooks/common/useResponsive';
import FormText from 'src/components/form/FormText';
import { color } from 'src/styles/colors';

export default function ProfileImageForm({
  defaultImage,
}: {
  defaultImage: string;
}) {
  const { isMobile } = useResponsive();
  const [image, setImage] = React.useState<string | null>(null);

  useEffect(() => {
    if (defaultImage) {
      setImage(defaultImage);
    }
  }, [defaultImage]);

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
    setImage(null);
  };
  return (
    <div css={ContainerCSS}>
      {isMobile && (
        <FormText
          text="프로필 사진 등록"
          required
          css={css({
            marginBottom: 20,
            marginRight: 'auto',
          })}
        />
      )}
      <div css={ImageFormContainerCSS}>
        {image ? (
          <Image
            alt="profile image"
            src={image}
            width={225}
            height={225}
            css={css({
              borderRadius: '50%',
              border: `1px solid ${color.line.primary}`,
            })}
          />
        ) : (
          <div css={ProfileImageSkeletonCSS} />
        )}
        <button
          type="button"
          onClick={handleImageChange}
          css={[IconButtonCSS, css({ marginLeft: -40 })]}
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
  );
}
