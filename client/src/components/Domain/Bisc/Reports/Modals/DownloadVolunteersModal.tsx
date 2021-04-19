import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { TaalhuizenQuery } from 'generated/graphql'
import { useMockMutation } from 'hooks/UseMockMutation'
import React from 'react'
import { Forms } from 'utils/forms'
import { TaalhuisPeriodFieldset, TaalhuisPeriodFieldsetFormModel } from '../Fieldsets/TaalhuisPeriodFieldset'

interface Props {
    onClose: () => void
    queryData: TaalhuizenQuery
    hideTaalhuisSelect?: boolean
}

interface FormModel extends TaalhuisPeriodFieldsetFormModel {}

const DownloadVolunteersModalView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [downloadFile, { loading }] = useMockMutation('download-link')
    const { onClose, hideTaalhuisSelect, queryData } = props

    return (
        <Form onSubmit={handleDownload}>
            <ModalView
                onClose={onClose}
                ContentComponent={
                    <Column spacing={6}>
                        <SectionTitle title={i18n._(t`Gegevens vrijwilligers downloaden`)} heading="H4" />
                        <Paragraph>
                            {i18n._(t`
                                Download een CSV bestand van alle vrijwilligers van dit Taalhuis. Gefilterd per jaar of kwartaal.`)}
                        </Paragraph>

                        <TaalhuisPeriodFieldset queryData={queryData} hideTaalhuisSelect={hideTaalhuisSelect} />
                    </Column>
                }
                BottomComponent={
                    <>
                        <Button type={ButtonType.secondary} onClick={onClose}>
                            {i18n._(t`Annuleren`)}
                        </Button>
                        <Button type={ButtonType.primary} loading={loading}>
                            {i18n._(t`Gegevens downloaden`)}
                        </Button>
                    </>
                }
            />
        </Form>
    )

    async function handleDownload(e: React.FormEvent<HTMLFormElement>) {
        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await downloadFile({
            period: formData.taalhuis,
            periodFrom: formData.periodFrom,
            periodTo: formData.periodTo,
        })

        if (response?.errors?.length) {
            return
        }

        NotificationsManager.success(i18n._(t`download is begonnen`), '')
        onClose()
    }
}

export default DownloadVolunteersModalView
