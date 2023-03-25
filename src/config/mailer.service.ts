import { ConfigService } from '@nestjs/config';
import path from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export const MailerOptions = async (configService: ConfigService) => {
  return {
    transport: {
      service: 'Naver',
      host: 'smtp.naver.com',
      port: 465,
      auth: {
        user: configService.get<string>('EMAIL_AUTH_EMAIL'), // generated ethereal user
        pass: configService.get<string>('EMAIL_AUTH_PASSWORD'), // generated ethereal password
      },
    },

    template: {
      dir: path.join(__dirname, '/templates/'),
      adapter: new EjsAdapter(),
      options: {
        strict: true,
      },
    },
  };
};
