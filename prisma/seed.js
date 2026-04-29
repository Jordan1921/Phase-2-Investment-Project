import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
  const adminPassword = await bcrypt.hash('Admin123!', SALT_ROUNDS);
  const userPassword = await bcrypt.hash('User123!', SALT_ROUNDS);

  const admin = await prisma.user.upsert({
    where: { email: 'stkadmin@email.com' },
    update: {
      password: adminPassword,
      role: 'admin'
    },
    create: {
      email: 'stkadmin@email.com',
      password: adminPassword,
      role: 'admin'
    }
  });

  const user = await prisma.user.upsert({
    where: { email: 'stkuser@email.com' },
    update: {
      password: userPassword,
      role: 'user'
    },
    create: {
      email: 'stkuser@email.com',
      password: userPassword,
      role: 'user'
    }
  });

  const assets = await Promise.all([
    prisma.asset.upsert({
      where: { symbol: 'AAPL' },
      update: {
        name: 'Apple Inc.',
        type: 'stock',
        price: 169.3
      },
      create: {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        type: 'stock',
        price: 169.3
      }
    }),
    prisma.asset.upsert({
      where: { symbol: 'TSLA' },
      update: {
        name: 'Tesla Inc.',
        type: 'stock',
        price: 178.2
      },
      create: {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        type: 'stock',
        price: 178.2
      }
    }),
    prisma.asset.upsert({
      where: { symbol: 'BTC' },
      update: {
        name: 'Bitcoin',
        type: 'crypto',
        price: 64500
      },
      create: {
        symbol: 'BTC',
        name: 'Bitcoin',
        type: 'crypto',
        price: 64500
      }
    }),
    prisma.asset.upsert({
      where: { symbol: 'ETH' },
      update: {
        name: 'Ethereum',
        type: 'crypto',
        price: 3200
      },
      create: {
        symbol: 'ETH',
        name: 'Ethereum',
        type: 'crypto',
        price: 3200
      }
    })
  ]);

  await prisma.portfolio.deleteMany({
    where: {
      userId: {
        in: [admin.id, user.id]
      }
    }
  });

  await prisma.alert.deleteMany({
    where: {
      userId: {
        in: [admin.id, user.id]
      }
    }
  });

  await prisma.portfolio.createMany({
    data: [
      {
        userId: user.id,
        assetId: assets[0].id,
        quantity: 10,
        buyPrice: 150
      },
      {
        userId: user.id,
        assetId: assets[2].id,
        quantity: 0.25,
        buyPrice: 60000
      },
      {
        userId: admin.id,
        assetId: assets[1].id,
        quantity: 5,
        buyPrice: 175
      }
    ]
  });

  await prisma.alert.createMany({
    data: [
      {
        userId: user.id,
        assetId: assets[0].id,
        targetPrice: 180,
        condition: 'above',
        isActive: true
      },
      {
        userId: user.id,
        assetId: assets[2].id,
        targetPrice: 58000,
        condition: 'below',
        isActive: true
      },
      {
        userId: admin.id,
        assetId: assets[1].id,
        targetPrice: 200,
        condition: 'above',
        isActive: false
      }
    ]
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
