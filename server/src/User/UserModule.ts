import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { AuthResolver } from './AuthResolver'
import { AuthService } from './AuthService'
import { JwtStrategy } from './strategies/JwtStrategy'
import { UserRepository } from './UserRepository'

@Module({
    providers: [UserRepository, AuthResolver, AuthService, JwtStrategy],
    exports: [UserRepository, AuthService],
    imports: [
        CommonGroundAPIModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    signOptions: {
                        expiresIn: '10m',
                    },
                    secret: configService.get('API_KEY'),
                }
            },
        }),
    ],
})
export class UserModule {}
