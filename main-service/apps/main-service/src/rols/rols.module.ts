import { Module } from '@nestjs/common';
import { RolsService } from './rols.service';
import { RolsController } from './rols.controller';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'apps/auth-service/src/auth/constants/jwt.constant';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      { name: 'MAIL_SERVICE', transport: Transport.TCP },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [RolsController],
  providers: [RolsService],
})
export class RolsModule {}
