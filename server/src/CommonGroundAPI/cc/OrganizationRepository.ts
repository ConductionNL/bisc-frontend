import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { Address, OrganizationsQuery } from 'src/generated/cc-graphql'
import { CCRepository } from '../CCRepository'

export interface CreateOrganizationInput {
    type: OrganizationTypesEnum
    name: string
    addressIds?: string[]
    emailIds?: string[]
    telephoneIds?: string[]
    sourceOrganizationId?: string
    personIds?: string[]
}

export interface EditOrganizationInput extends CreateOrganizationInput {
    id: string
}

export enum OrganizationTypesEnum {
    TAALHUIS = 'TAALHUIS',
    AANBIEDER = 'AANBIEDER',
    AANMELDER = 'AANMELDER',
}

type OrganizationEntity = {
    id: string
    type: OrganizationTypesEnum
    name: string
    telephone?: string
    telephoneId?: string
    email?: string
    emailId?: string
    sourceOrganization?: string
    address?: {
        id: string
        street: string
        houseNumber: string
        houseNumberSuffix?: string
        postalCode: string
        locality: string
    }
    personIds?: string[]
}

@Injectable()
export class OrganizationRepository extends CCRepository {
    public async createOrganization(input: CreateOrganizationInput) {
        const createdOrganization = await this.sdk.createOrganization({
            input: {
                type: input.type,
                name: input.name,
                addresses: input.addressIds
                    ? input.addressIds.map(addressId => this.stripURLfromID(addressId))
                    : undefined,
                emails: input.emailIds ? input.emailIds.map(emailId => this.stripURLfromID(emailId)) : undefined,
                telephones: input.telephoneIds
                    ? input.telephoneIds.map(telephoneId => this.stripURLfromID(telephoneId))
                    : undefined,
                sourceOrganization: input.sourceOrganizationId,
                persons: input.personIds ? input.personIds.map(personId => this.stripURLfromID(personId)) : undefined,
            },
        })

        const organization = createdOrganization?.createOrganization?.organization
        assertNotNil(organization, `Failed to create Organization`)

        organization.id = this.makeURLfromID(organization.id)

        return organization
    }

    public async updateOrganization(input: EditOrganizationInput) {
        const updatedOrganization = await this.sdk.updateOrganization({
            input: {
                id: this.stripURLfromID(input.id),
                name: input.name,
                addresses: input.addressIds
                    ? input.addressIds.map(addressId => this.stripURLfromID(addressId))
                    : undefined,
                emails: input.emailIds ? input.emailIds.map(emailId => this.stripURLfromID(emailId)) : undefined,
                telephones: input.telephoneIds
                    ? input.telephoneIds.map(telephoneId => this.stripURLfromID(telephoneId))
                    : undefined,
                sourceOrganization: input.sourceOrganizationId,
            },
        })

        const organization = updatedOrganization.updateOrganization?.organization
        assertNotNil(organization, `Failed to update Organization ${input.id}`)

        organization.id = this.makeURLfromID(organization.id)

        return organization
    }

    public async deleteOrganization(id: string) {
        const result = await this.sdk.deleteOrganization({ input: { id: this.stripURLfromID(id) } })

        return !!result
    }

    public async getOneRaw(id: string, desiredType?: OrganizationTypesEnum) {
        const result = await this.sdk.organization({ id: this.stripURLfromID(id) })
        if (
            !result.organization ||
            !result.organization.type ||
            (desiredType && this.parseStringToOrganizationType(result.organization.type) !== desiredType)
        ) {
            throw new Error(`Organization entity not found.`)
        }

        // TODO: This still returns small ID's instead of full URI's, maybe fix this later
        return result?.organization
    }

    public async getOne(id: string, desiredType?: OrganizationTypesEnum) {
        const result = await this.sdk.organization({ id: this.stripURLfromID(id) })

        if (
            !result.organization ||
            !result.organization.type ||
            (desiredType && this.parseStringToOrganizationType(result.organization.type) !== desiredType)
        ) {
            throw new Error(`Organization entity not found.`)
        }
        const organizationNode = result.organization

        return this.parseOrganizationEdge({ node: organizationNode })
    }

    public async findAll(type: OrganizationTypesEnum): Promise<OrganizationEntity[]> {
        const result = await this.sdk.organizations({ type })

        const organizations = result?.organizations?.edges

        if (!organizations) {
            return []
        }

        const organizationEntities = organizations.map(organizationEdge => this.parseOrganizationEdge(organizationEdge))

        return organizationEntities
    }

    public async findBySourceOrganizationId(
        type: OrganizationTypesEnum,
        sourceOrganizationId: string
    ): Promise<OrganizationEntity> {
        const result = await this.sdk.organizations({ type, sourceOrganization: sourceOrganizationId })

        const organizationEdges = result?.organizations?.edges
        assertNotNil(organizationEdges)

        if (organizationEdges.length === 0) {
            throw new Error(`Organization not found for sourceOrganization '${sourceOrganizationId}' and type ${type}`)
        }

        if (organizationEdges.length > 1) {
            throw new Error(
                `Found multiple Organizations for sourceOrganization '${sourceOrganizationId}' and type ${type}, but expected only 1`
            )
        }

        const organizationEdge = organizationEdges.pop()
        assertNotNil(organizationEdge)

        return this.parseOrganizationEdge(organizationEdge)
    }

    private parseOrganizationEdge(
        organizationEdge: NonNullable<NonNullable<OrganizationsQuery['organizations']>['edges']>[number]
    ): OrganizationEntity {
        const id = organizationEdge?.node?.id
        assertNotNil(id)

        const name = organizationEdge?.node?.name
        assertNotNil(name)

        const type = organizationEdge?.node?.type
        assertNotNil(type)

        const sourceOrganization = organizationEdge?.node?.sourceOrganization

        // Nullable fields
        const email = organizationEdge?.node?.emails?.edges?.pop()?.node
        const telephone = organizationEdge?.node?.telephones?.edges?.pop()?.node

        const address = organizationEdge?.node?.addresses?.edges?.pop()?.node

        const personEdges = organizationEdge?.node?.persons?.edges
        const personIds = personEdges
            ? personEdges.map(personEdge => {
                  const personId = personEdge?.node?.id
                  assertNotNil(personId)

                  return this.makeURLfromID(personId)
              })
            : undefined

        const organizationEntity: OrganizationEntity = {
            id: this.makeURLfromID(id),
            name,
            type: this.parseStringToOrganizationType(type),
            email: email ? email.email : undefined,
            emailId: email ? email.id : undefined,
            telephone: telephone ? telephone.telephone : undefined,
            telephoneId: telephone ? telephone.id : undefined,
            address: address ? this.parseAddressObject(address) : undefined,
            sourceOrganization: sourceOrganization ?? undefined,
            personIds,
        }

        return organizationEntity
    }

    // TODO: Maybe make this generic, because we do the same in ParticipantRepository
    private parseStringToOrganizationType(input: string) {
        for (const val of Object.values(OrganizationTypesEnum)) {
            if (input.toUpperCase() === val.toUpperCase()) {
                // case insensitive match just in case
                return val
            }
        }

        throw new Error(`Unsupported organization type: ${input}`)
    }

    // TODO: This was copied from CreateOrganizationService, please fix
    private parseAddressObject(input?: Address | null): OrganizationEntity['address'] {
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
