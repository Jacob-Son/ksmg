import TextField from 'src/components/common/TextField/TextField';
import { DeleteButtonCSS } from '../NFTForm1.styles';
import Image from 'next/image';

interface IAttributeRowProps {
  type?: string;
  value?: string;
  onChangeType?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurKey?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlurValue?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
}

export default function AttributeRow({
  type,
  value,
  onChangeType,
  onChangeValue,
  onBlurKey,
  onBlurValue,
  onDelete,
}: IAttributeRowProps) {
  return (
    <>
      <TextField
        placeholder="예 : 크기"
        value={type}
        onChange={onChangeType}
        onBlur={onBlurKey}
      />
      <TextField
        placeholder="예 : 대형"
        value={value}
        onChange={onChangeValue}
        onBlur={onBlurValue}
      />
      <button type="button" css={DeleteButtonCSS} onClick={onDelete}>
        <Image
          alt="delete"
          src="/icons/create-ebook/ic_trash.svg"
          width={23}
          height={26}
        />
      </button>
    </>
  );
}
