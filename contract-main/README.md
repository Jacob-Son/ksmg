# 배포순서

1. Ebook Core 배포 (env에 설정)

- testnet: npx hardhat run scripts/deploy/core.ts --network mumbai
- mainnet: npx hardhat run scripts/deploy/core.ts --network polygon

2. factory 배포 (env에 설정)

- testnet: npx hardhat run scripts/deploy/factory.ts --network mumbai
- mainnet: npx hardhat run scripts/deploy/factory.ts --network polygon

3. collection implement source code 배포 - upgradeable로 배포x (env에 설정)

- testnet: npx hardhat run scripts/deploy/collectionImplement.ts --network mumbai
- mainnet: npx hardhat run scripts/deploy/collectionImplement.ts --network polygon

4. market 배포 (env에 설정) - 현재는 사용 x

- testnet: npx hardhat run scripts/deploy/market.ts --network mumbai
- mainnet: npx hardhat run scripts/deploy/market.ts --network polygon

5. relayer 설정

- testnet: npx hardhat run scripts/setting/addRelayer.ts --network mumbai
- mainnet: npx hardhat run scripts/setting/addRelayer.ts --network polygon

6. factory contract에 collection implement 설정

- testnet: npx hardhat run scripts/setting/setImplement.ts --network mumbai
- mainnet: npx hardhat run scripts/setting/setImplement.ts --network polygon

7. create collection으로 nft collection 배포(새롭게 배포할때는 스크립트 파일에 salt 변경)

- testnet: npx hardhat run scripts/deploy/nftCollection.ts --network mumbai
- mainnet: npx hardhat run scripts/deploy/nftCollection.ts --network polygon

# 주소

## testnet(mumbai)

- EBOOK_CORE_ADDRESS="0xaDB9E6E8a41E8a3F470E148fd502d82BE34a8085"
- EBOOK_FACTORY_ADDRESS="0xEf0F8aF84b9eBbD0A52BF9e3d718339e2dab4355"
- EBOOK_MARKET_ADDRESS="0x492Ff91c4dc20eb5C3bA05662ba7995f7880F314"
- EBOOK_NFT_COLLECTION_ADDRESS="0xF1EFa9a4d39FF029f719b3DBdeDeC9b7146aDeBe"
- EBOOK_ADMIN_ADDRESS="0x1beCbcC8eefC20b7bBdc099B87d82E2230e72705"

- ebook source code address(실제로 쓰이지는 x): "0xc87aE6E84b8E59cC26453C216504c0BF304AC79f"

## mainnet(polygon) - 목월

- EBOOK_CORE_ADDRESS="0x3D28213b93fe897C4195524247BC01c309528e29"
- EBOOK_FACTORY_ADDRESS="0x324F0acFd7Aee1C6fcAB20bbA8B19dCD991a3909"
- EBOOK_NFT_COLLECTION_ADDRESS="0x41b8Fdad1D7849162dcC2eF093bB62C9729F6f17"
- EBOOK_ADMIN_ADDRESS="0x7D01F4A0f5a8c6dcA701284f4834450EEE31aB6f"

- ebook source code address(실제로 쓰이지는 x): "0x69ecE8302FF61c548EBA9571F4447bE7C1eB9F47"

## mainnet(polygon) - 파세듀

- EBOOK_CORE_ADDRESS="0xb84b4E89B6f35485350C49f160450F7C6De9e941"
- EBOOK_FACTORY_ADDRESS="0xB76131b6a5148CfDf59A13E9519f8Ee6D4b2FE35"
- EBOOK_NFT_COLLECTION_ADDRESS="0x3495f08Fd48b0A1995CaB4B3AcE14Dd9fb87C4c0"
- EBOOK_ADMIN_ADDRESS="0xd0b4411290Ec65332B02c55A6B640072b0934650"

- ebook source code address(실제로 쓰이지는 x): "0x1011248C8Cf1F366E5Cad1ecCfA58Fb07CAef2f4"

# Ebook Contract

## Ebook Core

: relayer, admin 등 role을 관리하는 컨트렉트

## Ebook Contract

: ebook core를 storage로 가지고 있는 abstract contract이며 아래 4가지 컨트렉트는 이 컨트렉트를 상속하여 relayer, admin을 체크하여 함수를 실행한다.

## Ebook Collection Factory

: nft collection을 만들 수 있는 컨트렉트

## Ebook NFT Collection

: collectoin factory에서 배포할때 쓰이는 source collection

## Ebook Market

: collection을 거래하고 기록하고, 로얄티를 관리하는 contract

## Ebook Merge(미정)

: ebook merge와 관련된 컨트렉트
