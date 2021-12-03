import { useLingui } from '@lingui/react'
import { Participation } from 'api/types/types'
import Field from 'components/Core/Field/Field'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import ReferenceCardLinkedHeader from 'components/Participants/cards/ReferenceCard/Headers/ReferenceCardLinkedHeader'
import OngoingStatus from 'components/Participants/cards/ReferenceCard/Headers/Status/OngoingStatus'
import ReferenceCard from 'components/Participants/cards/ReferenceCard/ReferenceCard'
import { useHistory } from 'react-router'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

interface Props {
    participation: Participation
    taalhuisParticipantId: string
    learningNeedId: string
}

export function ParticipationReferenceCard(props: Props) {
    const { participation, taalhuisParticipantId, learningNeedId } = props
    const history = useHistory()
    const { i18n } = useLingui()

    const baseLearningNeedsPath = taalhuisRoutes.participants
        .detail(taalhuisParticipantId)
        .data.learningNeeds.detail(learningNeedId)

    return (
        <ReferenceCard
            onClickEditTopComponent={() =>
                history.push(baseLearningNeedsPath.referrals.detail(participation.id).update)
            }
            TopComponent={
                <ReferenceCardLinkedHeader
                    StatusComponent={
                        <OngoingStatus
                            title={''} // TODO: ??
                            supplierName={participation.provider?.name || participation.providerOther || ''}
                            status={participation.status}
                        />
                    }
                    InformationComponent={
                        <Column spacing={6}>
                            <Column>
                                <Field label={i18n._('Startdatum')} horizontal={true}>
                                    <Paragraph>{participation.start}</Paragraph>
                                </Field>
                                <Field label={i18n._('Einddatum')} horizontal={true}>
                                    <Paragraph>{participation.end}</Paragraph>
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
                                    <Paragraph>{participation.reasonEndParticipation}</Paragraph>
                                </Field>
                            </Column>
                        </Column>
                    }
                />
            }
            // onClickEditBottomComponent={() => history.push(baseLearningNeedsPath.referrals.detail(participation.id).testResult.update)}
            // BottomComponent={
            //     <Section title={i18n._(t`Toetsresultaat`)}>
            //         <Column>
            //             <Button
            //                 type={ButtonType.tertiary}
            //                 icon={IconType.add}
            //                 onClick={() => history.push(baseLearningNeedsPath.referrals.detail(participation.id).testResult.create)}
            //             >
            //                 {i18n._(t`Toetsresultaat toevoegen`)}
            //             </Button>
            //         </Column>
            //     </Section>
            // }
        />
    )
}
