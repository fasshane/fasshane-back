import { Injectable, NotFoundException } from "@nestjs/common";
import { CustomerOrder, CustomerOrderStatus } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { OrderUpdateDto } from "./dto/request/order-update.dto";
import { OrderCreateDto, OrderItemDto } from "./dto/request/order-create.dto";

@Injectable()
export class OrderRepository {
    constructor(private prisma: PrismaService) {
    }

    async createOrder(customerId: string): Promise<CustomerOrder> {
        return this.prisma.customerOrder.create({
            data: {
                customer: { connect: { id: customerId } },
                status: CustomerOrderStatus.INITIAL,
                totalPrice: 0,
            },
        });
    }

    async createOrderByCashier(customerId: string, dto: OrderCreateDto): Promise<CustomerOrder> {
        const order = await this.prisma.customerOrder.create({
            data: {
                customerId,
                totalPrice: dto.totalPrice,
                status: CustomerOrderStatus.INITIAL,
                items: {
                    create: dto.items.map((item: OrderItemDto) => ({
                        quantity: item.quantity,
                        price: item.price,
                        mealId: item.meal.id,
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        meal: true,
                    },
                },
            },
        });

        return order;
    }

    async addItemToOrder(orderId: string, mealId: string, quantity = 1) {
        const mealPrice = await this.getMealPrice(mealId);

        const customerOrderItem = await this.prisma.customerOrderItem.create({
            data: {
                order: { connect: { id: orderId } },
                meal: { connect: { id: mealId } },
                quantity,
                price: mealPrice,
            },
        });

        await this.recalculateOrderTotal(orderId);

        return customerOrderItem;

    }

    async getUserOrders(customerId: string): Promise<CustomerOrder[]> {

        const customerOrders = await this.prisma.customerOrder.findMany({
            where: {
                customerId
            },
            include: {
                items: { include: { meal: true } },
            }
        });

        return customerOrders;

    }

    //TODO: replace with real method
    private async getMealPrice(mealId: string): Promise<number> {
        const dummyPrice = 10;
        return dummyPrice;
    }

    private async recalculateOrderTotal(orderId: string): Promise<void> {
        const orderItems = await this.prisma.customerOrderItem.findMany({
            where: { orderId },
        });

        const total = orderItems.reduce(
            (sum, item) => sum + item.price.toNumber() * item.quantity,
            0,
        );

        await this.prisma.customerOrder.update({
            where: { id: orderId },
            data: { totalPrice: total },
        });
    }

    async getInitialOrderByUserId(userId: string): Promise<CustomerOrder> {
        return this.prisma.customerOrder.findFirst({
            where: {
                customerId: userId,
                status: 'INITIAL',
            },
            include: {
                items: { include: { meal: true } },
            },
        });
    }

    async updateItemQuantity(orderId: string, mealId: string, quantity: number, price: number) {
        await this.prisma.customerOrderItem.upsert({
            where: {
                orderId_mealId: {
                    orderId,
                    mealId,
                },
            },
            update: {
                quantity,
            },
            create: {
                orderId,
                mealId,
                quantity,
                price: price,
            },
        });
    }

    async updateOrder(dto: OrderUpdateDto) {
        const { orderId, items } = dto;

        const order = await this.prisma.customerOrder.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        for (const item of items) {
            if (item.action === 'update' && item.itemId) {
                await this.prisma.customerOrderItem.update({
                    where: { id: item.itemId },
                    data: { quantity: item.quantity },
                });
            }

            if (item.action === 'delete' && item.itemId) {
                await this.prisma.customerOrderItem.delete({
                    where: { id: item.itemId },
                });
            }

            if (item.action === 'add' && item.mealId) {
                // Check if item already exists to prevent duplicates
                const existing = await this.prisma.customerOrderItem.findFirst({
                    where: {
                        orderId,
                        mealId: item.mealId,
                    },
                });

                if (existing) {
                    // If exists, just update quantity
                    await this.prisma.customerOrderItem.update({
                        where: { id: existing.id },
                        data: { quantity: existing.quantity + item.quantity },
                    });
                } else {
                    const meal = await this.prisma.meal.findUnique({
                        where: { id: item.mealId },
                        include: { ingredients: true },
                    });

                    if (!meal) throw new NotFoundException('Meal not found');

                    const pricePerMeal = await this.calculateMealPrice(meal.id);

                    await this.prisma.customerOrderItem.create({
                        data: {
                            orderId,
                            mealId: item.mealId,
                            quantity: item.quantity,
                            price: pricePerMeal,
                        },
                    });
                }
            }
        }

        return { message: 'Order updated successfully' };
    }

    async payOrder(orderId: string) {
        // return await this.prisma.customerOrder.update({
        //     where: { id: orderId },
        //     data: { status: CustomerOrderStatus.SUCCESS },
        // });
        try {
            return await this.prisma.customerOrder.update({
                where: { id: orderId },
                data: { status: CustomerOrderStatus.SUCCESS },
            });
        } catch (error) {
            console.error("Error updating order status:", error);
            throw new Error("Could not update order status");
        }
    }

    private async calculateMealPrice(mealId: string): Promise<number> {
        const ingredients = await this.prisma.ingredient.findMany({
            where: { mealId },
            include: {
                product: {
                    include: {
                        supplierProducts: true,
                    },
                },
            },
        });

        let total = 0;
        for (const ing of ingredients) {
            const supplierProduct = ing.product.supplierProducts[0];
            if (supplierProduct) {
                total += Number(supplierProduct.priceForOne) * Number(ing.quantity);
            }
        }

        return total;
    }

    // async removeItemFromOrder(customerId: string, productId: string) {
    //     const order = await this.getCustomerOrder(customerId);

    //     return this.prisma.customerOrder.delete({
    //         where: {
    //             orderId_productId: {
    //                 orderId: order.id,
    //                 productId,
    //             },
    //         },
    //     });
    // }

    // async clearOrder(customerId: string) {
    //     const order = await this.getCustomerOrder(customerId);
    //     return this.prisma.customerOrder.deleteMany({
    //         where: { orderId: order.id },
    //     });
    // }
}