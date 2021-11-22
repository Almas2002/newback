import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {RoleModule} from './role/role.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {config} from "./ormconfig";
import {AuthModule} from './auth/auth.module';
import {MailerModule} from './mailer/mailer.module';
import {CategoryModule} from './category/category.module';
import {ProductModule} from './product/product.module';
import {TagModule} from './tag/tag.module';
import {ShopModule} from './shop/shop.module';
import {SpecModule} from './spec/spec.module';
import {PaymentModule} from './payment/payment.module';
import {DeliveryModule} from './delivery/delivery.module';
import {OrderModule} from './order/order.module';
import {ConfigModule} from "@nestjs/config";
import {AuthMiddleware} from "./user/middlewares/auth.middleware";
import {FileModule} from './file/file.module';
import {FeedbackModule} from './feedback/feedback.module';
import {ChatModule} from './chat/chat.module';

@Module({
    imports: [UserModule, RoleModule, TypeOrmModule.forRoot(config), ConfigModule.forRoot({
        envFilePath: '.env'
    }),
        AuthModule, MailerModule, CategoryModule, ProductModule,
        TagModule, ShopModule, SpecModule, PaymentModule,
        DeliveryModule, OrderModule, FileModule, FeedbackModule, ChatModule],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL
        })
    }
}
