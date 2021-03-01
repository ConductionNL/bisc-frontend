import { Injectable, Logger } from '@nestjs/common'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { TaalhuisRepository } from './TaalhuisRepository'
import { TaalhuisAddressType } from './types/TaalhuisType'

export interface UpdateTaalhuisAddressInput {
    street?: string | null
    postalCode?: string | null
    locality?: string | null
    houseNumber?: string | null
    houseNumberSuffix?: string | null
}

export interface UpdateTaalhuisInput {
    id: string
    address?: UpdateTaalhuisAddressInput | null
    name?: string | null
    email?: string | null
    phoneNumber?: string | null
}

export interface AddressNodeType {
    id: string
    street?: string | null
    postalCode?: string | null
    locality?: string | null
    houseNumber?: string | null
    houseNumberSuffix?: string | null
}

export interface TelephoneNodeType {
    id: string
    telephone?: string | null
}

export interface EmailNodeType {
    id: string
    email?: string | null
}

@Injectable()
export class UpdateTaalhuisService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private taalhuisRepository: TaalhuisRepository,
        private addressRepository: AddressRepository,
        private telephoneRepository: TelephoneRepository,
        private emailRepository: EmailRepository
    ) {}

    public async updateTaalhuis(input: UpdateTaalhuisInput) {
        const taalhuis = await this.taalhuisRepository.getOneRaw(input.id)

        if (!taalhuis) {
            throw new Error(`Taalhuis entity not found`)
        }

        let addressId = taalhuis.adresses?.edges?.pop()?.node?.id
        if (input.address) {
            if (taalhuis.adresses?.edges?.length) {
                const addressNode = taalhuis.adresses.edges.pop()?.node
                if (addressNode) {
                    await this.updateAddress(addressNode, input)
                }
            } else {
                const result = await this.addressRepository.createAddress(this.parseAddressObject(input.address))
                addressId = result.id
            }
        }

        let telephoneId = taalhuis.telephones?.edges?.pop()?.node?.id
        if (input.phoneNumber) {
            if (taalhuis.telephones?.edges?.length) {
                const telephoneNode = taalhuis.telephones.edges.pop()?.node
                if (telephoneNode) {
                    await this.updateTelephone(telephoneNode, input)
                }
            } else {
                const result = await this.telephoneRepository.createTelephone(input.phoneNumber)
                telephoneId = result.id
            }
        }

        let emailId = taalhuis.emails?.edges?.pop()?.node?.id
        if (input.email) {
            if (taalhuis.emails?.edges?.length) {
                const emailNode = taalhuis.emails.edges.pop()?.node
                if (emailNode) {
                    this.updateEmail(emailNode, input)
                }
            } else {
                const result = await this.emailRepository.createEmail(input.email)
                emailId = result.id
            }
        }

        await this.taalhuisRepository.updateTaalhuis({
            id: taalhuis.id,
            name: input.name || taalhuis.name,
            adresses: addressId ? [addressId] : [],
            emails: emailId ? [emailId] : [],
            telephones: telephoneId ? [telephoneId] : [],
        })

        return this.taalhuisRepository.getOne(taalhuis.id)
    }

    private async updateEmail(emailNode: EmailNodeType, input: UpdateTaalhuisInput) {
        if (input.email !== emailNode.email) {
            const result = await this.emailRepository.updateEmail({ id: emailNode.id, email: input.email })

            if (!result) {
                throw new Error(`Failed updating email entity`)
            }

            return result
        }
        return emailNode
    }

    private async updateTelephone(telephoneNode: TelephoneNodeType, input: UpdateTaalhuisInput) {
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

    private parseAddressObject(input?: UpdateTaalhuisAddressInput | null): TaalhuisAddressType {
        return {
            houseNumber: input?.houseNumber || '',
            locality: input?.locality || '',
            postalCode: input?.postalCode || '',
            street: input?.street || '',
            houseNumberSuffix: input?.houseNumberSuffix || '',
        }
    }

    private async updateAddress(addressNode: AddressNodeType, input: UpdateTaalhuisInput) {
        let somethingActuallyChanged = false
        if (!input.address) {
            return null
        }
        const { houseNumber, postalCode, houseNumberSuffix, locality, street } = input.address
        if (houseNumber && addressNode.houseNumber !== houseNumber) {
            addressNode.houseNumber = houseNumber
            somethingActuallyChanged = true
        }

        if (postalCode && addressNode.postalCode !== postalCode) {
            addressNode.postalCode = postalCode
            somethingActuallyChanged = true
        }

        if (houseNumberSuffix && addressNode.houseNumberSuffix !== houseNumberSuffix) {
            addressNode.houseNumberSuffix = houseNumberSuffix
            somethingActuallyChanged = true
        }

        if (locality && addressNode.locality !== locality) {
            addressNode.locality = locality
            somethingActuallyChanged = true
        }

        if (street && addressNode.street !== street) {
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
