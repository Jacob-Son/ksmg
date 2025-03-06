import React from 'react';
import InstructionModal from 'src/components/common/Modal/InstructionModal';
import { NotificationListCSS, TableCSS } from './BankModal.styles';

export default function BankModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <InstructionModal
      title="개인정보 수집 및 이용안내 (필수)"
      open={open}
      onClose={onClose}
    >
      <table css={TableCSS}>
        <thead>
          <tr>
            <th>수집항목</th>
            <th>이용목적</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              예금주,
              <br />
              은행명, 계좌번호
            </td>
            <td>
              환불계좌 등록,
              <br />
              정산계좌 등록
            </td>
          </tr>
        </tbody>
      </table>
      <ul css={NotificationListCSS}>
        <li>
          개인정보의 보유 및 이용 기간: 회원탈퇴 시 또는 법정 의무 보유기간
        </li>
        <li>
          이용자는 동의를 거부 할 권리가 있습니다. 단, 동의를 거부 할 경우
          서비스 이용이 불가합니다.
        </li>
      </ul>
    </InstructionModal>
  );
}
