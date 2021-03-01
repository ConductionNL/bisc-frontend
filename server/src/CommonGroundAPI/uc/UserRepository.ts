import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { UCRepository } from '../UCRepository'

@Injectable()
export class UserRepository extends UCRepository {
    public async createUser(email: string, personId: string, passwordHash: string) {
        const result = await this.sdk.createUser({
            input: { username: email, person: personId, password: passwordHash, locale: 'nl' },
        })

        const userObject = result?.createUser?.user
        assertNotNil(userObject, `Failed to create user`)

        return this.returnNonNullable(userObject)
    }
}
