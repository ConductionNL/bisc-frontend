import { Injectable } from '@nestjs/common'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'

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
}
