import { Injectable } from '@nestjs/common';
import { CustomerOrderStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FPGrowthRepository {
  constructor(private prisma: PrismaService) { }
  async loadTransactions(opts?: { since?: Date }): Promise<string[][]> {
    const where: any = { status: CustomerOrderStatus.SUCCESS };
    if (opts?.since) where.createAt = { gte: opts.since };

    const orders = await this.prisma.customerOrder.findMany({
      where,
      select: {
        id: true,
        items: {
          select: {
            meal: { select: { name: true } },
          },
        },
      },
    });

    return orders
      .map(o => {
        // normalize names; dedupe per order
        const set = new Set(
          o.items
            .map(i => i.meal?.name?.trim().toLowerCase())
            .filter(Boolean) as string[]
        );
        return Array.from(set.values());
      })
      .filter(trx => trx.length > 0);
  }
}
