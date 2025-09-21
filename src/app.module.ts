import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ProductModule } from './modules/product/product.module';
import { MealModule } from './modules/meal/meal.module';
import { MailModule } from './shared';
import { S3Module } from './s3/s3.module';
import { OrderModule } from './modules/order/order.module';
import { FeedbackModule } from './modules/feedback';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SupplierModule,
    ProductModule,
    MealModule,
    MailModule,
    S3Module,
    OrderModule,
    FeedbackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
