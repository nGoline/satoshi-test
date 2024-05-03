import { registerAs } from '@nestjs/config';
import { Params as PinoOptions } from 'nestjs-pino';

export default registerAs<PinoOptions>('pino', () => {
  let transport;
  const isDevelopment = process.env.ENVIRONMENT === 'development';

  if (isDevelopment) {
    transport = {
      target: 'pino-pretty',
      options: {
        singleLine: true,
      },
    };
  }

  return {
    pinoHttp: {
      customProps: () => ({
        context: 'HTTP',
      }),
      transport,
    },
  };
});
