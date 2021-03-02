import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'
import { Address } from 'src/generated/cc-graphql'

export interface addTaalhuisInput {
    name: string
    adresses?: string[]
    emails?: string[]
    telephones?: string[]
    sourceOrganization?: string
}

export interface editTaalhuisInput extends addTaalhuisInput {
    id: string
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
            input: { type: OrganisationTypesEnum.TAALHUIS, ...input },
        })

        const organization = createdTaalhuis?.createOrganization?.organization
        assertNotNil(organization, `Failed to create Taalhuis`)

        organization.id = this.makeURLfromID(organization.id)

        return organization
    }

    public async updateTaalhuis(input: editTaalhuisInput) {
        const updatedTaalhuis = await this.sdk.updateOrganization({ input })

        const organization = updatedTaalhuis.updateOrganization?.organization
        assertNotNil(organization, `Failed to update Taalhuis ${input.id}`)

        organization.id = this.makeURLfromID(organization.id)

        return organization
    }

    public async deleteTaalhuis(id: string) {
        const result = await this.sdk.deleteOrganization({ input: { id } })

        return !!result
    }

    public async getOneRaw(id: string) {
        const result = await this.sdk.organization({ id })
        if (!result.organization) {
            throw new Error(`Taalhuis entity not found.`)
        }

        return result?.organization
    }

    public async getOne(id: string) {
        const result = await this.sdk.organization({ id })
        if (!result.organization) {
            throw new Error(`Taalhuis entity not found.`)
        }
        const organisationEdge = result.organization
        const taalhuisEntity: TaalhuisEntity = {
            id: organisationEdge?.id || '',
            name: organisationEdge?.name || '',
            email: organisationEdge?.emails?.edges?.pop()?.node?.email || '',
            telephone: organisationEdge?.telephones?.edges?.pop()?.node?.telephone || '',
            address: this.parseAddressObject(organisationEdge?.adresses?.edges?.pop()?.node),
        }
        return taalhuisEntity
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
            const id = organisationEdge?.node?.id
            assertNotNil(id)

            const name = organisationEdge?.node?.name
            assertNotNil(name)

            const email = organisationEdge?.node?.emails?.edges?.pop()?.node?.email
            assertNotNil(email)

            const telephone = organisationEdge?.node?.telephones?.edges?.pop()?.node?.telephone
            assertNotNil(telephone)

            const address = organisationEdge?.node?.adresses?.edges?.pop()?.node
            assertNotNil(address)

            const taalhuisEntity: TaalhuisEntity = {
                id: this.makeURLfromID(id),
                name,
                email,
                telephone,
                address: this.parseAddressObject(address),
            }

            return taalhuisEntity
        })

        return taalhuisEntities

        // return organisations.map(organisation => this.returnNonNullable(organisation?.node))
    }

    // TODO: This was copied from CreateTaalhuisService, please fix
    private parseAddressObject(input?: Address | null): TaalhuisEntity['address'] {
        return {
            houseNumber: input?.houseNumber ?? '',
            locality: input?.locality ?? '',
            postalCode: input?.postalCode ?? '',
            street: input?.street ?? '',
            houseNumberSuffix: input?.houseNumberSuffix ?? '',
        }
    }
}
