import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLClient } from 'graphql-request'
import { Config } from 'src/config'
import { getSdk, Sdk } from 'src/generated/cc-graphql'

@Injectable()
export class PersonRepository {
    private sdk: Sdk

    public constructor(private configService: ConfigService<Config>) {
        const client = new GraphQLClient('https://taalhuizen-bisc.commonground.nu/api/v1/cc/graphql', {
            headers: {
                authorization: this.configService.get('API_KEY') || '',
            },
        })
        this.sdk = getSdk(client)
    }
    public async findPersons() {
        const result = await this.sdk.persons()

        return result?.people?.edges
    }
}
