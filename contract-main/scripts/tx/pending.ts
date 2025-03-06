import { Wallet } from "ethers";
import { hexlify } from "ethers/lib/utils";
import { ethers } from "hardhat";

// pending된 tx 뚫을때 사용
async function main() {
  const nonce = await ethers.provider.getTransactionCount(
    process.env.EBOOK_ADMIN_ADDRESS!!
  );
  console.log(nonce);

  //   const replacementTx = {
  //     nonce: hexlify(16),
  //     gasPrice: ethers.utils.parseUnits("200", "gwei"),
  //     gasLimit: 249749,
  //     to: process.env.EBOOK_ADMIN_ADDRESS,
  //   };
  //   const signer = await ethers.getSigner(process.env.EBOOK_ADMIN_ADDRESS!!);

  //   const provider = signer.provider;
  //   const wallet = new Wallet(process.env.EBOOK_DEPLOYER_PK as string, provider);
  //   const signedTx = await wallet.signTransaction(replacementTx);
  //   const txHash = await provider?.sendTransaction(signedTx);
  //   console.log(txHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
