import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetLearningNeedsReport } from 'api/learningNeed/learningNeed'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { useEffect } from 'react'
import { downloadFile } from 'utils/downloadFile'
import { Forms } from 'utils/forms'
import { TaalhuisPeriodFieldset, TaalhuisPeriodFieldsetFormModel } from '../Fieldsets/TaalhuisPeriodFieldset'

interface Props {
    onClose: () => void
    organizationId?: string
}

interface FormModel extends TaalhuisPeriodFieldsetFormModel {}

export const DownloadLearningNeedsModalView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { onClose, organizationId } = props

    const { response: reportResponse, loading: reportLoading, fetchReport } = useGetLearningNeedsReport()

    useEffect(() => {
        if (reportResponse) {
            downloadFile(reportResponse, 'leervragen.csv')
            onClose()
        }
    }, [reportResponse])

    return (
        <Form onSubmit={handleDownload}>
            <ModalView
                onClose={onClose}
                ContentComponent={
                    <Column spacing={6}>
                        <SectionTitle title={i18n._(t`Gegevens leervragen downloaden`)} heading="H4" />
                        <Paragraph>
                            {i18n._(t`
                                Download een CSV bestand van alle leervragen van de deelnemers van dit Taalhuis. Gefilterd op periode naar keuze.`)}
                        </Paragraph>

                        <TaalhuisPeriodFieldset showTaalhuisSelect={!organizationId} />
                        <br />
                        <br />
                        <br />
                        <br />
                        {/** TECH DEBT: making room for dropdown that would otherwise be cut off due to scrollable modal */}
                    </Column>
                }
                BottomComponent={
                    <>
                        <Button type={ButtonType.secondary} disabled={reportLoading} onClick={onClose}>
                            {i18n._(t`Annuleren`)}
                        </Button>
                        <Button type={ButtonType.primary} loading={reportLoading} submit={true}>
                            {i18n._(t`Gegevens downloaden`)}
                        </Button>
                    </>
                }
            />
        </Form>
    )

    async function handleDownload(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const organization = organizationId || formData.organization
        const periodFrom = formData.periodFrom && new Date(formData.periodFrom)
        const periodTo = formData.periodTo && new Date(formData.periodTo)

        if (!organization) {
            NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Selecteer een Taalhuis`))
            return
        }

        if (!periodFrom || !periodTo) {
            NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Selecteer een periode`))
            return
        }

        try {
            await fetchReport(periodFrom, periodTo, organization)

            NotificationsManager.success(i18n._(t`Rapportage wordt gedownload`))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
