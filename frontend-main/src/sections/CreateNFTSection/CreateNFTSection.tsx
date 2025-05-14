import React from 'react';
import {
  ButtonsFlexCSS,
  DescriptionCSS,
  HeaderCSS,
  NextBtnCSS,
  PrevBtnCSS,
  ProgressTextCSS,
  TitleCSS,
} from './CreateNFTSection.styles';
import Button from 'src/components/common/Button/Button';
import Image from 'next/image';
import { useCreateNftStore } from 'src/stores/createNft/createNft.store';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { useRouter } from 'next/router';
import ChevronLeftIcon from 'src/icons/ChevronLeftIcon';
import { color } from 'src/styles/colors';
import { IconButtonCSS } from 'src/components/common/Button/Button.styles';

interface ICreateNFTSectionProps {
  step: number;
  totalStep: number;
  title: string;
  description: React.ReactNode;
  children?: React.ReactNode;
  nextDisabled: boolean;
  onPrev?: () => void;
  onComplete?: () => void;
}

export default function CreateNFTSection(props: ICreateNFTSectionProps) {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const { currentStep, setCurrentStep } = useCreateNftStore((state) => ({
    currentStep: state.currentStep,
    setCurrentStep: state.setCurrentStep,
  }));
  if (currentStep !== props.step) return null;

  const handlePrev = () => {
    window.scrollTo(0, 0);
    setCurrentStep(props.step - 1);
  };

  return (
    <>
      {isMobile && (
        <header css={HeaderCSS}>
          <button
            type="button"
            css={IconButtonCSS}
            onClick={() => {
              if (currentStep === 1) {
                props.onPrev ? props.onPrev() : router.back();
              } else {
                handlePrev();
              }
            }}
          >
            <ChevronLeftIcon color={color.icon.primary} />
          </button>
          <p>{props.title}</p>
        </header>
      )}
      <div>
        <p css={ProgressTextCSS}>
          {props.step} of {props.totalStep}
        </p>
        <h2 css={TitleCSS}>{props.title}</h2>
        <p css={DescriptionCSS}>{props.description}</p>
      </div>
      <div>{props.children}</div>
      <div css={ButtonsFlexCSS}>
        {props.step !== 1 && (
          <Button onClick={handlePrev} layout="contained" css={PrevBtnCSS}>
            <Image
              alt="chevron-left"
              src="/icons/ic_chevron_left.svg"
              width={30}
              height={30}
            />
          </Button>
        )}
        <Button
          onClick={() => {
            if (props.step === props.totalStep) {
              props.onComplete && props.onComplete();
              return;
            }
            window.scrollTo(0, 0);
            setCurrentStep(props.step + 1);
          }}
          disabled={props.nextDisabled}
          layout="contained"
          css={NextBtnCSS}
        >
          {props.step === props.totalStep
            ? '상품 등록하기'
            : '다음으로 넘어가기'}
        </Button>
      </div>
    </>
  );
}
