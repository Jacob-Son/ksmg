import React from 'react';
import { ContainerCSS, HeadCSS, PaginationCSS } from '../library.styles';
import {
  ButtonCSS,
  DecorationCSS,
  HeadFlexCSS,
  InfoSectionCSS,
  InfoSectionValueCSS,
  InfoSectionTitleCSS,
  NotFoundBodyCSS,
  RequestButtonCSS,
  SettleItemsWrapperCSS,
} from './Settles.styles';
import Button from 'src/components/common/Button/Button';
import Image from 'next/image';
import { useResponsive } from 'src/hooks/common/useResponsive';
import { useRouter } from 'next/router';
import Pagination from 'src/components/common/Pagination/Pagination';
import SettleItem from './SettleItem';
import Modal from 'src/components/common/Modal/Modal';
import { css } from '@emotion/react';
import { useUserHistory } from 'src/hooks/library/useUserHistory';
import useSettle from 'src/hooks/library/useSettle';
import { addComma } from 'src/utils/format';
import { useUser } from 'src/hooks/mypage/useUser';
import { userApi } from 'src/services/user_api';
import SettleInfoCard from './SettleInfoCard';

export enum SettleTabEnum {
  BUY = 'buy',
  SELL = 'sell',
}

export default function Settles({ refetchNft }: { refetchNft: () => void }) {
  const { isMobile } = useResponsive();
  const router = useRouter();
  const { query } = router;
  const { page } = query;
  const [type, setType] = React.useState<SettleTabEnum>(SettleTabEnum.BUY);
  const [commissionErrorModal, setCommissionErrorModal] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const { history, refetch: refetchHistory } = useUserHistory(
    Number(page),
    type,
  );
  const { settlePrice, refetch: refetchPrice } = useSettle();
  const { user } = useUser();
  const isBankInfo = React.useMemo(() => {
    if (user) {
      if (user.bankName && user.accountNumber && user.accountOwner) {
        return true;
      } else {
        return false;
      }
    }
  }, [user]);

  const handleSettle = async () => {
    if (!user) return;
    const res = await userApi.requestSettle(user.userAddress);
    if (!res.success) return alert(JSON.stringify(res.error));

    alert('출금 요청이 완료되었습니다.');
    refetchHistory();
    refetchPrice();
    setModalOpen(false);
  };
  return (
    <>
      <div css={ContainerCSS}>
        <div css={HeadFlexCSS}>
          <p css={HeadCSS}>거래 내역</p>

          <div>
            <Button
              layout={type === SettleTabEnum.BUY ? 'contained' : 'outlined'}
              onClick={() => setType(SettleTabEnum.BUY)}
              css={ButtonCSS}
            >
              구매
            </Button>
            <Button
              layout={type === SettleTabEnum.SELL ? 'contained' : 'outlined'}
              onClick={() => setType(SettleTabEnum.SELL)}
              css={ButtonCSS}
            >
              판매
            </Button>
          </div>
        </div>

        {type === SettleTabEnum.SELL && (
          <div
            css={[
              InfoSectionCSS,
              css({ display: 'flex', alignItems: 'center', margin: '20px 0' }),
            ]}
          >
            <div>
              <p css={InfoSectionTitleCSS}>출금 가능금액 💵</p>
              <p css={InfoSectionValueCSS}>{addComma(settlePrice ?? 0)}원</p>
            </div>
            <Button
              layout="contained"
              onClick={() => {
                if (settlePrice < 2000) return setCommissionErrorModal(true);
                setModalOpen(true);
              }}
              css={RequestButtonCSS}
            >
              출금하기
            </Button>
          </div>
        )}

        {history?.histories && history?.histories.length > 0 ? (
          <>
            <div css={SettleItemsWrapperCSS}>
              <div css={DecorationCSS} />
              {history.histories.map((settle, i) => (
                <SettleItem
                  type={type}
                  data={settle}
                  showDate={
                    i === 0 ||
                    new Date(
                      history.histories[i].soldAt,
                    ).toLocaleDateString() !==
                      new Date(
                        history.histories[i - 1].soldAt,
                      ).toLocaleDateString()
                  }
                  refetchNft={refetchNft}
                  refetchHistory={() => refetchHistory()}
                  key={`settle_item_${settle.nftSaleId}`}
                />
              ))}
            </div>
            {history.totalPage && (
              <Pagination
                currentPage={Number(page || 1)}
                lastPage={history ? history.totalPage : 1}
                onClick={(val) =>
                  router.push({ query: { ...query, page: val } })
                }
                css={PaginationCSS}
              />
            )}
          </>
        ) : (
          <div css={NotFoundBodyCSS}>
            <Image
              alt="community"
              src="/imgs/library/img_settle_404.svg"
              width={isMobile ? 214 : 316}
              height={isMobile ? 113.8 : 169}
            />
            <p>
              {type === SettleTabEnum.BUY
                ? '구매 목록이 없습니다.'
                : '판매 목록이 없습니다.'}
            </p>
          </div>
        )}
      </div>
      <Modal
        title="출금 수수료 부족"
        description={
          '출금 시 필요한 수수료로 2000원이 소요됩니다.\n그러나 현재 판매금액이 2000원 미만으로 부족하여 출금이 불가능합니다.'
        }
        showLeftButton={false}
        rightText="확인"
        onClickRight={() => setCommissionErrorModal(false)}
        isShow={commissionErrorModal}
        onClose={() => setCommissionErrorModal(false)}
      />
      {isBankInfo ? (
        <Modal
          isShow={modalOpen}
          title="정산 요청하기"
          description={
            '아래 계좌번호가 맞는지 다시 한번 확인해주세요.\n정산 시 출금 수수료 2천원이 차감됩니다.'
          }
          onClose={() => setModalOpen(false)}
          leftText="수정하러가기"
          rightText="확인했어요"
          onClickLeft={() =>
            router.push('/mypage/bank?returnPath=/library?tab=settle')
          }
          onClickRight={handleSettle}
        >
          <div css={css({ display: 'flex', flexDirection: 'column', gap: 10 })}>
            <SettleInfoCard
              type={user?.bankName}
              value={user?.accountNumber}
              href="/mypage/bank?returnPath=/library?tab=settle"
            />
            <SettleInfoCard
              type="예금주"
              value={user?.accountOwner}
              href="/mypage/bank?returnPath=/library?tab=settle"
            />
            {/* <SettleInfoCard
              type="이메일"
              value={user?.email}
              href="/mypage/bank?returnPath=/library?tab=settle"
            /> */}
          </div>
        </Modal>
      ) : (
        <Modal
          isShow={modalOpen}
          title="계좌등록하기"
          description="정산 받으실 계좌번호를 등록해주세요."
          onClose={() => setModalOpen(false)}
          rightText="계좌등록하기"
          onClickRight={() =>
            router.push('/mypage/bank?prevPath=/library?tab=settle')
          }
          showLeftButton={false}
        />
      )}
    </>
  );
}
