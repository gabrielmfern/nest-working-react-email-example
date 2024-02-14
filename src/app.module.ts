import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmailService } from './common/communications/emails/email.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [EmailService],
})
export class AppModule {}
