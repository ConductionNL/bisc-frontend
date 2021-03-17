import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../components/Chrome/Headline'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import { useMockQuery } from '../../../../../../components/hooks/useMockQuery'
import { ParticipantDetailParams } from '../../../../../../routes/participants/types'
import { routes } from '../../../../../../routes/routes'
import { taalhuisParticipantsCreateResponse } from '../../../mocks/participants'

interface Props {}

interface Props {}

export const ParticipantsReadView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<ParticipantDetailParams>()
    const { data, loading, error } = useMockQuery(taalhuisParticipantsCreateResponse)

    if (!params.participantid) {
        return null
    }

    return (
        <>
            <Column spacing={10}>
                <Headline
                    title={i18n._(t`Deelnemer ${params.participantname}`)}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs>
                            <Breadcrumb
                                text={i18n._(t`Deelnemers`)}
                                to={routes.authorized.participants.taalhuis.participants.overview}
                            />
                        </Breadcrumbs>
                    }
                />
            </Column>
        </>
    )

    function renderSection() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (data) {
        }
    }
}
