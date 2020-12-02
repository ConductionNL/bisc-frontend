import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'
import { CommonGroundAPIService } from 'src/CommonGroundAPI/CommonGroundAPIService'

@Injectable()
export class PersonRepository {
    private client: ApolloClient<NormalizedCacheObject>

    public constructor(private commonGroundAPIService: CommonGroundAPIService) {
        this.client = this.commonGroundAPIService.createAPIClient(
            'https://taalhuizen-bisc.commonground.nu/api/v1/cc/graphql'
        )
    }
    public async findPersons() {
        // TODO: Try codegen
        const query = gql(`
        {
            people {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }          
        `)

        const result = await this.client.query({ query })

        return result.data.people.edges
    }
}
