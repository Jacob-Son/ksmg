import Image from 'next/image';
import React from 'react';
import { IconButtonCSS } from 'src/components/common/Button/Button.styles';
import Select from 'src/components/common/Select/Select';
import FormText from 'src/components/form/FormText';
import {
  AddAttributeButtonCSS,
  NftAttributesFormGridCSS,
} from './NFTForm1.styles';
import PlusIcon from 'src/icons/PlusIcon';
import { color } from 'src/styles/colors';
import CreateNFTSection from 'src/sections/CreateNFTSection/CreateNFTSection';
import { FormTitleCSS, TextFieldCSS } from './NFTForm.styles';
import InstructionModal from 'src/components/common/Modal/InstructionModal';
import { useCreateNftStore } from 'src/stores/createNft/createNft.store';
import AttributeRow from './Attributes/AttributeRow';
import { createNftForm1Schema } from 'src/schemas/creatNft.schema';
import { INFTFormProps } from './NFTForm.types';
import { categoryData } from 'src/pages/category';

export default function NFTForm1({ step = 1, totalStep = 5 }: INFTFormProps) {
  const { category, setCategory, theme, setTheme, attributes, setAttributes } =
    useCreateNftStore((state) => ({
      category: state.category,
      setCategory: state.setCategory,
      theme: state.theme,
      setTheme: state.setTheme,
      attributes: state.attributes,
      setAttributes: state.setAttributes,
    }));
  const [isInfoOpen, setIsInfoOpen] = React.useState(false);

  const categoryOptions = categoryData
    .filter((x) => x.name !== '전체 상품')
    .map((category) => ({
      label: category.name,
      value: category.name,
    }));
  const themeOptions = React.useMemo(
    () =>
      categoryData
        .find((x) => x.name === category)
        ?.children?.filter((x) => x !== '전체')
        .map((item) => ({
          label: item,
          value: item,
        })),
    [category],
  );

  const handleChangeAttributes = (e, index: number, type: 'key' | 'value') => {
    const result = [...attributes];
    result[index][type] = e.target.value;
    setAttributes(result);
  };

  const isFormValid = createNftForm1Schema.isValidSync(
    { category, theme, attributes },
    { abortEarly: true },
  );

  return (
    <CreateNFTSection
      step={step}
      totalStep={totalStep}
      title="상품 카테고리 설정"
      description="등록하실 상품에 맞는 카테고리를 골라주세요."
      nextDisabled={!isFormValid}
    >
      <FormText text="상품 카테고리를 골라주세요." required />
      <Select
        value={category}
        placeholder="상품 카테고리 선택"
        options={categoryOptions}
        onChange={(value) => setCategory(value)}
        css={TextFieldCSS}
      />
      {category === '육필 시' && (
        <>
          <FormText
            text="상품 주제를 골라주세요."
            required
            css={FormTitleCSS}
          />
          <Select
            value={theme}
            placeholder="상품 주제 선택"
            options={themeOptions}
            onChange={(value) => setTheme(value)}
            css={TextFieldCSS}
          />
        </>
      )}
      <FormText
        text="상품 특성 설정"
        description="특성은 아이템의 속성을 설명합니다. 상품 설명 내에 표시됩니다"
        endAdornment={
          <button
            type="button"
            onClick={() => setIsInfoOpen(true)}
            css={IconButtonCSS}
          >
            <Image alt="info" src="/icons/ic_info.svg" width={22} height={22} />
          </button>
        }
        css={FormTitleCSS}
      />

      <div css={NftAttributesFormGridCSS}>
        <p>유형</p>
        <p>이름</p>
        <div />
        <AttributeRow
          type={attributes[0]?.key || ''}
          value={attributes[0]?.value || ''}
          onChangeType={(e) => {
            if (attributes.length == 0) {
              setAttributes([{ key: e.target.value }]);
              return;
            }
            handleChangeAttributes(e, 0, 'key');
          }}
          onChangeValue={(e) => {
            if (attributes.length == 0) {
              setAttributes([{ value: e.target.value }]);
              return;
            }
            handleChangeAttributes(e, 0, 'value');
          }}
          onDelete={() => setAttributes(attributes.filter((_, i) => i !== 0))}
        />
        {Array.from({ length: attributes.length }).map(
          (_, index) =>
            index > 0 && (
              <AttributeRow
                key={`attr_${attributes[index]?.key} ${attributes[index]?.value}_${index}`}
                type={attributes[index]?.key}
                value={attributes[index]?.value}
                onBlurKey={(e) => {
                  handleChangeAttributes(e, index, 'key');
                }}
                onBlurValue={(e) => {
                  handleChangeAttributes(e, index, 'value');
                }}
                onDelete={() => {
                  setAttributes(attributes.filter((_, idx) => idx !== index));
                }}
              />
            ),
        )}
      </div>
      {attributes.length < 4 && (
        <button
          type="button"
          css={AddAttributeButtonCSS}
          onClick={() => {
            if (attributes.length == 0) {
              setAttributes([{}, {}]);
              return;
            }
            setAttributes([...attributes, {}]);
          }}
        >
          <PlusIcon color={color.blue.main} />
          <p>특성 추가하기</p>
        </button>
      )}
      <InstructionModal
        open={isInfoOpen}
        title="상품 특성 설명"
        description={
          <>
            상품 특성이란 상품의 속성을 설명하는 것으로, 상품 설명 내에
            표시됩니다.
          </>
        }
        onClose={() => setIsInfoOpen(false)}
      />
    </CreateNFTSection>
  );
}
