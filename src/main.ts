import * as dotenv from 'dotenv';
dotenv.config();
import * as mongoose from 'mongoose';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(9000);
}
bootstrap();
