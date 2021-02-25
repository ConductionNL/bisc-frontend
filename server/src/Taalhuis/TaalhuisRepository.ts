import { Injectable } from '@nestjs/common'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'
import { Address } from 'src/generated/cc-graphql'

export interface addTaalhuisInput {
    name: string
    adresses?: string[]
    emails?: string[]
    telephones?: string[]
}

export enum OrganisationTypesEnum {
    TAALHUIS = 'TAALHUIS',
}

type TaalhuisEntity = {
    id: string
    name: string
    telephone: string
    email: string
    address: {
        street: string
        houseNumber: string
        houseNumberSuffix: string
        postalCode: string
        locality: string
    }
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
    public async findAll(): Promise<TaalhuisEntity[]> {
        const result = await this.sdk.organizations({ type: OrganisationTypesEnum.TAALHUIS })

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
        const taalhuisEntities = organisations.map(organisationEdge => {
            const taalhuisEntity: TaalhuisEntity = {
                id: organisationEdge?.node?.id || '',
                name: organisationEdge?.node?.name || '',
                email: organisationEdge?.node?.emails?.edges?.pop()?.node?.email || '',
                telephone: organisationEdge?.node?.telephones?.edges?.pop()?.node?.telephone || '',
                address: this.parseAddressObject(organisationEdge?.node?.adresses?.edges?.pop()?.node),
            }

            return taalhuisEntity
        })

        return taalhuisEntities

        // return organisations.map(organisation => this.returnNonNullable(organisation?.node))
    }

    // TODO: This was copied from CreateTaalhuisService, please fix
    private parseAddressObject(input?: Address | null): TaalhuisEntity['address'] {
        return {
            houseNumber: input?.houseNumber || '',
            locality: input?.locality || '',
            postalCode: input?.postalCode || '',
            street: input?.street || '',
            houseNumberSuffix: input?.houseNumberSuffix || '',
        }
    }
}
