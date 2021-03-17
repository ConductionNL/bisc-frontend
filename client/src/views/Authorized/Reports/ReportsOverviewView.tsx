import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Headline, { SpacingType } from '../../../components/Chrome/Headline'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import { IconType } from '../../../components/Core/Icon/IconType'
import Row from '../../../components/Core/Layout/Row/Row'
import ReportCard from '../../../components/Reports/ReportCard'
import ReportsList from '../../../components/Reports/ReportsList'

interface Props {}

export const ReportsOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Taalhuizen`)} />
            <ReportsList>
                <ReportCard
                    title={i18n._(t`Deelnemers`)}
                    description={i18n._(
                        t`Download een CSV bestand van alle deelnemers van dit Taalhuis. Gefilterd per jaar of kwartaal.`
                    )}
                    ActionButton={<Button type={ButtonType.quaternary}>{i18n._(t`Deelnemers downloaden`)}</Button>}
                />
                <ReportCard
                    title={i18n._(t`Deelnemers`)}
                    description={i18n._(
                        t`Download een CSV bestand van alle deelnemers van dit Taalhuis. Gefilterd per jaar of kwartaal.`
                    )}
                    ActionButton={<Button type={ButtonType.quaternary}>{i18n._(t`Deelnemers downloaden`)}</Button>}
                />
                <ReportCard
                    title={i18n._(t`Deelnemers`)}
                    description={i18n._(
                        t`Download een CSV bestand van alle deelnemers van dit Taalhuis. Gefilterd per jaar of kwartaal.`
                    )}
                    ActionButton={<Button type={ButtonType.quaternary}>{i18n._(t`Deelnemers downloaden`)}</Button>}
                />
            </ReportsList>
        </>
    )
}
