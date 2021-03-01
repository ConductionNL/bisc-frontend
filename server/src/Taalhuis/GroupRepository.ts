import { Injectable } from '@nestjs/common'
import { UCRepository } from 'src/CommonGroundAPI/UCRepository'
import { CreateGroupInput, Group } from 'src/generated/uc-graphql'

export type UserGroupEntity = Pick<Group, 'id' | 'name'>

// TODO: Move file to src/CommonGroundAPI/uc + add to CommonGroundAPIModule instead of TaalhuisModule
// TODO: Rename to UserGroupRepository
@Injectable()
export class GroupRepository extends UCRepository {
    public async createGroup(input: CreateGroupInput) {
        const group = await this.sdk.createGroup({ input })

        return group.createGroup?.group
    }

    public async findByOrganisationId(ccOrganisationId: string) {
        const results = await this.sdk.groupsByOrganizationId({ organizationId: this.makeURLfromID(ccOrganisationId) })

        const groupEdges = results.groups?.edges

        if (!groupEdges) {
            return []
        }

        const userGroupEntities = groupEdges.map(groupEdge => {
            // TODO: add assertNotNil
            const id = groupEdge?.node?.id
            const name = groupEdge?.node?.name
            return {
                id,
                name,
            } as UserGroupEntity
        })

        return userGroupEntities
    }
}
