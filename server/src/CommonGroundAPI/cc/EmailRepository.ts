import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'

@Injectable()
export class EmailRepository extends CCRepository {
    public async createEmail(email: string) {
        const result = await this.sdk.createEmail({
            input: { email },
        })

        const emailObject = result?.createEmail?.email
        assertNotNil(emailObject, `Failed to create email`)

        return this.returnNonNullable(emailObject)
    }
}
