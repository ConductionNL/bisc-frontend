import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
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
    const location = useLocation()

    // TEMP
    const username = 'Rick Woltheus'
    const environment = 'BISC OMGEVING'
    const accountType: MainNavigationType = MainNavigationType.taalhuis

    return (
        <AuthorizedContentLayout
            NavigationComponent={
                <MainNavigation
                    type={accountType}
                    TopComponent={
                        <MainNavigationEnvironmentCard
                            name={i18n._(t`Top`)}
                            environment={environment}
                            type={accountType}
                        />
                    }
                    ListComponent={getNavigationByType()}
                    BottomComponent={
                        <>
                            <MainNavigationItem
                                label={username}
                                icon={IconType.profile}
                                to={routes.authorized.profile}
                                active={location.pathname.includes(routes.authorized.profile)}
                                type={accountType}
                            />
                            <MainNavigationItem
                                label={i18n._(t`Uitloggen`)}
                                icon={IconType.logOut}
                                onClick={() => sessionContext.logout()}
                                type={accountType}
                            />
                        </>
                    }
                />
            }
        >
            {children}
        </AuthorizedContentLayout>
    )

    function getNavigationByType() {
        if (accountType === MainNavigationType.bisc) {
            return (
                <>
                    <MainNavigationItem
                        label={i18n._(t`Taalhuis`)}
                        icon={IconType.taalhuis}
                        active={location.pathname.includes(routes.authorized.taalhuis.index)}
                        to={routes.authorized.taalhuis.index}
                        type={MainNavigationType.bisc}
                    />
                    <MainNavigationItem
                        label={i18n._(t`Aanbieders`)}
                        icon={IconType.providers}
                        active={location.pathname.includes(routes.authorized.supplier.index)}
                        to={routes.authorized.supplier.index}
                        type={MainNavigationType.bisc}
                    />
                    <MainNavigationItem
                        label={i18n._(t`Rapportages`)}
                        icon={IconType.rapportage}
                        active={location.pathname.includes(routes.authorized.reports.index)}
                        to={routes.authorized.reports.index}
                        type={MainNavigationType.bisc}
                    />
                    <MainNavigationItem
                        label={i18n._(t`Beheer`)}
                        icon={IconType.settings}
                        active={location.pathname.includes(routes.authorized.management.bisc.index)}
                        to={routes.authorized.management.bisc.index}
                        type={MainNavigationType.bisc}
                    />

                    {/* dev only */}
                    {process.env.NODE_ENV === 'development' && (
                        <>
                            <MainNavigationItem
                                label="Kitchensink"
                                icon={IconType.biscLogo}
                                active={location.pathname === routes.authorized.kitchensink}
                                to={routes.authorized.kitchensink}
                                type={MainNavigationType.bisc}
                            />
                            <MainNavigationItem
                                label="Lingui example"
                                icon={IconType.biscLogo}
                                active={location.pathname === routes.authorized.translationsExample}
                                to={routes.authorized.translationsExample}
                                type={MainNavigationType.bisc}
                            />
                            <MainNavigationItem
                                label={i18n._(t`Taalhuizen`)}
                                icon={IconType.taalhuis}
                                to={routes.authorized.taalhuis.overview}
                                type={MainNavigationType.bisc}
                            />
                        </>
                    )}
                </>
            )
        }

        return (
            <>
                <MainNavigationItem
                    label={i18n._(t`Deelnemers`)}
                    icon={IconType.taalhuis}
                    active={location.pathname.includes(routes.authorized.taalhuis.index)}
                    to={routes.authorized.taalhuis.index}
                    type={MainNavigationType.taalhuis}
                />
                <MainNavigationItem
                    label={i18n._(t`Beheer`)}
                    icon={IconType.settings}
                    active={location.pathname.includes(routes.authorized.management.taalhuis.index)}
                    to={routes.authorized.management.taalhuis.index}
                    type={MainNavigationType.taalhuis}
                />
                {/* dev only */}
                {process.env.NODE_ENV === 'development' && (
                    <>
                        <MainNavigationItem
                            label="Kitchensink"
                            icon={IconType.biscLogo}
                            active={location.pathname === routes.authorized.kitchensink}
                            to={routes.authorized.kitchensink}
                            type={MainNavigationType.taalhuis}
                        />
                        <MainNavigationItem
                            label="Lingui example"
                            icon={IconType.biscLogo}
                            active={location.pathname === routes.authorized.translationsExample}
                            to={routes.authorized.translationsExample}
                            type={MainNavigationType.taalhuis}
                        />
                        <MainNavigationItem
                            label={i18n._(t`Taalhuizen`)}
                            icon={IconType.taalhuis}
                            to={routes.authorized.taalhuis.overview}
                            type={MainNavigationType.taalhuis}
                        />
                    </>
                )}
            </>
        )
    }
}

export default AppChrome
