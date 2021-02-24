import { Injectable } from '@nestjs/common'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'

export interface addTaalhuisInput {
    name: string
    addressId?: string
    emailId?: string
    phoneNumberId?: string
}

@Injectable()
export class TaalhuisRepository extends CCRepository {
    public addTaalhuis(input: addTaalhuisInput) {
        //
        return !!input
    }

    public async findAll(): Promise<
        { id: string; name: string; addresses: { id: string; houseNumber: string; postalCode: string }[] }[]
    > {
        const result = await this.sdk.taalhuizen()

        const organisations = result?.organisations?.edges

        // TODO: Fetch addresses through a dataloader?
        const organisationsWithAddressMapped = organisations.map(organisation => {
            const addresses = organisation.edges.map(addressEdge => {
                return this.returnNonNullable(addressEdge.node)
            })
            organisation.addresses = addresses

            return this.returnNonNullable(organisation)
        })

        return organisationsWithAddressMapped
    }
}
