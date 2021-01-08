import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'
import { CommonGroundAPIService } from 'src/CommonGroundAPI/CommonGroundAPIService'
import { UserEdge } from './entities/UserEntity'

@Injectable()
export class UserRepository {
    private client: ApolloClient<NormalizedCacheObject>

    public constructor(private commonGroundAPIService: CommonGroundAPIService) {
        this.client = this.commonGroundAPIService.createAPIClient(
            'https://taalhuizen-bisc.commonground.nu/api/v1/uc/graphql'
        )
    }

    public async findUsersByUsername(username: string): Promise<UserEdge[]> {
        // TODO: Try codegen
        const query = gql`
            query users($username: String) {
                users(username: $username) {
                    edges {
                        node {
                            id
                            username
                            dateCreated
                            dateModified
                        }
                    }
                }
            }
        `

        const result = await this.client.query({ query, variables: { username } })

        return result.data.users.edges
    }

    // public async findOneByEmail(email: string) {
    //     // TODO: Try codegen
    //     const query = gql`
    //         {
    //             users(username: String) {
    //                 edges {
    //                     node {
    //                         id
    //                         name
    //                     }
    //                 }
    //             }
    //         }
    //     `

    //     const result = await this.client.query({ query, variables: { username } })

    //     return result.data.users.edges
    // }
}
