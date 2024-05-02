import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs<PostgresConnectionOptions>('database', () => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  migrations: ['dist/src/database/**/*-migrations.{ts,js}'],
  autoLoadEntities: true,
  migrationsRun: true,
  logging: process.env.DATABASE_LOGGING === 'true',
}));
