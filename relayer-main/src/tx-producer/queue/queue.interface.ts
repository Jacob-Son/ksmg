import { SignedTx } from '../producer/interfaces/signedTx.interface';
export interface SignedTxQueueData {
  data: {
    relayerId: number;
    txHash: string;
    signedTx: SignedTx;
  };
  // TODO: additional validation data
}
