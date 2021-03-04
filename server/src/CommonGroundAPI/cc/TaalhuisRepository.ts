import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'
import { Address } from 'src/generated/cc-graphql'

export interface AddTaalhuisInput {
    name: string
    adresses?: string[]
    emails?: string[]
    telephones?: string[]
    sourceOrganization?: string
}

export interface EditTaalhuisInput extends AddTaalhuisInput {
    id: string
}

export enum OrganizationTypesEnum {
    TAALHUIS = 'TAALHUIS',
}

type TaalhuisEntity = {
    id: string
    name: string
    telephone: string
    telephoneId: string
    email: string
    emailId: string
    sourceTaalhuis: string
    address: {
        id: string
        street: string
        houseNumber: string
        houseNumberSuffix: string
        postalCode: string
        locality: string
    }
}

@Injectable()
export class TaalhuisRepository extends CCRepository {
    public async addTaalhuis(input: AddTaalhuisInput) {
        const createdTaalhuis = await this.sdk.createOrganization({
            input: { type: OrganizationTypesEnum.TAALHUIS, ...input },
        })

        const organization = createdTaalhuis?.createOrganization?.organization
        assertNotNil(organization, `Failed to create Taalhuis`)

        organization.id = this.makeURLfromID(organization.id)

        return organization
    }

    public async updateTaalhuis(input: EditTaalhuisInput) {
        const updatedTaalhuis = await this.sdk.updateOrganization({ input })

        const organization = updatedTaalhuis.updateOrganization?.organization
        assertNotNil(organization, `Failed to update Taalhuis ${input.id}`)

        organization.id = this.makeURLfromID(organization.id)

        return organization
    }

    public async deleteTaalhuis(id: string) {
        const result = await this.sdk.deleteOrganization({ input: { id: this.stripURLfromID(id) } })

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
            emailId: organizationEdge?.emails?.edges?.pop()?.node?.id || '',
            telephone: organizationEdge?.telephones?.edges?.pop()?.node?.telephone || '',
            telephoneId: organizationEdge?.telephones?.edges?.pop()?.node?.id || '',
            address: this.parseAddressObject(organizationEdge?.adresses?.edges?.pop()?.node),
            sourceTaalhuis: organizationEdge.sourceOrganization ?? '',
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

            const sourceTaalhuis = organizationEdge?.node?.sourceOrganization
            assertNotNil(sourceTaalhuis)

            const email = organizationEdge?.node?.emails?.edges?.pop()?.node
            assertNotNil(email)

            const telephone = organizationEdge?.node?.telephones?.edges?.pop()?.node
            assertNotNil(telephone)

            const address = organizationEdge?.node?.adresses?.edges?.pop()?.node
            assertNotNil(address)

            const taalhuisEntity: TaalhuisEntity = {
                id: this.makeURLfromID(id),
                name,
                email: email.email,
                emailId: email.id,
                telephone: telephone.telephone,
                telephoneId: telephone.id,
                address: this.parseAddressObject(address),
                sourceTaalhuis,
            }

            return taalhuisEntity
        })

        return taalhuisEntities
    }

    // TODO: This was copied from CreateTaalhuisService, please fix
    private parseAddressObject(input?: Address | null): TaalhuisEntity['address'] {
        return {
            id: input?.id ?? '',
            houseNumber: input?.houseNumber ?? '',
            locality: input?.locality ?? '',
            postalCode: input?.postalCode ?? '',
            street: input?.street ?? '',
            houseNumberSuffix: input?.houseNumberSuffix ?? '',
        }
    }
}
