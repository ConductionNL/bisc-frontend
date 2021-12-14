import { useLingui } from '@lingui/react'
import React from 'react'
import { t } from '@lingui/macro'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import {
    TaalhuisParticipantDetailTabs,
    TaalhuisParticipantDetailTabsEnum,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import { FilesEventsContextProvider } from 'components/Domain/Files/Fieldsets/Context/FilesEventsFieldsetContextState'
import { FilesEventsDetailFormContainer } from 'components/Domain/Files/FormContainer/FilesEventsDetailFormContainer'
import { useParams } from 'react-router'
import { TaalhuisParticipantsDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'
import { useGetContactMoments } from 'api/contactMoment/contactMoment'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'

export const ParticipantsFilesView: React.FC = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { i18n } = useLingui()

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetContactMoments(taalhuisParticipantId)}>
            {data => (
                <FilesEventsContextProvider>
                    <Headline
                        title={i18n._(t`Dossier`)}
                        spacingType={SpacingType.small}
                        TopComponent={
                            <Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />
                        }
                    />
                    <TaalhuisParticipantDetailTabs activeTabId={TaalhuisParticipantDetailTabsEnum.Files} />
                    <FilesEventsDetailFormContainer data={data.results} />
                </FilesEventsContextProvider>
            )}
        </PageQuery>
    )
}
