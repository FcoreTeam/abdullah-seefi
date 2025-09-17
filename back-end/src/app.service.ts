import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { EmailDTO } from './dto/send.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private mailService: MailerService) {}

  async submitForm(formData: EmailDTO) {
    this.logger.log('Received form data:', JSON.stringify(formData, null, 2));

    // Отправка письма
    await this.mailService.sendMail({
      to: 'mylabperfume@gmail.com',
      subject: `Новая заявка от ${formData.name}`,
      html: `
        <h1>От Fcore</h1>
        <p>Имя: ${formData.name}</p>
        <p>Почта: ${formData.email}</p>
        <p>Сообщение: ${formData.message}</p>
      `,
    });

    return { message: 'Форма успешно отправлена!' };
  }
}
