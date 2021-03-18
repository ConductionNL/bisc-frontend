import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import Headline, { SpacingType } from '../../../components/Chrome/Headline'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import Modal from '../../../components/Core/Modal/Modal'
import ReportCard, { ReportCardBackgroundType } from '../../../components/Reports/ReportCard'
import ReportsList from '../../../components/Reports/ReportsList'
import DownloadIntakesModalView from './Modals/DownloadIntakesModal'
import DownloadParticipantsModalView from './Modals/DownloadParticipantsModal'
import DownloadVolunteersModalView from './Modals/DownloadVolunteersModal'

interface Props {}

export const ReportsOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const [volunteersIsOpen, setVolunteersIsOpen] = useState(false)
    const [participantsIsOpen, setParticipantsIsOpen] = useState(false)
    const [intakesIsOpen, setIntakesIsOpen] = useState(false)

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Taalhuizen`)} />
            <ReportsList>
                <ReportCard
                    backgroundType={ReportCardBackgroundType.blue}
                    title={i18n._(t`Deelnemers`)}
                    description={i18n._(
                        t`Download een CSV bestand van alle deelnemers van dit Taalhuis. Gefilterd per jaar of kwartaal.`
                    )}
                    ActionButton={
                        <Button type={ButtonType.quaternary} onClick={() => setParticipantsIsOpen(true)}>
                            {i18n._(t`Deelnemers downloaden`)}
                        </Button>
                    }
                />
                <ReportCard
                    backgroundType={ReportCardBackgroundType.red}
                    title={i18n._(t`Intakes`)}
                    description={i18n._(
                        t`Download een CSV bestand van alle intakes van dit Taalhuis. Gefilterd per jaar of kwartaal.`
                    )}
                    ActionButton={
                        <Button type={ButtonType.quaternary} onClick={() => setIntakesIsOpen(true)}>
                            {i18n._(t`Intakes downloaden`)}
                        </Button>
                    }
                />
                <ReportCard
                    backgroundType={ReportCardBackgroundType.orange}
                    title={i18n._(t`Vrijwilligers`)}
                    description={i18n._(
                        t`Download een CSV bestand van alle vrijwilligers van dit Taalhuis. Gefilterd per jaar of kwartaal.`
                    )}
                    ActionButton={
                        <Button type={ButtonType.quaternary} onClick={() => setVolunteersIsOpen(true)}>
                            {i18n._(t`Vrijwilligers downloaden`)}
                        </Button>
                    }
                />
            </ReportsList>
            <Modal isOpen={participantsIsOpen} onRequestClose={() => setParticipantsIsOpen(false)}>
                <DownloadParticipantsModalView onClose={() => setParticipantsIsOpen(false)} />
            </Modal>
            <Modal isOpen={intakesIsOpen} onRequestClose={() => setIntakesIsOpen(false)}>
                <DownloadIntakesModalView onClose={() => setIntakesIsOpen(false)} />
            </Modal>
            <Modal isOpen={volunteersIsOpen} onRequestClose={() => setVolunteersIsOpen(false)}>
                <DownloadVolunteersModalView onClose={() => setVolunteersIsOpen(false)} />
            </Modal>
        </>
    )
}
