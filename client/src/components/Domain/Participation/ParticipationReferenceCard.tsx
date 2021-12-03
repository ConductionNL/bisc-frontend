import { useLingui } from '@lingui/react'
import { Participation, ParticipationProviderOption } from 'api/types/types'
import Field from 'components/Core/Field/Field'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import DetailsInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import OfferInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/OfferInformationFieldset'
import ReferenceCardLinkedHeader from 'components/Participants/cards/ReferenceCard/Headers/ReferenceCardLinkedHeader'
import OngoingStatus from 'components/Participants/cards/ReferenceCard/Headers/Status/OngoingStatus'
import ReferenceCard from 'components/Participants/cards/ReferenceCard/ReferenceCard'
import { useHistory } from 'react-router'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { participationEndOptionsTranslations } from '../Groups/Translations/groupTranslations'

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

    const isCustomProvider = participation.providerOption === ParticipationProviderOption.Other
    const participationDetailPath = taalhuisRoutes.participants
        .detail(taalhuisParticipantId)
        .data.learningNeeds.detail(learningNeedId)
        .referrals.detail(participation.id)

    return (
        <ReferenceCard
            readOnly={isCustomProvider}
            onClickEditTopComponent={() => history.push(participationDetailPath.update)}
            TopComponent={
                <ReferenceCardLinkedHeader
                    StatusComponent={renderStatusInfo()}
                    InformationComponent={renderTopInfo()}
                    MoreInformationComponent={renderMoreInfo()}
                />
            }
            // BottomComponent={renderTestInfo()}
            // onClickEditBottomComponent={() => history.push(participationDetailPath.testResult.update)}
        />
    )

    function renderStatusInfo() {
        return (
            <OngoingStatus
                title={organizationName}
                supplierName={participation.provider?.name || participation.providerOther || ''}
                status={participation.status}
                noBackgroudColor={isCustomProvider}
            />
        )
    }

    function renderTopInfo() {
        let start, end
        if (isCustomProvider) {
            start = end = i18n._('n.v.t')
        } else {
            start = participation.start
            end = participation.end
        }

        return (
            <Column spacing={6}>
                <Column>
                    <Field label={i18n._('Startdatum')} horizontal={true}>
                        <Paragraph>{start}</Paragraph>
                    </Field>
                    <Field label={i18n._('Einddatum')} horizontal={true}>
                        <Paragraph>{end}</Paragraph>
                    </Field>
                </Column>
                <Column>
                    <Field label={i18n._('Deelnemer begonnen op')} horizontal={true}>
                        <Paragraph>{participation.startParticipation}</Paragraph>
                    </Field>
                    <Field label={i18n._('Deelnemer gestopt op')} horizontal={true}>
                        <Paragraph>{participation.endParticipation}</Paragraph>
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
                <OfferInformationFieldset hideSectionTitle={true} defaultValues={participation} readOnly={true} />
                <DetailsInformationFieldset
                    defaultValues={participation}
                    readOnly={true}
                    fieldControls={{ end: { hidden: true }, start: { hidden: true } }}
                    hideSectionTitle={true}
                />
            </Column>
        )
    }

    // function renderTestInfo() {
    //     return (
    //         <Section title={i18n._(t`Toetsresultaat`)}>
    //             <Column>
    //                 <Button
    //                     type={ButtonType.tertiary}
    //                     icon={IconType.add}
    //                     onClick={() =>
    //                         history.push(participationDetailPath.testResult.create)
    //                     }
    //                 >
    //                     {i18n._(t`Toetsresultaat toevoegen`)}
    //                 </Button>
    //             </Column>
    //         </Section>
    //     )
    // }
}
