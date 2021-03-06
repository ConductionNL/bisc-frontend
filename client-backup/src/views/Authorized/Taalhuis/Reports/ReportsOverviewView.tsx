import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import DownloadParticipantsModalView from 'components/Domain/Bisc/Reports/Modals/DownloadParticipantsModal'
import ReportCard, { ReportCardBackgroundType } from 'components/Reports/ReportCard'
import ReportsList from 'components/Reports/ReportsList'
import React, { useState } from 'react'

interface Props {}

export const ReportsOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const [participantsIsOpen, setParticipantsIsOpen] = useState(false)

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Rapportages`)} />
            {renderList()}
        </>
    )

    function renderList() {
        return (
            <>
                <ReportsList>
                    <ReportCard
                        backgroundType={ReportCardBackgroundType.blue}
                        title={i18n._(t`Deelnemers`)}
                        description={i18n._(
                            t`Download een CSV bestand van alle deelnemers van dit Taalhuis. Gefilterd per jaar of kwartaal.`
                        )}
                        ActionButton={
                            <Button
                                icon={IconType.download}
                                type={ButtonType.quaternary}
                                onClick={() => setParticipantsIsOpen(true)}
                            >
                                {i18n._(t`Deelnemers downloaden`)}
                            </Button>
                        }
                    />
                </ReportsList>
                <Modal isOpen={participantsIsOpen} onRequestClose={() => setParticipantsIsOpen(false)}>
                    <DownloadParticipantsModalView
                        onClose={() => setParticipantsIsOpen(false)}
                        hideTaalhuisSelect={true}
                    />
                </Modal>
            </>
        )
    }
}
