import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule } from '@nestjs/jwt'
import { AppController } from './AppController'
import { AppService } from './AppService'
import { CommonGroundAPIModule } from './CommonGroundAPI/CommonGroundAPIModule'
import { Config } from './config'
import { PersonModule } from './Person/PersonModule'
import { ProgramModule } from './Program/ProgramModule'
import { UserModule } from './User/UserModule'

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            // Custom context required for JwtModule/JwtAuthGuard to work
            // see https://github.com/nestjs/graphql/issues/48#issuecomment-420693225
            context: ({ req }) => {
                return {
                    request: req,
                }
            },
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        {
            // Hack to make JwtService available in global scope, to allow usage of JwtAuthGuard in all modules
            // without having to import JwtModule.registerAsync(...) in every module separately.
            // Idea from https://github.com/nestjs/jwt/issues/103#issuecomment-598118584
            ...JwtModule.registerAsync({
                inject: [ConfigService],
                useFactory: (configService: ConfigService<Config>) => {
                    return {
                        signOptions: {
                            expiresIn: '1m',
                        },
                        secret: configService.get('API_KEY'),
                    }
                },
            }),
            global: true,
        },
        PersonModule,
        ProgramModule,
        UserModule,
        CommonGroundAPIModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
