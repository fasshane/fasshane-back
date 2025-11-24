import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.error('Usage: ts-node scripts/delete-user-by-email.ts <email>');
    process.exit(1);
  }

  console.log(`🔍 Looking for user with email: ${email}`);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log('❌ User not found');
    return;
  }

  console.log(`✅ Found user: ${user.id} (${user.email})`);
  console.log('⛔ Deleting user and related data in a transaction...');

  await prisma.$transaction(async (tx) => {
    // 1. PasswordResetCode – немає onDelete: Cascade, тому чистимо руками
    const resetCodes = await tx.passwordResetCode.deleteMany({
      where: { userId: user.id },
    });
    console.log(`🧹 Deleted ${resetCodes.count} PasswordResetCode records`);

    // 2. MFA-коди
    const mfaCodes = await tx.mfaCode.deleteMany({
      where: { userId: user.id },
    });
    console.log(`🧹 Deleted ${mfaCodes.count} MfaCode records`);

    // 3. Токен активації email
    const activationTokens = await tx.emailActivationToken.deleteMany({
      where: { userId: user.id },
    });
    console.log(
      `🧹 Deleted ${activationTokens.count} EmailActivationToken records`,
    );

    // 4. Ролі (теоретично onDelete: Cascade вже покриє, але безпечно почистити явно)
    const admin = await tx.admin.deleteMany({
      where: { userId: user.id },
    });
    console.log(`🧹 Deleted ${admin.count} Admin records`);

    const manager = await tx.manager.deleteMany({
      where: { userId: user.id },
    });
    console.log(`🧹 Deleted ${manager.count} Manager records`);

    const cashier = await tx.cashier.deleteMany({
      where: { userId: user.id },
    });
    console.log(`🧹 Deleted ${cashier.count} Cashier records`);

    const customer = await tx.customer.deleteMany({
      where: { userId: user.id },
    });
    console.log(`🧹 Deleted ${customer.count} Customer records`);

    //    CustomerOrder має onDelete: SetNull для customerId, тому FK не зламається.

    // 6. Нарешті видаляємо самого юзера
    await tx.user.delete({
      where: { id: user.id },
    });

    console.log(`✅ User ${user.id} deleted`);
  });

  console.log('🎉 Done');
}

main()
  .catch((e) => {
    console.error('Unexpected error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
