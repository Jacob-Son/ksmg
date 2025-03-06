// prisma/seed.ts

import {
  PrismaClient,
  TxStatus,
  ServiceType,
  FunctionType,
} from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create new users
  const user1KeyStore = await prisma.userKeyStore.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      shareB1: 'abc',
      shareB2: 'abc',
    },
  });
  const user2KeyStore = await prisma.userKeyStore.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      shareB1: 'abc',
      shareB2: 'abc',
    },
  });
  const user1 = await prisma.user.upsert({
    where: {
      email_provider: {
        email: 'junha@gmail.com',
        provider: 'google',
      },
    },
    update: {},
    create: {
      uid: '79c023fd-156d-4df4-b2c5-9b41b3c4c3af',
      userKeyStoreId: user1KeyStore.id,
      email: 'junha@gmail.com',
      name: 'Junha',
      provider: 'google',
      walletAddress: '0x25BA43364BF720d8dFe3c2680CB4C232a29B093C',
    },
  });
  const user2 = await prisma.user.upsert({
    where: {
      email_provider: {
        email: 'david@gmail.com',
        provider: 'google',
      },
    },
    update: {},
    create: {
      uid: 'd58ad12f-241f-4dd4-bbfd-cee57f8cbf06',
      userKeyStoreId: user2KeyStore.id,
      email: 'david@gmail.com',
      name: 'David',
      provider: 'kakao',
      walletAddress: '0xCECe2C967bD267ae3C3C58094C50507E6a22E578',
    },
  });
  console.log({ user1, user2 });

  // create relayers
  const relayer = await prisma.relayer.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      walletAddress: '0x25BA43364BF720d8dFe3c2680CB4C232a29B093C',
    },
  });
  console.log({ relayer });

  // create tx records
  const userTxRecord1 = await prisma.userTxRecord.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      status: TxStatus.PENDING,
      serviceType: ServiceType.EBOOK,
      functionType: FunctionType.BUY,
      buyerAddress: user1.walletAddress,
      sellerAddress: user2.walletAddress,
      tokenId: 1,
      price: 120000,
      royalty: 12,
      orderType: 1,
      relayerId: 1,
      txHash:
        '0x58688d5bdd92fc90ae53fd938d34c9cd91b1618f2adb5c962795556568d3c336',
      data: Buffer.from('abc'),
      blockNumber: 100,
    },
  });

  console.log({ userTxRecord1 });

  const adminTxRecord1 = await prisma.adminTxRecord.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      status: TxStatus.PENDING,
      serviceType: ServiceType.EBOOK,
      functionType: FunctionType.BUY,
      fromAddress: user1.walletAddress,
      toAddress: user2.walletAddress,
      tokenId: 1,
      relayerId: 1,
      txHash:
        '0x58688d5bdd92fc90ae53fd938d34c9cd91b1618f2adb5c962795556568d3c336',
      data: Buffer.from('abc'),
      blockNumber: 100,
    },
  });

  console.log({ adminTxRecord1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
