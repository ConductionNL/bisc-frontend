import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'
import { CommonGroundAPIService } from 'src/CommonGroundAPI/CommonGroundAPIService'
import { UserEdge, UserEntity } from './entities/UserEntity'

@Injectable()
export class UserRepository {
    private client: ApolloClient<NormalizedCacheObject>

    public constructor(private commonGroundAPIService: CommonGroundAPIService) {
        this.client = this.commonGroundAPIService.createAPIClient(
            'https://taalhuizen-bisc.commonground.nu/api/v1/uc/graphql'
        )
    }

    public async findUserByUsername(username: string): Promise<UserEntity> {
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

        const userEdges: UserEdge[] = result.data.users.edges

        if (userEdges.length === 0) {
            return null
        }

        if (userEdges.length > 1) {
            const error = `Found multiple users with username '${username}', but expected only 1`
            throw new Error(error)
        }

        const user = userEdges.pop().node

        return user
    }

    public async updateUserPassword(
        userId: string,
        newPasswordHash: string
    ): Promise<Pick<UserEntity, 'id' | 'username'>> {
        // TODO: Try codegen
        const mutation = gql`
            mutation updateUser($input: updateUserInput!) {
                updateUser(input: $input) {
                    user {
                        id
                        username
                    }
                }
            }
        `

        const result = await this.client.mutate({
            mutation,
            variables: { input: { id: userId, password: newPasswordHash } },
        })

        return result.data.updateUser.user
    }
}
