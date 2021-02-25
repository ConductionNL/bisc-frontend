import { Injectable } from '@nestjs/common'
import { Dataloadable } from 'src/BaseRepository'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'
import { Address } from 'src/generated/cc-graphql'

export type AddressEntity = Pick<Address, 'street' | 'postalCode' | 'locality' | 'id'>

@Injectable()
export class AddressRepository extends CCRepository implements Dataloadable<AddressEntity> {
    public async createAddress(street: string, postalCode: string, locality: string) {
        const result = await this.sdk.createAddress({
            street,
            postalCode,
            locality,
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
