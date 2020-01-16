import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UsersModule } from '../users/users.module'
import { jwtConstants } from './constant'
import { AuthService } from './services/auth.service'
import { JwtStrategy } from './services/jwt.strategy'
import { LocalStrategy } from './services/local.strategy'
import { AuthController } from './controller/auth.controller'

@Module({
    imports: [UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' }
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
