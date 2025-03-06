import { ethers } from 'ethers';
import { abiPathToIface } from 'src/tx-producer/producer/utils/tx-helper';

export const ebookNftCollectionIface: ethers.Interface = abiPathToIface(
  `src/tx-producer/abis/ebook/EbookNFTCollection.sol/EbookNFTCollection.json`,
);

export const ebookMarketIface: ethers.Interface = abiPathToIface(
  `src/tx-producer/abis/ebook/EbookMarket.sol/EbookMarket.json`,
);
