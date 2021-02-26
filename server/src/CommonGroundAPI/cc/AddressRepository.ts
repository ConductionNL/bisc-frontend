import { Injectable } from '@nestjs/common'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'
import { Address } from 'src/generated/cc-graphql'

export interface CreateTaalhuisAddressInput {
    street?: string
    postalCode: string
    locality?: string
    houseNumber: string
    houseNumberSuffix?: string
}

export type AddressEntity = Pick<
    Address,
    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality' | 'id'
>

@Injectable()
export class AddressRepository extends CCRepository {
    public async createAddress(addressInput: CreateTaalhuisAddressInput) {
        const result = await this.sdk.createAddress({
            input: {
                street: addressInput.street || undefined,
                postalCode: addressInput.postalCode,
                houseNumber: addressInput.houseNumber,
                houseNumberSuffix: addressInput.houseNumberSuffix || undefined,
                locality: addressInput.locality || undefined,
            },
        })

        const address = result?.createAddress?.address

        return this.returnNonNullable(address)
    }

    public async findByIds(ids: readonly string[]): Promise<AddressEntity[]> {
        const result = await this.sdk.addresses({
            id_list: ids as string[],
        })

        const addressEdges = result?.addresses?.edges

        if (!addressEdges) {
            return []
        }

        const addresses: AddressEntity[] = addressEdges.map(addressEdge => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this.returnNonNullable(addressEdge!.node)
        })

        return addresses
    }
}
