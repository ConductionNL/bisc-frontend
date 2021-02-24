import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLClient } from 'graphql-request'
import { BaseRepository } from 'src/BaseRepository'
import { Config } from 'src/config'
import { getSdk, Sdk as CCSdk } from 'src/generated/cc-graphql'

@Injectable()
export class CCRepository extends BaseRepository {
    protected sdk: CCSdk

    public constructor(private configService: ConfigService<Config>) {
        super()

        const client = new GraphQLClient('https://taalhuizen-bisc.commonground.nu/api/v1/cc/graphql', {
            headers: {
                authorization: this.configService.get('API_KEY') || '',
            },
        })
        this.sdk = getSdk(client)
    }
}
