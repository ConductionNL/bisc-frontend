import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { EmployeeRole, OrganizationTypeEnum, ProviderEmployeeRole, TaalhuisEmployeeRole } from 'api/types/types'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import Row from 'components/Core/Layout/Row/Row'

import React from 'react'

interface Props {
    organizationType: OrganizationTypeEnum
    role: EmployeeRole
}

const RoleLabelTag: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()

    // combined roles? recursively call RoleLabelTag
    if (
        props.organizationType === OrganizationTypeEnum.Aanbieder &&
        props.role === ProviderEmployeeRole.CoordinatorMentor
    ) {
        return (
            <Row>
                <RoleLabelTag
                    organizationType={OrganizationTypeEnum.Aanbieder}
                    role={ProviderEmployeeRole.Coordinator}
                />
                <RoleLabelTag organizationType={OrganizationTypeEnum.Aanbieder} role={ProviderEmployeeRole.Mentor} />
            </Row>
        )
    }

    return <LabelTag {...props} label={getTranslation()} color={getColor()} />

    function getColor() {
        if (props.organizationType === OrganizationTypeEnum.Bisc) {
            return LabelColor.red
        }

        if (props.organizationType === OrganizationTypeEnum.Taalhuis) {
            const role = props.role as TaalhuisEmployeeRole

            return {
                [TaalhuisEmployeeRole.Coordinator]: LabelColor.red,
                [TaalhuisEmployeeRole.Employee]: LabelColor.blue,
            }[role]
        }

        if (props.organizationType === OrganizationTypeEnum.Aanbieder) {
            const role = props.role as ProviderEmployeeRole

            return {
                [ProviderEmployeeRole.Coordinator]: LabelColor.red,
                [ProviderEmployeeRole.Mentor]: LabelColor.purple,
                [ProviderEmployeeRole.CoordinatorMentor]: LabelColor.red, // code doesnt reach this point
                [ProviderEmployeeRole.Volunteer]: LabelColor.yellow,
            }[role]
        }

        return LabelColor.red
    }

    function getTranslation() {
        if (props.organizationType === OrganizationTypeEnum.Bisc) {
            return '-'
        }

        if (props.organizationType === OrganizationTypeEnum.Taalhuis) {
            const role = props.role as TaalhuisEmployeeRole

            return {
                [TaalhuisEmployeeRole.Coordinator]: i18n._(t`Coördinator`),
                [TaalhuisEmployeeRole.Employee]: i18n._(t`Medewerker`),
            }[role]
        }

        if (props.organizationType === OrganizationTypeEnum.Aanbieder) {
            const role = props.role as ProviderEmployeeRole

            return {
                [ProviderEmployeeRole.Coordinator]: i18n._(t`Coördinator`),
                [ProviderEmployeeRole.Mentor]: i18n._(t`Begeleider`),
                [ProviderEmployeeRole.CoordinatorMentor]: '', // code doesnt reach this point
                [ProviderEmployeeRole.Volunteer]: i18n._(t`Vrijwilliger`),
            }[role]
        }

        return '-'
    }
}

export default RoleLabelTag
