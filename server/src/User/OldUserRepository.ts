import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'
import { CommonGroundAPIService } from 'src/CommonGroundAPI/CommonGroundAPIService'
import { UserEdge, UserEntity } from './entities/UserEntity'

// TODO: Replace this with a new repo that extends UCRepository + move file to src/CommonGroundAPI/uc
@Injectable()
export class OldUserRepository {
    private client: ApolloClient<NormalizedCacheObject>

    public constructor(private commonGroundAPIService: CommonGroundAPIService) {
        this.client = this.commonGroundAPIService.createAPIClient(
            'https://taalhuizen-bisc.commonground.nu/api/v1/uc/graphql'
        )
    }

    public async findUserByUsername(username: string): Promise<UserEntity | null> {
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
            throw new Error(`Found multiple users with username '${username}', but expected only 1`)
        }

        const userEdge = this.getFirstItemFromArray(userEdges)

        return userEdge.node
    }

    public async findUserById(userId: string): Promise<UserEntity | null> {
        // TODO: Try codegen
        const query = gql`
            query user($id: ID!) {
                user(id: $id) {
                    id
                    username
                }
            }
        `

        const result = await this.client.query({ query, variables: { id: `/users/${userId}` } })

        const user: UserEntity | null = result.data.user

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
            variables: { input: { id: this.stripURLfromID(userId), password: newPasswordHash } },
        })

        return result.data.updateUser.user
    }

    private getFirstItemFromArray<T>(array: Array<T>): T {
        if (array.length > 0) {
            return array[0] as T
        }

        throw new Error(`Can't get first item from array because given array has 0 items`)
    }

    // This was copied from BaseRepository but we'll remove this repo soon so it doesn't matter
    private stripURLfromID(fullURI: string) {
        // Input can be full URI or small version, for example:
        // - https://taalhuizen-bisc.commonground.nu/api/v1/wrc/organizations/12e0cd5a-6f52-4719-b310-4b2b50fcc076
        // - organizations/12e0cd5a-6f52-4719-b310-4b2b50fcc076
        const sections = fullURI.split('/')
        const uuid = sections.pop() // For example: 12e0cd5a-6f52-4719-b310-4b2b50fcc076
        const uuidPrefix = sections.pop() // For example: organizations
        const idWithoutURI = `${uuidPrefix}/${uuid}`

        return idWithoutURI
    }
}
