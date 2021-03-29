import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Field from 'components/Core/Field/Field'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { TaalhuisParticipantLearningNeedFields } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'
import ReferenceCardLinkedHeader from 'components/Participants/cards/ReferenceCard/Headers/ReferenceCardLinkedHeader'
import OngoingStatus from 'components/Participants/cards/ReferenceCard/Headers/Status/OngoingStatus'
import ReferenceCard from 'components/Participants/cards/ReferenceCard/ReferenceCard'
import { ReferenceStatusLabelStatus } from 'components/Participants/components/ReferenceStatusLabel'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
// import { useMockQuery } from 'components/hooks/useMockQuery'
import { learningNeedsStatusMockResponse } from '../mocks/learningNeeds'

interface Props {}

export const ParticipantsLearningNeedReadView: React.FC<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error } = useMockQuery(learningNeedsStatusMockResponse)

    return (
        <>
            <Column spacing={4}>
                <Headline
                    title={i18n._(t`Nieuwe leervraag`)}
                    subtitle={'Met computers leren werken'}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs>
                            <Breadcrumb
                                text={i18n._(t`Deelnemers`)}
                                to={routes.authorized.participants.taalhuis.participants.overview}
                            />
                            <Breadcrumb
                                text={i18n._(t`Leervragen`)}
                                to={routes.authorized.participants.taalhuis.participants.detail.goals.overview}
                            />
                        </Breadcrumbs>
                    }
                />
                <Row justifyContent="flex-end">
                    <Button icon={IconType.send} onClick={undefined}>
                        {i18n._(t`Verwijzen naar`)}
                    </Button>
                </Row>
                {renderSection()}
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
            return (
                <>
                    <TaalhuisParticipantLearningNeedFields readOnly={true} learningNeed={data} />
                    <SectionTitle title={i18n._(t`Verwijzingen`)} heading={'H3'} />
                    <ReferenceCard
                        TopComponent={
                            <ReferenceCardLinkedHeader
                                StatusComponent={
                                    <OngoingStatus
                                        title={'Klik & Tik'}
                                        supplierName={'Bibliotheek X'}
                                        status={ReferenceStatusLabelStatus.Ongoing}
                                    />
                                }
                                InformationComponent={
                                    <>
                                        <Column spacing={6}>
                                            <Column>
                                                <Field label={i18n._(t`Startdatum`)} horizontal={true}>
                                                    <Paragraph>{'n.v.t.'}</Paragraph>
                                                </Field>
                                                <Field label={i18n._(t`Einddatum`)} horizontal={true}>
                                                    <Paragraph>{'n.v.t.'}</Paragraph>
                                                </Field>
                                            </Column>
                                            <Column>
                                                <Field label={i18n._(t`Deelnemer begonnen op`)} horizontal={true}>
                                                    <Paragraph>{'-'}</Paragraph>
                                                </Field>
                                                <Field label={i18n._(t`Deelnemer gestopt op`)} horizontal={true}>
                                                    <Paragraph>{'-'}</Paragraph>
                                                </Field>
                                                <Field label={i18n._(t`Reden gestopt`)} horizontal={true}>
                                                    <Paragraph>{'-'}</Paragraph>
                                                </Field>
                                            </Column>
                                        </Column>
                                    </>
                                }
                            />
                        }
                    />
                    <Space pushTop={true} />
                    <Actionbar
                        RightComponent={
                            <Button
                                type={ButtonType.primary}
                                icon={IconType.send}
                                onClick={() =>
                                    history.push(
                                        routes.authorized.participants.taalhuis.participants.detail.goals.update
                                    )
                                }
                            >
                                {i18n._(t`Leervraag aanpassen`)}
                            </Button>
                        }
                    />
                </>
            )
        }
    }
}
function useMockQuery(learningNeedsStatusResponse: any): { data: any; loading: any; error: any } {
    throw new Error('Function not implemented.')
}

function learningNeedsStatusResponse(learningNeedsStatusResponse: any): { data: any; loading: any; error: any } {
    throw new Error('Function not implemented.')
}
