import { Injectable, Logger } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'

interface UpdateAanbiederAddressInput {
    street?: string | null
    postalCode?: string | null
    locality?: string | null
    houseNumber?: string | null
    houseNumberSuffix?: string | null
}

export interface UpdateAanbiederInput {
    id: string
    address?: UpdateAanbiederAddressInput
    name?: string
    email?: string
    phoneNumber?: string
}

interface AddressNodeType {
    id: string
    street?: string | null
    postalCode?: string | null
    locality?: string | null
    houseNumber?: string | null
    houseNumberSuffix?: string | null
}

interface TelephoneNodeType {
    id: string
    telephone?: string | null
}

interface EmailNodeType {
    id: string
    email?: string | null
}

@Injectable()
export class UpdateAanbiederService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private organizationRepository: OrganizationRepository,
        private addressRepository: AddressRepository,
        private telephoneRepository: TelephoneRepository,
        private emailRepository: EmailRepository
    ) {}

    public async updateAanbieder(input: UpdateAanbiederInput) {
        // TODO: This still returns small ID's instead of full URI's, maybe fix this later
        const aanbieder = await this.organizationRepository.getOneRaw(input.id)

        if (!aanbieder) {
            throw new Error(`Aanbieder entity not found`)
        }

        const addressNode = aanbieder.addresses?.edges?.pop()?.node
        assertNotNil(addressNode, `Address not found for aanbieder ${aanbieder.id}`)

        const telephoneNode = aanbieder.telephones?.edges?.pop()?.node
        assertNotNil(telephoneNode, `Telephone not found for aanbieder ${aanbieder.id}`)

        const emailNode = aanbieder.emails?.edges?.pop()?.node
        assertNotNil(emailNode, `Email not found for aanbieder ${aanbieder.id}`)

        await this.updateTelephone(telephoneNode, input)
        await this.updateAddress(addressNode, input)
        await this.updateEmail(emailNode, input)

        // TODO: If the name was changed, then we should also update the name in the linked wrc/organization (SourceAanbieder)
        await this.organizationRepository.updateOrganization({
            id: aanbieder.id,
            type: OrganizationTypesEnum.AANBIEDER,
            name: input.name || aanbieder.name,
            addressIds: [addressNode.id],
            emailIds: [emailNode.id],
            telephoneIds: [telephoneNode.id],
        })

        return this.organizationRepository.getOne(aanbieder.id)
    }

    private async updateEmail(emailNode: EmailNodeType, input: UpdateAanbiederInput) {
        if (!input.email) {
            return null
        }

        if (input.email !== emailNode.email) {
            const result = await this.emailRepository.updateEmail({ id: emailNode.id, email: input.email })

            if (!result) {
                throw new Error(`Failed updating email entity`)
            }

            return result
        }
        return emailNode
    }

    private async updateTelephone(telephoneNode: TelephoneNodeType, input: UpdateAanbiederInput) {
        if (!input.phoneNumber) {
            return null
        }

        if (input.phoneNumber !== telephoneNode.telephone) {
            const result = await this.telephoneRepository.updateTelephone({
                id: telephoneNode.id,
                telephone: input.phoneNumber,
            })

            if (!result) {
                throw new Error(`Failed to update telephone`)
            }

            return result
        }
        return telephoneNode
    }

    private async updateAddress(addressNode: AddressNodeType, input: UpdateAanbiederInput) {
        let somethingActuallyChanged = false
        if (!input.address) {
            return null
        }
        const { houseNumber, postalCode, houseNumberSuffix, locality, street } = input.address
        if (addressNode.houseNumber !== houseNumber) {
            addressNode.houseNumber = houseNumber
            somethingActuallyChanged = true
        }

        if (addressNode.postalCode !== postalCode) {
            addressNode.postalCode = postalCode
            somethingActuallyChanged = true
        }

        if (addressNode.houseNumberSuffix !== houseNumberSuffix) {
            addressNode.houseNumberSuffix = houseNumberSuffix
            somethingActuallyChanged = true
        }

        if (addressNode.locality !== locality) {
            addressNode.locality = locality
            somethingActuallyChanged = true
        }

        if (addressNode.street !== street) {
            addressNode.street = street
            somethingActuallyChanged = true
        }

        if (somethingActuallyChanged) {
            const updatedAddress = await this.addressRepository.updateAddress(addressNode)
            if (!updatedAddress) {
                throw new Error(`Updating address failed`)
            }
            return updatedAddress
        }

        return addressNode
    }
}
