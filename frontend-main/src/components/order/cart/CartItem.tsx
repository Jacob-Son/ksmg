import { ICartListProps } from './CartList';
import Check from 'src/components/common/Check';
import {
  CartItemWrapperCSS,
  ItemPriceTextCSS,
  ItemTitleTextCSS,
} from './CartItem.styles';
import Image from 'next/image';
import { css } from '@emotion/react';
import { addComma } from 'src/utils/format';
import { IconButtonCSS } from 'src/components/common/Button/Button.styles';
import XIcon from 'src/icons/XIcon';
import { color } from 'src/styles/colors';
import { ICartItemProps } from '~/types/cart';
import { useRouter } from 'next/router';

export default function CartItem({
  data,
  type = 'cart',
  onCheck,
  onDelete,
}: {
  data: ICartItemProps;
  type?: 'cart' | 'order';
  onCheck?: ICartListProps['onCheck'];
  onDelete?: () => void;
}) {
  const router = useRouter();
  return (
    <div css={CartItemWrapperCSS}>
      {type === 'cart' && (
        <Check
          checked={data.isChecked}
          onChange={() => onCheck(data.tokenId)}
          css={css({ marginTop: 8 })}
        />
      )}
      <div
        css={css({
          cursor: 'pointer',
        })}
        onClick={() => {
          router.push(`/store/${data.tokenId}`);
        }}
      >
        <Image
          src={data.image}
          alt={'nft image'}
          width={90}
          height={90}
          objectFit="cover"
        />
      </div>
      <div css={css({ marginLeft: 10, flex: 1, padding: '12px 0' })}>
        <p css={ItemTitleTextCSS}>{data.title}</p>
        <p css={ItemPriceTextCSS}>
          {addComma(data.price)} <span>원</span>
        </p>
      </div>
      {type === 'cart' && (
        <button
          type="button"
          css={[
            IconButtonCSS,
            css({ width: 20, height: 20, padding: '2px 2.5px' }),
          ]}
          onClick={onDelete}
        >
          <XIcon color={color.icon.secondary} />
        </button>
      )}
    </div>
  );
}
