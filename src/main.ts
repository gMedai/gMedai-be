import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { AppModule, setupTermination } from './modules/app';
import { initialize } from './utils/helper';

const { PORT } = process.env;

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /*
   * Use service containers to inject dependencies into your custom validator constraint classes
   * Reference: https://stackoverflow.com/questions/60062318/how-to-inject-service-to-validator-constraint-interface-in-nestjs-using-class-va
   */
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  initialize(app);

  // By default, Fastify only listens localhost, so we should to specify '0.0.0.0'
  app.listen(PORT || 8402, '0.0.0.0');

  setupTermination({ app, signals: ['SIGTERM', 'SIGINT'] });
};

bootstrap();
