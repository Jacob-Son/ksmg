import Image from 'next/image';
import {
  ArrowButtonCSS,
  CarouselIndexCSS,
  ImageCSS,
  ImagesWrapperCSS,
  ProductImageCarouselContainerCSS,
} from './ProductImageCarousel.styles';
import React from 'react';

interface IProductImageCarouselProps {
  images: Array<{ src: string; alt: string }>;
}

export default function ProductImageCarousel(
  props: IProductImageCarouselProps,
) {
  const [current, setCurrent] = React.useState(0);

  const isClickableRef = React.useRef(true);

  const throttledSetCurrent = (index: number) => {
    if (isClickableRef) {
      setCurrent(index);
      isClickableRef.current = false;
      setTimeout(() => {
        isClickableRef.current = true;
      }, 500);
    }
  };
  const handlePrev = () => {
    throttledSetCurrent(current - 1);
  };
  const handleNext = () => {
    throttledSetCurrent(current + 1);
  };

  return (
    <div css={ProductImageCarouselContainerCSS}>
      <div
        css={[
          ImagesWrapperCSS,
          {
            transform: `translateX(calc(100% * ${current} * -1))`,
          },
        ]}
      >
        {props.images.concat(props.images).map((image, index) => (
          <div css={ImageCSS} key={`product_image_carousel_${index}`}>
            <Image
              src={image.src}
              alt={`${image.alt} ${index}`}
              width={400}
              height={400} 
              style={{ objectFit: 'cover' }}

            />
          </div>
        ))}
      </div>
      {current > 0 && (
        <button type="button" css={ArrowButtonCSS('left')} onClick={handlePrev}>
          <Image
            alt="left arrow"
            src="/icons/ic_arrow_left.svg"
            width={24}
            height={24}
          />
        </button>
      )}
      {current < props.images.length - 1 && (
        <button
          type="button"
          css={ArrowButtonCSS('right')}
          onClick={handleNext}
        >
          <Image
            alt="right arrow"
            src="/icons/ic_arrow_right.svg"
            width={24}
            height={24}
          />
        </button>
      )}
      <div css={CarouselIndexCSS}>
        <p>
          {(current % (props.images.length || 1)) + 1} /{' '}
          {props.images.length || 1}
        </p>
      </div>
    </div>
  );
}
