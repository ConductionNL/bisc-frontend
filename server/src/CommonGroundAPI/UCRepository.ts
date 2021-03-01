import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLClient } from 'graphql-request'
import { BaseRepository } from 'src/BaseRepository'
import { Config } from 'src/config'
import { getSdk, Sdk as UCSdk } from 'src/generated/uc-graphql'

@Injectable()
export class UCRepository extends BaseRepository {
    protected sdk: UCSdk

    public constructor(private configService: ConfigService<Config>) {
        super()

        const client = new GraphQLClient('https://taalhuizen-bisc.commonground.nu/api/v1/uc/graphql', {
            headers: {
                authorization: this.configService.get('API_KEY') || '',
            },
        })
        this.sdk = getSdk(client)
    }

    public makeURLfromID(id: string) {
        // TODO: Update object URI's to include the component name
        // return `https://taalhuizen-bisc.commonground.nu/api/v1/uc${id[0] === '/' ? '' : '/'}${id}`
        return `https://taalhuizen-bisc.commonground.nu${id[0] === '/' ? '' : '/'}${id}`
    }
}
