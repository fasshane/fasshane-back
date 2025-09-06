import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ProductModule } from './modules/product/product.module';
import { MealModule } from './modules/meal/meal.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [AuthModule, UserModule, SupplierModule, ProductModule, MealModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
