import { Injectable } from '@nestjs/common'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'
import { Organization } from 'src/generated/cc-graphql'

export interface addTaalhuisInput {
    name: string
    adresses?: string[]
    emails?: string[]
    telephones?: string[]
}

export enum OrganisationTypesEnum {
    TAALHUIS = 'TAALHUIS',
}

@Injectable()
export class TaalhuisRepository extends CCRepository {
    public async addTaalhuis(input: addTaalhuisInput) {
        const createdTaalhuis = await this.sdk.createOrganization({
            input: { ...input, type: OrganisationTypesEnum.TAALHUIS },
        })
        if (createdTaalhuis?.createOrganization?.organization) {
            return createdTaalhuis.createOrganization.organization
        }

        throw new Error(`Failed to create Taalhuis`)
    }

    // public async findAll(): Promise<
    //     { id: string; name: string; address: { id: string; houseNumber: string; postalCode: string } }[]
    // > {
    public async findAll(): Promise<Pick<Organization, 'id' | 'name' | 'type'>[]> {
        const result = await this.sdk.taalhuizen()

        const organisations = result?.organizations?.edges

        if (!organisations) {
            return []
        }

        // TODO: Fetch addresses through a dataloader?
        // const organisationsWithAddressMapped = organisations.map(organisation => {
        //     if (!organisation || !organisation.adresses || !organisation.adresses.edges) {
        //         throw new Error()
        //     }

        //     const addresses = organisation.adresses.edges.map(addressEdge => {
        //         return this.returnNonNullable(addressEdge.node)
        //     })

        //     if (addresses.length > 1) {
        //         throw new Error()
        //     }
        //     ;(organisation as any).address = addresses[0]

        //     return this.returnNonNullable(organisation)
        // })

        // return organisationsWithAddressMapped

        return organisations.map(organisation => this.returnNonNullable(organisation?.node))
    }
}
