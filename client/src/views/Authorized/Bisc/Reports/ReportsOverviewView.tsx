import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Modal from 'components/Core/Modal/Modal'
import DownloadIntakesModalView from 'components/Domain/Bisc/Reports/Modals/DownloadIntakesModal'
import DownloadParticipantsModalView from 'components/Domain/Bisc/Reports/Modals/DownloadParticipantsModal'
import DownloadVolunteersModalView from 'components/Domain/Bisc/Reports/Modals/DownloadVolunteersModal'
import ReportCard, { ReportCardBackgroundType } from 'components/Reports/ReportCard'
import ReportsList from 'components/Reports/ReportsList'
import { useLanguageHousesQuery, useProvidersQuery } from 'generated/graphql'
import React, { useState } from 'react'

interface Props {}

export const ReportsOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const [volunteersIsOpen, setVolunteersIsOpen] = useState(false)
    const [participantsIsOpen, setParticipantsIsOpen] = useState(false)
    const [intakesIsOpen, setIntakesIsOpen] = useState(false)
    const { data: languageHouses, loading: languageHouseLoading, error: languageHouseError } = useLanguageHousesQuery()
    const { data: providers, loading: providersLoading, error: providersError } = useProvidersQuery()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Rapportages`)} />
            {renderList()}
        </>
    )

    function renderList() {
        if (languageHouseLoading || providersLoading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (languageHouseError || providersError || !languageHouses || !providers) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

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
                    <ReportCard
                        backgroundType={ReportCardBackgroundType.red}
                        title={i18n._(t`Intakes`)}
                        description={i18n._(
                            t`Download een CSV bestand van alle intakes van dit Taalhuis. Gefilterd per jaar of kwartaal.`
                        )}
                        ActionButton={
                            <Button
                                icon={IconType.download}
                                type={ButtonType.quaternary}
                                onClick={() => setIntakesIsOpen(true)}
                            >
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
                            <Button
                                icon={IconType.download}
                                type={ButtonType.quaternary}
                                onClick={() => setVolunteersIsOpen(true)}
                            >
                                {i18n._(t`Vrijwilligers downloaden`)}
                            </Button>
                        }
                    />
                </ReportsList>
                <Modal isOpen={participantsIsOpen} onRequestClose={() => setParticipantsIsOpen(false)}>
                    <DownloadParticipantsModalView
                        onClose={() => setParticipantsIsOpen(false)}
                        queryData={languageHouses}
                    />
                </Modal>
                <Modal isOpen={intakesIsOpen} onRequestClose={() => setIntakesIsOpen(false)}>
                    <DownloadIntakesModalView queryData={languageHouses} onClose={() => setIntakesIsOpen(false)} />
                </Modal>
                <Modal isOpen={volunteersIsOpen} onRequestClose={() => setVolunteersIsOpen(false)}>
                    <DownloadVolunteersModalView onClose={() => setVolunteersIsOpen(false)} queryData={providers} />
                </Modal>
            </>
        )
    }
}
