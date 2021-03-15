import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import AdressInformationFieldset from '../../../../../../components/fieldsets/shared/AdressInformationFieldset'
import NameInformationFieldset from '../../../../../../components/fieldsets/shared/NameInformationFieldset'
import { useMockQuery } from '../../../../../../components/hooks/useMockQuery'
import { ParticipantDetailParams } from '../../../../../../routes/participants/types'
import { routes } from '../../../../../../routes/routes'
import { ParticipantsMock, taalhuisParticipantsCreateResponse } from '../../../mocks/participants'

interface Props {}

interface Props {}

export const ParticipantsReadView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<ParticipantDetailParams>()

    const { loading, error, data } = useMockQuery<ParticipantsMock, {}>(taalhuisParticipantsCreateResponse, false)

    return (
        <>
            <Headline
                title={`${params.participantname}`}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb
                            text={i18n._(t`Deelnemers`)}
                            to={routes.authorized.participants.taalhuis.participants.index}
                        />
                        {/* <Breadcrumb text={params.participantname} to={routes.authorized.supplier.overview} /> */}
                    </Breadcrumbs>
                }
                spacingType={SpacingType.small}
            />
            <Column spacing={10}>{renderForm()}</Column>
        </>
    )

    function renderForm() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <>
                <NameInformationFieldset
                    prefillData={{
                        firstname: 'Esra',
                        insertion: 'Oz',
                        lastname: 'Öskan',
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <AdressInformationFieldset
                    prefillData={{
                        street: 'Parkstraat',
                        streetNo: '22 A',
                        postalCode: '3533 AF',
                        city: 'Utrecht',
                    }}
                    readOnly={true}
                />

                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button icon={IconType.delete} type={ButtonType.secondary} onClick={undefined}>
                                {i18n._(t`Aanmelding verwijderen`)}
                            </Button>
                            <Button icon={IconType.checkmark} type={ButtonType.primary} onClick={undefined}>
                                {i18n._(t`Aanmelding accepteren`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }
}
