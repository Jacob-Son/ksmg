import React from 'react';
import TextField from 'src/components/common/TextField/TextField';
import FormText from 'src/components/form/FormText';
import CreateNFTSection from 'src/sections/CreateNFTSection/CreateNFTSection';
import { TextFieldCSS } from './NFTForm4.styles';
import { FormTitleCSS } from './NFTForm.styles';
import { useCreateNftStore } from 'src/stores/createNft/createNft.store';
import { createNftForm4Schema } from 'src/schemas/creatNft.schema';
import { INFTFormProps } from './NFTForm.types';

export default function NFTForm4({ step = 4, totalStep = 5 }: INFTFormProps) {
  const { price, setPrice, royalty, setRoyalty } = useCreateNftStore(
    (state) => ({
      price: state.price,
      setPrice: state.setPrice,
      royalty: state.royalty,
      setRoyalty: state.setRoyalty,
    }),
  );
  const isFormValid = createNftForm4Schema.isValidSync(
    { price, royalty },
    { abortEarly: true },
  );

  const handleChangeRoyalty = (e) => {
    if (Number(e.target.value) >= 100) {
      e.target.value = e.target.value.slice(0, 2);
    }
    setRoyalty(Number(e.target.value));
  };
  const checkCommisionError = (value: string) => {
    const num = Number(value);
    if (num > 15) {
      return '최대 수수료 15%가 넘어갑니다.';
    }
    return null;
  };

  return (
    <CreateNFTSection
      step={step}
      totalStep={totalStep}
      title="상품 가격 등록하기"
      description="상품의 가격과 2차 판매 수수료를 등록해주세요."
      nextDisabled={!isFormValid}
    >
      <FormText text="상품 가격" subText="(원 단위)" required />
      <TextField
        type="number"
        value={price}
        placeholder="판매할 가격을 입력해주세요"
        onChange={(e) => setPrice(e.target.value)}
        css={TextFieldCSS}
      />

      <FormText
        text="2차 판매 수수료"
        subText="(%)"
        description="등록하신 상품의 2차 판매 발생 시 돌아갈 수수료를 입력해주세요. "
        required
        css={FormTitleCSS}
      />
      <TextField
        type="number"
        value={royalty}
        placeholder="2차 판매 수수료는 최대 15%까지 가능합니다."
        min={0}
        max={15}
        onChange={handleChangeRoyalty}
        checkError={checkCommisionError}
        css={TextFieldCSS}
      />
    </CreateNFTSection>
  );
}
