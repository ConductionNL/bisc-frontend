import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { FindUserByIdQuery } from 'src/generated/uc-graphql'
import { UserEntity } from 'src/User/entities/UserEntity'
import { UCRepository } from '../UCRepository'

@Injectable()
export class UserRepository extends UCRepository {
    public async createUser(email: string, personId: string, userGroupId: string, passwordHash: string) {
        const result = await this.sdk.createUser({
            input: {
                username: email,
                person: personId,
                userGroups: [userGroupId],
                password: passwordHash,
                locale: 'nl',
            },
        })

        const userObject = result?.createUser?.user
        assertNotNil(userObject, `Failed to create user`)

        userObject.id = this.makeURLfromID(userObject.id)

        return this.returnNonNullable(userObject)
    }

    public async updateUser(userId: string, newUsername?: string, newUserGroupIds?: string[]) {
        const result = await this.sdk.updateUser({
            input: {
                id: this.stripURLfromID(userId),
                username: newUsername ?? undefined,
                userGroups: newUserGroupIds ? newUserGroupIds.map(id => this.stripURLfromID(id)) : undefined,
            },
        })
        const user = result.updateUser?.user
        assertNotNil(user, `Failed to update User ${userId}`)

        return { ...user, id: this.makeURLfromID(user.id) }
    }

    public async deleteUser(id: string) {
        try {
            const result = await this.sdk.deleteUser({ input: { id: this.stripURLfromID(id) } })
            return !!result
        } catch {
            // allow this to fail, it seems to get auto deleted sometimes
        }

        return true
    }

    public async findByEmail(email: string) {
        const result = await this.sdk.findUsersByUsername({ username: email })

        const userEdges = result.users?.edges
        assertNotNil(userEdges)

        if (userEdges.length === 0) {
            return null
        }

        if (userEdges.length > 1) {
            throw new Error(`Found multiple users with email '${email}', but expected only 1`)
        }

        const user = userEdges.pop()?.node
        assertNotNil(user)

        return this.parseUser(user)
    }

    public async findById(id: string) {
        const result = await this.sdk.findUserById({ id: this.stripURLfromID(id) })

        const userNode = result?.user

        if (!userNode) {
            return null
        }

        return this.parseUser(userNode)
    }

    public async findByPersonId(personId: string): Promise<UserEntity | null> {
        const result = await this.sdk.findUsersByPersonId({ personId })

        const userEdges = result.users?.edges

        if (!userEdges || !userEdges.length) {
            return null
        }

        assertNotNil(userEdges, `User not found for personId ${personId}`)

        if (userEdges.length === 0) {
            throw new Error(`User not found for personId ${personId}`)
        }

        if (userEdges.length > 1) {
            throw new Error(`Found multiple users for personId ${personId}, but expected only 1`)
        }

        const user = userEdges.pop()?.node
        assertNotNil(user)

        return this.parseUser(user)
    }

    private parseUser(userNode: NonNullable<FindUserByIdQuery['user']>) {
        const userGroupEdges = userNode.userGroups?.edges
        const userRoles = userGroupEdges
            ? userGroupEdges.map(userGroupEdge => {
                  const id = userGroupEdge?.node?.id
                  assertNotNil(id)
                  const name = userGroupEdge?.node?.name
                  assertNotNil(name)

                  return {
                      id: this.makeURLfromID(id),
                      name,
                  }
              })
            : []

        const userId = this.makeURLfromID(userNode.id)
        assertNotNil(userNode.dateCreated, `dateCreated not set for User ${userId}`)
        assertNotNil(userNode.dateModified, `dateModified not set for User ${userId}`)
        assertNotNil(userNode.person, `person not set for User ${userId}`)

        const userEntity: UserEntity = {
            id: userId,
            username: userNode.username,
            person: userNode.person,
            dateCreated: userNode.dateCreated,
            dateModified: userNode.dateModified,
            userRoles,
        }

        return userEntity
    }
}
