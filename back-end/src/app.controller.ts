import { AppService } from './app.service';
import { Controller, Post, Body, Logger } from '@nestjs/common';
import { EmailDTO } from './dto/send.dto';

@Controller('api')
export class AppController {
  constructor(private appService: AppService) {}

  @Post('email')
  async submitForm(@Body() formData: EmailDTO) {
    return this.appService.submitForm(formData);
  }
}
