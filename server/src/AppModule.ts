import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './AppController'
import { AppService } from './AppService'
import { PersonModule } from './Person/PersonModule'

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        PersonModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
