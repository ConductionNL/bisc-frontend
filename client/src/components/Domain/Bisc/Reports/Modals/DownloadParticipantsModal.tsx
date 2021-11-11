import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetStudentsReport } from 'api/student/student'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { useEffect } from 'react'
import { downloadFile } from 'utils/downloadFile'
import { downloadBase64 } from 'utils/files/files'
import { Forms } from 'utils/forms'
import { TaalhuisPeriodFieldset, TaalhuisPeriodFieldsetFormModel } from '../Fieldsets/TaalhuisPeriodFieldset'

interface Props {
    onClose: () => void
    hideTaalhuisSelect?: boolean
}

interface FormModel extends TaalhuisPeriodFieldsetFormModel {}

const DownloadParticipantsModalView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { onClose, hideTaalhuisSelect } = props

    const { response: reportResponse, loading: reportLoading, fetchReport } = useGetStudentsReport()

    useEffect(() => {
        if (reportResponse) {
            downloadFile(reportResponse, 'students.csv')
            NotificationsManager.success(i18n._(t`Rapportage gegenereerd`))
            onClose()
        }
    }, [reportResponse])

    return (
        <Form onSubmit={handleDownload}>
            <ModalView
                onClose={onClose}
                ContentComponent={
                    <Column spacing={6}>
                        <SectionTitle title={i18n._(t`Gegevens deelnemers downloaden`)} heading="H4" />
                        <Paragraph>
                            {i18n._(t`
                                Download een CSV bestand van alle deelnemers van dit Taalhuis. Gefilterd per jaar of kwartaal.`)}
                        </Paragraph>

                        <TaalhuisPeriodFieldset hideTaalhuisSelect={hideTaalhuisSelect} />
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

    function handleDownload(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const periodFrom = formData.periodFrom && new Date(formData.periodFrom)
        const periodTo = formData.periodTo && new Date(formData.periodTo)

        if (periodFrom && periodTo) {
            fetchReport(periodFrom, periodTo)
        } else {
            NotificationsManager.error(
                i18n._(t`Controleer het formulier`),
                i18n._(t`Vul alle benodigde gegevens in om de rapportage te downloaden`)
            )
        }
    }
}

export default DownloadParticipantsModalView
