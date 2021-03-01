import { Injectable, Logger } from '@nestjs/common'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { CreateTaalhuisInput } from './CreateTaalhuisService'
import { TaalhuisRepository } from './TaalhuisRepository'

export interface UpdateTaalhuisInput extends CreateTaalhuisInput {
    id: string
}

export interface AddressNodeType {
    id: string
    street?: string | null
    postalCode?: string | null
    locality?: string | null
    houseNumber?: string | null
    houseNumberSuffix?: string | null
}

@Injectable()
export class UpdateTaalhuisService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(private taalhuisRepository: TaalhuisRepository, private addressRepository: AddressRepository) {}

    public async updateTaalhuis(input: UpdateTaalhuisInput) {
        const taalhuis = await this.taalhuisRepository.getOneRaw(input.id)

        if (!taalhuis) {
            throw new Error(`Taalhuis entity not found`)
        }

        if (input.address) {
            if (taalhuis.adresses?.edges?.length) {
                const addressNode = taalhuis.adresses.edges.pop()?.node
                if (addressNode) {
                    await this.updateAddress(addressNode, input)
                }
            }
        }
    }

    private async updateAddress(addressNode: AddressNodeType, input: UpdateTaalhuisInput) {
        let somethingActuallyChanged = false
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
