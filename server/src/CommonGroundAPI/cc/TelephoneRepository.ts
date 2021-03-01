import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'

@Injectable()
export class TelephoneRepository extends CCRepository {
    public async createTelephone(telephone: string) {
        const result = await this.sdk.createTelephone({
            input: { telephone },
        })

        const telephoneObject = result?.createTelephone?.telephone
        assertNotNil(telephoneObject, `Failed to create telephone`)

        return this.returnNonNullable(telephoneObject)
    }
}
