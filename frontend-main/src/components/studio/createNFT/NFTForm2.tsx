import React from 'react';
import TextField from 'src/components/common/TextField/TextField';
import FormText from 'src/components/form/FormText';
import CreateNFTSection from 'src/sections/CreateNFTSection/CreateNFTSection';
import { FormTitleCSS, UploadedA5ImageCSS } from './NFTForm.styles';
import {
  CoversGridCSS,
  ImageUploadCSS,
  ImageUploadFlexCSS,
  RadioCSS,
  RadioFlexCSS,
  RadioFormCSS,
  TextFieldCSS,
} from './NFTForm2.styles';
import TextArea from 'src/components/common/TextField/TextArea';
import FileUpload from 'src/components/common/FileUpload/FIleUpload';
import UploadedImage from 'src/components/common/UploadedImage/UploadedImage';
import { css } from '@emotion/react';
import { color } from 'src/styles/colors';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { useCreateNftStore } from 'src/stores/createNft/createNft.store';
import {
  createNftForm2Schema,
  createNftForm2SchemaNotAmount,
} from 'src/schemas/creatNft.schema';
import { INFTFormProps } from './NFTForm.types';

export default function NFTForm2({
  step = 2,
  totalStep = 5,
  isCountForm = true,
}: INFTFormProps) {
  const { isMobile } = useResponsive();
  const {
    name,
    setName,
    description,
    setDescription,
    amount,
    setAmount,
    detail,
    setDetail,
    covers,
    setCovers,
  } = useCreateNftStore((state) => ({
    name: state.name,
    setName: state.setName,
    description: state.description,
    setDescription: state.setDescription,
    amount: state.amount,
    setAmount: state.setAmount,

    detail: state.detail,
    setDetail: state.setDetail,
    covers: state.covers,
    setCovers: state.setCovers,
  }));
  const [detailType, setDetailType] = React.useState<'text' | 'image'>('text');
  const isFormValid = isCountForm
    ? createNftForm2Schema.isValidSync(
        { name, description, amount, detail, covers },

        { abortEarly: true },
      )
    : createNftForm2SchemaNotAmount.isValidSync(
        { name, description, detail, covers },

        { abortEarly: true },
      );

  const handleSelectDetailType = (e) => {
    const { value } = e.target;
    if (detailType !== value) {
      setDetail({
        text: null,
        image: null,
      });
    }
    setDetailType(value);
  };
  const handleAddDetailImage = (e) => {
    const target = e.target as HTMLInputElement;
    const file = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file as File);
    reader.onloadend = () => {
      setDetail({ image: reader.result as string });
    };
  };
  const handleRemoveDetailImage = () => {
    setDetail({ image: null });
  };

  const handleAddCoverImages = (e) => {
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
      let result = covers.concat(files as string[]);
      if (result.length > 6) {
        result = result.slice(-6);
      }
      setCovers(result);
    });
  };

  const checkError = (value: string) => {
    const num = Number(value);
    if (num > 500) {
      return '최대 수량 500개가 넘어갑니다.';
    }
    return null;
  };

  React.useEffect(() => {
    if (detail.image) {
      setDetailType('image');
    }
    if (detail.text) {
      setDetailType('text');
    }
  }, [description]);

  return (
    <CreateNFTSection
      step={step}
      totalStep={totalStep}
      title="작품 상세 설정"
      description={
        <>
          작품 정보가 등록된 후에는 해당 정보를 변경할 수 없습니다.
          <br />
          이미지는 <span>A5 사이즈</span>로 업로드해주세요.
        </>
      }
      nextDisabled={!isFormValid}
    >
      <FormText text="작품 제목" required />
      <TextField
        value={name}
        placeholder="작품 이름을 지정해주세요"
        maxLength={20}
        showCount
        onChange={(e) => setName(e.target.value)}
        css={TextFieldCSS}
      />

      <FormText text="간단 설명" required css={FormTitleCSS} />
      <TextField
        value={description}
        placeholder="작품 제목 밑에 들어갈 간단 설명을 160자 이내로 써주세요."
        maxLength={160}
        showCount
        onChange={(e) => setDescription(e.target.value)}
        css={TextFieldCSS}
      />

      {isCountForm && <FormText text="작품 수량" required css={FormTitleCSS} />}
      {isCountForm && (
        <TextField
          type="number"
          value={amount}
          placeholder="발매할 작품 수량을 기입해주세요 500개가 최대입니다."
          min={0}
          max={500}
          checkError={checkError}
          showCount
          onChange={(e) => setAmount(Number(e.target.value))}
          css={TextFieldCSS}
        />
      )}

      <FormText
        text="상세 설명"
        description="상세 설명은 글과 이미지 중 한가지의 방법으로 업로드 할 수 있습니다."
        required
        css={FormTitleCSS}
      />

      <form css={RadioFormCSS}>
        <div>
          <div css={RadioFlexCSS}>
            <input
              type="radio"
              value="text"
              checked={detailType === 'text'}
              onChange={handleSelectDetailType}
              css={RadioCSS}
            />
            <p>텍스트</p>
          </div>

          {detailType === 'text' && (
            <TextArea
              value={detail?.text}
              placeholder="상세 설명을 입력해주세요"
              onChange={(e) =>
                setDetail({
                  text: e.target.value,
                })
              }
              maxLength={3000}
              showCount
              css={TextFieldCSS}
            />
          )}
        </div>

        <div>
          <div css={RadioFlexCSS}>
            <input
              type="radio"
              value="image"
              checked={detailType === 'image'}
              onChange={handleSelectDetailType}
              css={RadioCSS}
            />
            <p>이미지</p>
          </div>
          {detailType === 'image' && (
            <div css={[ImageUploadFlexCSS, css({ marginTop: 10 })]}>
              <FileUpload
                onChange={handleAddDetailImage}
                css={ImageUploadCSS}
              />
              {detail?.image && (
                <UploadedImage
                  image={detail.image}
                  onDelete={handleRemoveDetailImage}
                />
              )}
            </div>
          )}
        </div>
      </form>

      <FormText
        text="작품 표지 이미지 업로드"
        description={
          <span css={css({ color: color.purple })}>
            작품 표지 이미지는 모두에게 보여지는 이미지입니다.
            <br />
            표지 이미지는 A5(148*210) 사이즈로 조절해서 업로드해주세요. 최대
            6장까지 업로드 할 수 있습니다.
            <br />
            2장 이상의 표지 등록 시 동일한 비율로 작품 수량에 매칭 후 남는
            수량은 랜덤하게 매칭됩니다.
          </span>
        }
        required
        css={FormTitleCSS}
      />
      <div css={[ImageUploadFlexCSS, css({ marginTop: 20 })]}>
        <FileUpload
          title="A5 미디어 파일 업로드하기"
          multiple
          fileNum={6}
          onChange={handleAddCoverImages}
          css={ImageUploadCSS}
        />
        {covers.length > 0 && (
          <div css={CoversGridCSS}>
            {covers.map((cover, idx) => (
              <UploadedImage
                image={cover}
                key={`cover-${cover}`}
                {...(isMobile && { width: '100%' })}
                onDelete={() => {
                  setCovers(covers.filter((_, i) => i !== idx));
                }}
                {...(isMobile && {
                  width: '100%',
                  height: 'auto',
                })}
                css={UploadedA5ImageCSS}
              />
            ))}
          </div>
        )}
      </div>
    </CreateNFTSection>
  );
}
