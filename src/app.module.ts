import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './api/auth/auth.module';
import { CommonModule } from './common/common.module';
import { FormsModule } from './api/forms/forms.module';
import { RequestsModule } from './api/requests/requests.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST, // 도커 사용시 도커에 정의된 이름을 사용해야함.
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    PassportModule,
    UsersModule,
    AuthModule,
    CommonModule,
    FormsModule,
    RequestsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
