import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './AppController'
import { AppService } from './AppService'
import { CommonGroundAPIModule } from './CommonGroundAPI/CommonGroundAPIModule'
import { PersonModule } from './Person/PersonModule'
import { ProgramModule } from './Program/ProgramModule'
import { UserModule } from './User/UserModule'

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        PersonModule,
        ProgramModule,
        UserModule,
        CommonGroundAPIModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
