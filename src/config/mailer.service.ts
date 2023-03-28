import { ConfigService } from '@nestjs/config';
import path from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export const MailerOptions = async (configService: ConfigService) => {
  return {
    transport: {
      service: 'Gmail',
      host: configService.get<string>('EMAIL_HOST'),
      port: configService.get<string>('EMAIL_PORT'),
      secure: true,
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
