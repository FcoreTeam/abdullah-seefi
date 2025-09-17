import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mail.ru',
        port: 465,
        auth: {
          user: 'fcoreteam@mail.ru',
          pass: 'RMUvcsacSBUevlp8Cm3X',
        },
      },
      defaults: {
        from: `"Заявка" <${'fcoreteam@mail.ru'}>`,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MailerModule],
})
export class AppModule {}
