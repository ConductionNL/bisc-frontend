import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ManagementCoworkerFieldsContainer } from 'components/Domain/Taalhuis/Management/Containers/ManagementCoworkerFieldsContainer'

import { useTaalhuisEmployeeQuery } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import { routes } from '../../../../../../routes/routes'
import { ManagementTaalhuisLocationStateProps } from './CoworkersDetailView'

interface Props {
    routeState: ManagementTaalhuisLocationStateProps
}

const CoworkerReadView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { loading: queryLoading, error: queryError, data: queryData } = useTaalhuisEmployeeQuery({
        variables: {
            userId: routeState.coworkerId,
        },
    })

    if (!routeState.coworkerId) {
        return null
    }

    return (
        <>
            <Column spacing={10}>
                <Headline
                    title={i18n._(t`Medewerker ${routeState.coworkerName}`)}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs>
                            <Breadcrumb text={i18n._(t`Beheer`)} to={routes.authorized.management.taalhuis.index} />
                        </Breadcrumbs>
                    }
                />
                <ManagementCoworkerFieldsContainer
                    defaultFieldValues={queryData}
                    loading={queryLoading}
                    error={!!queryError}
                />
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button
                        type={ButtonType.primary}
                        icon={IconType.send}
                        onClick={() =>
                            history.push({
                                pathname: routes.authorized.management.taalhuis.coworkers.detail.update,
                                state: routeState,
                            })
                        }
                    >
                        {i18n._(t`Bewerken`)}
                    </Button>
                }
            />
        </>
    )
}

export default CoworkerReadView
