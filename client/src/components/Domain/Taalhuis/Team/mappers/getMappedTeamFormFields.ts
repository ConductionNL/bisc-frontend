import { PostPutTeamParams } from 'api/team/team'
import { Team } from 'api/types/types'
import { TeamDetailFormFields } from '../TeamDetailFields'

export function getMappedTeamFormFields(
    formData: TeamDetailFormFields,
    organizationId?: string,
    team?: Team
): PostPutTeamParams {
    // for new teams only
    const conditionalFields: PostPutTeamParams = team
        ? {}
        : {
              type: 'team',
              parentOrganization: organizationId,
          }

    return {
        ...conditionalFields,
        name: formData.name ?? team?.name,
        team_postalCodes: formData.codes || [],
    }
}
