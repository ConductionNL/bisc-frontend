import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { UCRepository } from 'src/CommonGroundAPI/UCRepository'
import {
    CreateGroupInput as UCCreateGroupInput,
    FindGroupByIdQuery,
    FindGroupsByOrganizationIdQuery,
    Group,
} from 'src/generated/uc-graphql'

export enum UserRoleEnum {
    AANBIEDER_COORDINATOR = 'AANBIEDER_COORDINATOR', // Coördinator
    AANBIEDER_MENTOR = 'AANBIEDER_MENTOR', // Begeleider
    AANBIEDER_VOLUNTEER = 'AANBIEDER_VOLUNTEER', // Vrijwilliger

    TAALHUIS_COORDINATOR = 'TAALHUIS_COORDINATOR', // Coördinator
    TAALHUIS_EMPLOYEE = 'TAALHUIS_EMPLOYEE', // Medewerker
}

export type UserGroupEntity = Pick<Group, 'id' | 'name'> & {
    name: UserRoleEnum
}

type CreateGroupInput = UCCreateGroupInput & {
    name: UserRoleEnum
}

// TODO: Rename to UserGroupRepository
@Injectable()
export class GroupRepository extends UCRepository {
    public async createGroup(input: CreateGroupInput) {
        const group = await this.sdk.createGroup({ input })

        return group.createGroup?.group
    }

    public async findByIds(groupIds: string[]): Promise<UserGroupEntity[]> {
        const results = await Promise.all(
            groupIds.map(async groupId => {
                const result: FindGroupByIdQuery = await this.sdk.findGroupById({ groupId })

                const userGroup = result.group
                assertNotNil(userGroup, `UserGroup ${groupId} not found`)

                return userGroup
            })
        )

        const userGroupEntities = results.map(result => this.parseGroupEdge({ node: result }))

        return userGroupEntities
    }

    // wrcOrganizationId = sourceOrganization
    public async findByOrganizationId(wrcOrganizationId: string) {
        const results = await this.sdk.findGroupsByOrganizationId({ organizationId: wrcOrganizationId })

        const groupEdges = results.groups?.edges

        if (!groupEdges) {
            return []
        }

        const userGroupEntities = groupEdges.map(groupEdge => this.parseGroupEdge(groupEdge))

        return userGroupEntities
    }

    public parseGroupEdge(
        groupEdge: NonNullable<NonNullable<FindGroupsByOrganizationIdQuery['groups']>['edges']>[number]
    ): UserGroupEntity {
        const id = groupEdge?.node?.id
        assertNotNil(id)

        const name = groupEdge?.node?.name
        assertNotNil(name)

        const nameEnum = this.parseStringToUserRole(name)

        return {
            id: this.makeURLfromID(id),
            name: nameEnum,
        }
    }

    // TODO: Maybe make this generic, because we do the same in ParticipantRepository and OrganizationRepository
    private parseStringToUserRole(input: string) {
        for (const val of Object.values(UserRoleEnum)) {
            if (input.toUpperCase() === val.toUpperCase()) {
                // case insensitive match just in case
                return val
            }
        }


        throw new Error(`Unsupported userRole: ${input}`)
    }
}
