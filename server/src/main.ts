import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './AppModule'
import { Config } from './Config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const configService = app.get<ConfigService<Config>>(ConfigService)

    await app.listen(parseInt(configService.get('APP_PORT', '5000'), 10))
}

bootstrap()
