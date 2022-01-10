import { useLingui } from '@lingui/react'
import { Participation, ParticipationProviderOption } from 'api/types/types'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import DetailsInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import OfferInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/OfferInformationFieldset'
import ReferenceCardLinkedHeader from 'components/Participants/cards/ReferenceCard/Headers/ReferenceCardLinkedHeader'
import OngoingStatus from 'components/Participants/cards/ReferenceCard/Headers/Status/OngoingStatus'
import ReferenceCard from 'components/Participants/cards/ReferenceCard/ReferenceCard'
import { useHistory } from 'react-router'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { participationEndOptionsTranslations } from '../Groups/Translations/groupTranslations'
import { ParticipantsLearningNeedReferenceTestFields } from '../Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import styles from './ParticipationReferenceCard.module.scss'

interface Props {
    participation: Participation
    taalhuisParticipantId: string
    learningNeedId: string
    organizationName: string
}

export function ParticipationReferenceCard(props: Props) {
    const { participation, taalhuisParticipantId, learningNeedId, organizationName } = props
    const history = useHistory()
    const { i18n } = useLingui()

    const isExternalProvider = participation.providerOption === ParticipationProviderOption.Provider
    const participationDetailPath = taalhuisRoutes.participants
        .detail(taalhuisParticipantId)
        .data.learningNeeds.detail(learningNeedId)
        .referrals.detail(participation.id)

    return (
        <ReferenceCard
            // readOnly={isExistingProvider} // TODO should be: only editable when status is not 'lopend'
            isExternalProvider={isExternalProvider}
            onClickEditTopComponent={() => history.push(participationDetailPath.update)}
            TopComponent={
                <ReferenceCardLinkedHeader
                    StatusComponent={renderStatusInfo()}
                    InformationComponent={renderTopInfo()}
                    MoreInformationComponent={renderMoreInfo()}
                />
            }
            BottomComponent={renderTestInfo()}
            onClickEditBottomComponent={
                participation.testResults?.id
                    ? () => history.push(participationDetailPath.testResult.update(participation.testResults!.id))
                    : undefined
            }
        />
    )

    function renderStatusInfo() {
        return (
            <OngoingStatus
                title={organizationName}
                supplierName={participation.provider?.name || participation.providerOther || ''}
                status={participation.status}
                noBackgroudColor={isExternalProvider}
            />
        )
    }

    function renderTopInfo() {
        let start, end
        if (isExternalProvider) {
            start = end = i18n._('n.v.t')
        } else {
            start = participation.start
            end = participation.end
        }

        return (
            <Column spacing={6}>
                <Column>
                    <Field label={i18n._('Startdatum')} horizontal={true}>
                        <Paragraph>{start && DateFormatters.formattedDate(start)}</Paragraph>
                    </Field>
                    <Field label={i18n._('Einddatum')} horizontal={true}>
                        <Paragraph>{end && DateFormatters.formattedDate(end)}</Paragraph>
                    </Field>
                </Column>
                <Column>
                    <Field label={i18n._('Deelnemer begonnen op')} horizontal={true}>
                        <Paragraph>
                            {participation.startParticipation &&
                                DateFormatters.formattedDate(participation.startParticipation)}
                        </Paragraph>
                    </Field>
                    <Field label={i18n._('Deelnemer gestopt op')} horizontal={true}>
                        <Paragraph>
                            {participation.endParticipation &&
                                DateFormatters.formattedDate(participation.endParticipation)}
                        </Paragraph>
                    </Field>
                    <Field label={i18n._('Reden gestopt')} horizontal={true}>
                        <Paragraph>
                            {participation.reasonEndParticipation &&
                                participationEndOptionsTranslations[participation.reasonEndParticipation]}
                        </Paragraph>
                    </Field>
                </Column>
            </Column>
        )
    }

    function renderMoreInfo() {
        return (
            <Column spacing={6}>
                <OfferInformationFieldset defaultValues={participation} readOnly={true} />
                <HorizontalRule dark={true} thin={true} />
                <DetailsInformationFieldset
                    defaultValues={participation}
                    readOnly={true}
                    fieldControls={{ end: { hidden: true }, start: { hidden: true } }}
                />
            </Column>
        )
    }

    function renderTestInfo() {
        if (participation.providerOption === ParticipationProviderOption.Provider) {
            // when participation is managed by a Provider,
            // dont allow test result management from this taalhuis
            return
        }

        if (!participation.testResults) {
            return (
                <Section title={i18n._('Toetsresultaat')} className={styles.addNewSection}>
                    <Field>
                        <Column>
                            <Button
                                type={ButtonType.tertiary}
                                icon={IconType.add}
                                onClick={() => history.push(participationDetailPath.testResult.create)}
                            >
                                {i18n._('Toetsresultaat toevoegen')}
                            </Button>
                        </Column>
                    </Field>
                </Section>
            )
        }

        return (
            <Section title={i18n._('Toetsresultaat')} className={styles.addNewSection}>
                <ParticipantsLearningNeedReferenceTestFields
                    defaultValues={participation.testResults}
                    readOnly={true}
                    hideTitle={true}
                    hideRule={true}
                />
            </Section>
        )
    }
}
