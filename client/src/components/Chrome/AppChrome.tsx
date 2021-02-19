import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext } from 'react'
import { routes } from '../../routes'
import { IconType } from '../Core/Icon/IconType'
import MainNavigation from '../Core/Navigation/MainNavigation/MainNavigation'
import MainNavigationEnvironmentCard from '../Core/Navigation/MainNavigation/MainNavigationEnvironmentCard'
import MainNavigationItem from '../Core/Navigation/MainNavigation/MainNavigationItem'
import { MainNavigationType } from '../Core/Navigation/MainNavigation/types'
import AuthorizedContentLayout from '../Core/PageLayout/AuthorizedContentLayout'
import { SessionContext } from '../Providers/SessionProvider/context'

interface Props {}

const AppChrome: React.FunctionComponent<Props> = props => {
    const { children } = props
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)

    // TEMP
    const username = 'Rick Woltheus'
    const environment = 'BISC OMGEVING'

    return (
        <AuthorizedContentLayout
            NavigationComponent={
                <MainNavigation
                    type={MainNavigationType.bisc}
                    TopComponent={
                        <MainNavigationEnvironmentCard
                            name={i18n._(t`Top`)}
                            environment={environment}
                            type={MainNavigationType.bisc}
                        />
                    }
                    ListComponent={
                        <>
                            <MainNavigationItem
                                label={i18n._(t`Taalhuizen`)}
                                icon={IconType.taalhuis}
                                to={routes.authorized.taalhuis}
                                type={MainNavigationType.bisc}
                            />
                            <MainNavigationItem
                                label={i18n._(t`Deelnemers`)}
                                icon={IconType.taalhuis}
                                to={routes.authorized.index}
                                type={MainNavigationType.bisc}
                            />
                            <MainNavigationItem
                                label={i18n._(t`Aanbieders`)}
                                icon={IconType.providers}
                                active={true}
                                to={routes.authorized.programs}
                                type={MainNavigationType.bisc}
                            />
                            <MainNavigationItem
                                label={i18n._(t`Rapportages`)}
                                icon={IconType.rapportage}
                                to={routes.authorized.addPersonToProgram}
                                type={MainNavigationType.bisc}
                            />
                            <MainNavigationItem
                                label={i18n._(t`Beheer`)}
                                icon={IconType.settings}
                                to={routes.authorized.kitchensink}
                                type={MainNavigationType.bisc}
                            />

                            {/* dev only */}
                            {process.env.NODE_ENV === 'development' && (
                                <>
                                    <MainNavigationItem
                                        label="Kitchensink"
                                        icon={IconType.biscLogo}
                                        to={routes.authorized.kitchensink}
                                        type={MainNavigationType.bisc}
                                    />
                                    <MainNavigationItem
                                        label="Lingui example"
                                        icon={IconType.biscLogo}
                                        to={routes.authorized.translationsExample}
                                        type={MainNavigationType.bisc}
                                    />
                                </>
                            )}
                        </>
                    }
                    BottomComponent={
                        <>
                            <MainNavigationItem
                                label={username}
                                icon={IconType.profile}
                                to={routes.authorized.profile}
                                type={MainNavigationType.bisc}
                            />
                            <MainNavigationItem
                                label={i18n._(t`Uitloggen`)}
                                icon={IconType.logOut}
                                onClick={() => sessionContext.logout()}
                                type={MainNavigationType.bisc}
                            />
                        </>
                    }
                />
            }
        >
            {children}
        </AuthorizedContentLayout>
    )
}

export default AppChrome
