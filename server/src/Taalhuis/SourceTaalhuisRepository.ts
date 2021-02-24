import { Injectable } from '@nestjs/common'
import { WRCRepository } from 'src/CommonGroundAPI/WRCRepository'

@Injectable()
export class SourceTaalhuisRepository extends WRCRepository {
    public async createSourceTaalhuis(name: string) {
        const result = await this.sdk.createOrganization({ input: { name } })

        const organisation = result.createOrganization?.organization

        return this.returnNonNullable(organisation)
    }
}
