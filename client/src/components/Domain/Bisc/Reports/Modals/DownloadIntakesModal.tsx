import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { LanguageHousesQuery, useDownloadDesiredLearningOutcomesReportMutation } from 'generated/graphql'
import React from 'react'
import { downloadBase64 } from 'utils/files/files'
import { Forms } from 'utils/forms'
import { TaalhuisPeriodFieldset, TaalhuisPeriodFieldsetFormModel } from '../Fieldsets/TaalhuisPeriodFieldset'

interface Props {
    onClose: () => void
    queryData?: LanguageHousesQuery
    hideTaalhuisSelect?: boolean
}

interface FormModel extends TaalhuisPeriodFieldsetFormModel {}

const DownloadParticipantsModalView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [downloadFile, { loading }] = useDownloadDesiredLearningOutcomesReportMutation()
    const { onClose, queryData, hideTaalhuisSelect } = props

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

                        <TaalhuisPeriodFieldset queryData={queryData} hideTaalhuisSelect={hideTaalhuisSelect} />
                    </Column>
                }
                BottomComponent={
                    <>
                        <Button type={ButtonType.secondary} disabled={loading} onClick={onClose}>
                            {i18n._(t`Annuleren`)}
                        </Button>
                        <Button type={ButtonType.primary} loading={loading} submit={true}>
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
        const response = await downloadFile({
            variables: {
                input: {
                    languageHouseId: formData.taalhuis,
                    dateFrom: formData.periodFrom && new Date(formData.periodFrom).toString(),
                    dateUntil: formData.periodTo && new Date(formData.periodTo).toString(),
                },
            },
        })

        if (response?.errors?.length || !response.data) {
            return
        }

        downloadBase64(
            response.data.downloadDesiredLearningOutcomesReport.base64data,
            response.data.downloadDesiredLearningOutcomesReport.filename
        )

        NotificationsManager.success(i18n._(t`download is begonnen`), '')
        onClose()
    }
}

export default DownloadParticipantsModalView
