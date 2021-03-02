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

export enum OrganizationTypesEnum {
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
            input: { type: OrganizationTypesEnum.TAALHUIS, ...input },
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
        const organizationEdge = result.organization
        const taalhuisEntity: TaalhuisEntity = {
            id: organizationEdge?.id || '',
            name: organizationEdge?.name || '',
            email: organizationEdge?.emails?.edges?.pop()?.node?.email || '',
            telephone: organizationEdge?.telephones?.edges?.pop()?.node?.telephone || '',
            address: this.parseAddressObject(organizationEdge?.adresses?.edges?.pop()?.node),
        }
        return taalhuisEntity
    }

    public async findAll(): Promise<TaalhuisEntity[]> {
        const result = await this.sdk.organizations({ type: OrganizationTypesEnum.TAALHUIS })

        const organizations = result?.organizations?.edges

        if (!organizations) {
            return []
        }

        const taalhuisEntities = organizations.map(organizationEdge => {
            const id = organizationEdge?.node?.id
            assertNotNil(id)

            const name = organizationEdge?.node?.name
            assertNotNil(name)

            const email = organizationEdge?.node?.emails?.edges?.pop()?.node?.email
            assertNotNil(email)

            const telephone = organizationEdge?.node?.telephones?.edges?.pop()?.node?.telephone
            assertNotNil(telephone)

            const address = organizationEdge?.node?.adresses?.edges?.pop()?.node
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
