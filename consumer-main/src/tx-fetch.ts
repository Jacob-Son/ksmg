import { ethers } from 'ethers';

const main = async () => {
  const hash =
    '0x8472351eafcae0be93b7f32d0a7a5be6d81746fbfe765207ac6746f75d14ac31';

  const provider = new ethers.JsonRpcProvider(
    'https://polygon-mumbai.infura.io/v3/8ef128519c9d4d7f9d6a26cc96bfcc2c',
  );

  const tx = await provider.getTransaction(hash);

  const receipt = await provider.getTransactionReceipt(hash);

  console.log('>>> tx = ', tx);
  console.log('>>> receipt = ', receipt);
};

main().then(() => process.exit(0));
