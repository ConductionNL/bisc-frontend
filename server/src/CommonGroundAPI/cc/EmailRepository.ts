import { Injectable } from '@nestjs/common'
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

        return this.returnNonNullable(emailObject)
    }

    public async updateEmail(input: UpdateEmailInputType) {
        const result = await this.sdk.updateEmail({ input })

        return result.updateEmail?.email
    }
}
