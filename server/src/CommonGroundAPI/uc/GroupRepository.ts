import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { UCRepository } from 'src/CommonGroundAPI/UCRepository'
import { CreateGroupInput, FindGroupByIdQuery, Group } from 'src/generated/uc-graphql'

export type UserGroupEntity = Pick<Group, 'id' | 'name'>

// TODO: Rename to UserGroupRepository
@Injectable()
export class GroupRepository extends UCRepository {
    public async createGroup(input: CreateGroupInput) {
        const group = await this.sdk.createGroup({ input })

        return group.createGroup?.group
    }

    public async findByIds(groupIds: string[]): Promise<UserGroupEntity[]> {
        const results = await Promise.all(groupIds.map(async groupId => {
            const result: FindGroupByIdQuery = await this.sdk.findGroupById({ groupId })

            const userGroup = result.group
            assertNotNil(userGroup, `UserGroup ${groupId} not found`)

            return userGroup
        }))

        // TODO: Add a parseGroup method remove duplication
        const userGroupEntities = results.map(result => {
            const id = result.id
            assertNotNil(id)

            const name = result.name
            assertNotNil(name)

            return {
                id: this.makeURLfromID(id),
                name,
            }
        })

        return userGroupEntities
    }

    // wrcOrganizationId = sourceOrganization
    public async findByOrganizationId(wrcOrganizationId: string) {
        const results = await this.sdk.findGroupsByOrganizationId({ organizationId: wrcOrganizationId })

        const groupEdges = results.groups?.edges

        if (!groupEdges) {
            return []
        }

        const userGroupEntities = groupEdges.map(groupEdge => {
            const id = groupEdge?.node?.id
            assertNotNil(id)

            const name = groupEdge?.node?.name
            assertNotNil(name)

            return {
                id: this.makeURLfromID(id),
                name,
            }
        })

        return userGroupEntities
    }
}
