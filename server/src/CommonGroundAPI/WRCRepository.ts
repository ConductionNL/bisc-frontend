import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLClient } from 'graphql-request'
import { Config } from 'src/config'
import { getSdk, Sdk as WRCSdk } from 'src/generated/wrc-graphql'

@Injectable()
export class WRCRepository {
    protected sdk: WRCSdk

    public constructor(private configService: ConfigService<Config>) {
        const client = new GraphQLClient('https://taalhuizen-bisc.commonground.nu/api/v1/wrc/graphql', {
            headers: {
                authorization: this.configService.get('API_KEY') || '',
            },
        })
        this.sdk = getSdk(client)
    }
}
