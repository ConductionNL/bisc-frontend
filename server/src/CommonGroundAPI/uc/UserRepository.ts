import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
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

        return this.returnNonNullable(user)
    }
}
