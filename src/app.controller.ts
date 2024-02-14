import { Controller, Get } from '@nestjs/common';
import { EmailService } from './common/communications/emails/email.service';

@Controller()
export class AppController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  getHello() {
    return this.emailService.renderVercelInviteUser();
  }
}
