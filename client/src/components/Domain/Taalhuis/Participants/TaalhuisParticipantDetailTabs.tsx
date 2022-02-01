import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import get from 'lodash/get'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisParticipantsDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

export enum TaalhuisParticipantDetailTabsEnum {
    Intake = 'index',
    LearningNeeds = 'learningNeeds.index',
    Documents = 'documents',
    Files = 'dossier.index',
    Registration = 'registration',
    DownloadDetails = 'downloadDetails',
    Mentor = 'mentor.index',
}

interface Props {
    activeTabId: TaalhuisParticipantDetailTabsEnum
}

export const TaalhuisParticipantDetailTabs: React.FunctionComponent<Props> = props => {
    const { activeTabId } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()

    const basePath = taalhuisRoutes.participants.detail(taalhuisParticipantId).data
    const tabRoutes = Object.values(TaalhuisParticipantDetailTabsEnum).map(value => ({
        id: value,
        pathName: get(basePath, value),
    }))

    return (
        <TabSwitch activeTabId={activeTabId} onChange={handleTabSwitch}>
            <Tab label={i18n._(t`Intake`)} tabid={TaalhuisParticipantDetailTabsEnum.Intake} />
            <Tab label={i18n._(t`Aanmelding`)} tabid={TaalhuisParticipantDetailTabsEnum.Registration} />
            <Tab label={i18n._(t`Dossier`)} tabid={TaalhuisParticipantDetailTabsEnum.Files} />
            <Tab label={i18n._(t`Leervragen`)} tabid={TaalhuisParticipantDetailTabsEnum.LearningNeeds} />
            <Tab label={i18n._(t`Documenten`)} tabid={TaalhuisParticipantDetailTabsEnum.Documents} />
            <Tab label={i18n._(t`Begeleider`)} tabid={TaalhuisParticipantDetailTabsEnum.Mentor} />
            <Tab label={i18n._(t`Gegevens delen`)} tabid={TaalhuisParticipantDetailTabsEnum.DownloadDetails} />
        </TabSwitch>
    )

    function handleTabSwitch(tab: TabProps) {
        const tabRoute = tabRoutes.find(tabRoute => tabRoute.id === tab.tabid)
        if (!tabRoute) {
            return
        }

        history.push(tabRoute.pathName)
    }
}
