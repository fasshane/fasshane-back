import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class BasketRepository {
    constructor(private prisma: PrismaService) {
    }
    async getCustomerBasket(customerId: string) {
        let basket = await this.prisma.basket.findUnique({
            where: { customerId },
            include: { items: { include: { product: true } } },
        });

        if (!basket) {
            basket = await this.prisma.basket.create({
                data: { customerId },
                include: { items: { include: { product: true } } },
            });
        }

        return basket;
    }

    async addItemToBasket(customerId: string, productId: string, quantity = 1) {
        const basket = await this.getCustomerBasket(customerId);

        const existingItem = await this.prisma.basketItem.findUnique({
            where: {
                basketId_productId: {
                    basketId: basket.id,
                    productId,
                },
            },
        });

        if (existingItem) {
            return this.prisma.basketItem.update({
                where: {
                    basketId_productId: {
                        basketId: basket.id,
                        productId,
                    },
                },
                data: {
                    quantity: { increment: quantity },
                },
            });
        }

        return this.prisma.basketItem.create({
            data: {
                basketId: basket.id,
                productId,
                quantity,
            },
        });
    }

    async updateItemQuantity(customerId: string, productId: string, quantity: number) {
        const basket = await this.getCustomerBasket(customerId);

        return this.prisma.basketItem.update({
            where: {
                basketId_productId: {
                    basketId: basket.id,
                    productId,
                },
            },
            data: { quantity },
        });
    }

    async removeItemFromBasket(customerId: string, productId: string) {
        const basket = await this.getCustomerBasket(customerId);

        return this.prisma.basketItem.delete({
            where: {
                basketId_productId: {
                    basketId: basket.id,
                    productId,
                },
            },
        });
    }

    async clearBasket(customerId: string) {
        const basket = await this.getCustomerBasket(customerId);
        return this.prisma.basketItem.deleteMany({
            where: { basketId: basket.id },
        });
    }
}