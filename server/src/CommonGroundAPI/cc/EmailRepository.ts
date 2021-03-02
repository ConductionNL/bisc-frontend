import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'

export interface UpdateEmailInputType {
    id: string
    email?: string | null
}
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

    public async deleteEmail(id: string) {
        const result = await this.sdk.deleteEmail({ input: { id } })

        return !!result
    }

    public async updateEmail(input: UpdateEmailInputType) {
        const result = await this.sdk.updateEmail({ input })

        return result.updateEmail?.email
    }
}
