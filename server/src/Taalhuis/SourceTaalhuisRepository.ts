import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { WRCRepository } from 'src/CommonGroundAPI/WRCRepository'

@Injectable()
export class SourceTaalhuisRepository extends WRCRepository {
    public async createSourceTaalhuis(name: string) {
        const result = await this.sdk.createSourceOrganization({ input: { name } })

        const organisation = result.createOrganization?.organization
        assertNotNil(organisation, `Failed to create SourceTaalhuis`)

        organisation.id = this.makeURLfromID(organisation.id)

        return this.returnNonNullable(organisation)
    }

    public async updateSourceTaalhuis(id: string, fields: { name?: string; ccOrganisationId?: string }) {
        const result = await this.sdk.updateSourceOrganization({
            input: { id, name: fields.name, contact: fields.ccOrganisationId },
        })

        const organisation = result.updateOrganization?.organization
        assertNotNil(organisation, `Failed to update SourceTaalhuis ${id}`)

        organisation.id = this.makeURLfromID(organisation.id)

        return this.returnNonNullable(organisation)
    }
}
