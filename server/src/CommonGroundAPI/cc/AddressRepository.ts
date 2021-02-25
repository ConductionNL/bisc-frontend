import { Injectable } from '@nestjs/common'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'

export interface CreateTaalhuisAddressInput {
    street?: string
    postalCode: string
    locality?: string
    houseNumber: string
}

@Injectable()
export class AddressRepository extends CCRepository {
    public async createAddress(addressInput: CreateTaalhuisAddressInput) {
        const result = await this.sdk.createAddress({
            input: {
                street: addressInput.street || undefined,
                postalCode: addressInput.postalCode,
                houseNumber: addressInput.houseNumber,
                locality: addressInput.locality || undefined,
            },
        })

        const address = result?.createAddress?.address

        return this.returnNonNullable(address)
    }
}
