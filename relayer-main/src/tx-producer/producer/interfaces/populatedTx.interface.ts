export interface PopulatedTx {
  from: string;
  to: string;
  value: bigint | string; // FIXME: bigint type?
  data: string;
  type: number; // default 2 for EIP-1559
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  gasPrice: bigint;
  nonce: number;
  gasLimit: bigint;
  chainId: bigint;
}
