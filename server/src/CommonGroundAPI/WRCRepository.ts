import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLClient } from 'graphql-request'
import { BaseRepository } from 'src/BaseRepository'
import { Config } from 'src/config'
import { getSdk, Sdk as WRCSdk } from 'src/generated/wrc-graphql'

@Injectable()
export class WRCRepository extends BaseRepository {
    protected sdk: WRCSdk

    public constructor(private configService: ConfigService<Config>) {
        super()

        const client = new GraphQLClient('https://taalhuizen-bisc.commonground.nu/api/v1/wrc/graphql', {
            headers: {
                authorization: this.configService.get('API_KEY') || '',
            },
        })
        this.sdk = getSdk(client)
    }

    public makeURLfromID(id: string) {
        return `https://taalhuizen-bisc.commonground.nu/api/v1/wrc${id[0] === '/' ? '' : '/'}${id}`
    }
}
