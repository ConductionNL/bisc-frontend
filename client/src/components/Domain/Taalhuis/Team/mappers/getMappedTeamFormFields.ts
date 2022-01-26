import { PostPutTeamParams } from 'api/team/team'
import { Team } from 'api/types/types'
import { getSelectedTaalhuisPostcodes } from '../../TaalhuisPostcodeField'
import { TeamDetailFormFields } from '../TeamDetailFields'

// TODO: BISC-314 add members
export function getMappedTeamFormFields(
    formData: TeamDetailFormFields,
    organizationId?: string,
    team?: Team
): PostPutTeamParams {
    const postalCodes = getSelectedTaalhuisPostcodes(formData.codes, team?.team_postalCodes)
        .map(c => c.id)
        .filter(c => !!c) as string[]

    return {
        type: 'team',
        name: formData.name ?? team?.name,
        team_postalCodes: postalCodes,
        parentOrganization: organizationId,
    }
}
