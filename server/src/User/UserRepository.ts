import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'
import { CommonGroundAPIService } from 'src/CommonGroundAPI/CommonGroundAPIService'

@Injectable()
export class UserRepository {
    private client: ApolloClient<NormalizedCacheObject>

    public constructor(private commonGroundAPIService: CommonGroundAPIService) {
        this.client = this.commonGroundAPIService.createAPIClient(
            'https://taalhuizen-bisc.commonground.nu/api/v1/uc/graphql'
        )
    }
    public async findUsersByUsername(username: string) {
        // TODO: Try codegen
        const query = gql`
            {
                users(username: String) {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
        `

        const result = await this.client.query({ query, variables: { username } })

        return result.data.users.edges
    }
}
