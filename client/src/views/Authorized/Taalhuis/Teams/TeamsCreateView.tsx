import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'

export const TeamsCreateView = () => {
    const { i18n } = useLingui()

    return (
        <>
            <Headline
                title={i18n._(`Nieuwe team`)}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.teams.overview]} />}
            />
            TODO
        </>
    )
}
