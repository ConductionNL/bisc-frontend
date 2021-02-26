import { Injectable } from '@nestjs/common'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'

@Injectable()
export class EmailRepository extends CCRepository {
    public async createEmail(email: string) {
        const result = await this.sdk.createEmail({
            input: { email },
        })

        const emailObject = result?.createEmail?.email

        return this.returnNonNullable(emailObject)
    }
}
