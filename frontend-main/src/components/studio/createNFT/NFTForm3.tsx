import { css } from '@emotion/react';
import React from 'react';
import FileUpload from 'src/components/common/FileUpload/FIleUpload';
import CreateNFTSection from 'src/sections/CreateNFTSection/CreateNFTSection';
import { InstructionsCSS, PagesGridCSS } from './NFTForm3.styles';
import { useCreateNftStore } from 'src/stores/createNft/createNft.store';
import { createNftForm3Schema } from 'src/schemas/creatNft.schema';
import PageItem from './PageItem';
import { INFTFormProps } from './NFTForm.types';

export default function NFTForm3({ step = 3, totalStep = 5 }: INFTFormProps) {
  const { pages, setPages } = useCreateNftStore((state) => ({
    pages: state.pages,
    setPages: state.setPages,
  }));
  const isFormValid = createNftForm3Schema.isValidSync({ pages });

  const handleChangeFiles = (e) => {
    const target = e.target as HTMLInputElement;
    const fileLoadPromises = Array.from(target.files as FileList).map(
      (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
        });
      },
    );

    Promise.all(fileLoadPromises).then((files) => {
      let result = pages.concat(files as string[]);
      if (result.length > 500) {
        result = result.slice(-500);
      }
      setPages(result);
    });
  };
  const handlePageNumChange = (e, current) => {
    let value = e.target.value;
    if (Number(value) > 500) {
      value = '500';
      e.target.value = value;
    }
    if (Number(value) < 0) {
      value = '0';
      e.target.value = value;
    }
    e.target.style.width = `${value.length + 1}ch`;

    if (e.key === 'Enter') {
      const index = Number(e.target.value) - 1;
      if (index + 1 < pages.length) {
        const result = [...pages];
        const currentVal = result.splice(current, 1)[0]; // 현재 위치에서 항목 제거 및 저장
        result.splice(index, 0, currentVal);
        setPages(result);
      } else {
        const result = [...pages];
        result.splice(current, 1);
        result.push(pages[current]);
        setPages(result);
      }
    }
  };

  return (
    <CreateNFTSection
      step={step}
      totalStep={totalStep}
      title="작품 내용 등록하기"
      description={
        <>
          작품 내용이 등록된 후에는 해당 정보를 변경할 수 없습니다.
          <span>A5 사이즈</span>로 업로드해주세요. 작품 내용은 작품을 보유한
          계정에 한해 확인할 수 있습니다. 최대 500개까지 업로드하기
        </>
      }
      nextDisabled={!isFormValid}
    >
      <FileUpload
        title="A5 미디어 파일 업로드하기"
        multiple
        fileNum={500}
        maxFileSize={3}
        onChange={handleChangeFiles}
        css={css({ width: '100%' })}
      />
      {pages.length > 0 && (
        <>
          <p css={InstructionsCSS}>
            페이지 번호를 수정하면 해당 숫자에 맞게 페이지 순서가 변경됩니다.
          </p>
          <div css={PagesGridCSS}>
            {pages.map((page, index) => (
              <PageItem
                key={`pages_form_${page}_${index}`}
                page={page}
                index={index}
                onDelete={() => {
                  setPages(pages.filter((_, i) => i !== index));
                }}
                onPageNumChange={(e) => handlePageNumChange(e, index)}
              />
            ))}
          </div>
        </>
      )}
    </CreateNFTSection>
  );
}
