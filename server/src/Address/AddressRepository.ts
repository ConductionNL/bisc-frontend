import { Injectable } from '@nestjs/common'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'


@Injectable()
export class AddressRepository extends CCRepository {
    public async createAddress(street: string, postalCode: string, locality: string) {
        const result = await this.sdk.createAddress({
            street,
            postalCode,
            locality,
        })

        const address = result?.createAddress?.address

        return this.returnNonNullable(address)
    }
}
