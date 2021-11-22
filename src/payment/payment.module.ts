import {Module} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [PaymentService],
  exports:[PaymentService],
  imports:[AuthModule ],
  controllers: [PaymentController]
})
export class PaymentModule {}
