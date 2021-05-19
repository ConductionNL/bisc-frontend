import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { UserEnvironmentEnum } from 'components/Providers/UserProvider/types'
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { routes } from '../../routes/routes'
import HorizontalRule from '../Core/HorizontalRule/HorizontalRule'
import { IconType } from '../Core/Icon/IconType'
import MainNavigation from '../Core/Navigation/MainNavigation/MainNavigation'
import MainNavigationEnvironmentCard from '../Core/Navigation/MainNavigation/MainNavigationEnvironmentCard'
import MainNavigationItem from '../Core/Navigation/MainNavigation/MainNavigationItem'
import AuthorizedContentLayout from '../Core/PageLayout/AuthorizedContentLayout'
import { SessionContext } from '../Providers/SessionProvider/context'
import { UserContext } from '../Providers/UserProvider/context'

interface Props {}

const AppChrome: React.FunctionComponent<Props> = props => {
    const { children } = props
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const { user } = useContext(UserContext)
    const location = useLocation()

    if (!user) {
        return null
    }

    return (
        <AuthorizedContentLayout
            NavigationComponent={
                <MainNavigation
                    type={user.userEnvironment}
                    TopComponent={
                        <MainNavigationEnvironmentCard
                            name={i18n._(t`TOP`)}
                            environment={user.userEnvironment}
                            type={user.userEnvironment}
                        />
                    }
                    ListComponent={getNavigationByType()}
                    BottomComponent={
                        <>
                            <MainNavigationItem
                                label={user.username ?? ''}
                                icon={IconType.profile}
                                to={routes.authorized.profile}
                                active={isActive(routes.authorized.profile)}
                                type={user.userEnvironment}
                            />
                            <MainNavigationItem
                                label={i18n._(t`Uitloggen`)}
                                icon={IconType.logOut}
                                onClick={() => sessionContext.logout()}
                                type={user.userEnvironment}
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
        if (!user) {
            return null
        }

        if (user.userEnvironment === UserEnvironmentEnum.Bisc) {
            return renderBiscNavigation()
        }

        if (user.userEnvironment === UserEnvironmentEnum.Aanbieder) {
            return renderAanbiederNavigation()
        }

        if (user.userEnvironment === UserEnvironmentEnum.Taalhuis) {
            return renderTaalhuisNavigation()
        }

        return null
    }

    function renderBiscNavigation() {
        return (
            <>
                <MainNavigationItem
                    label={i18n._(t`Taalhuis`)}
                    icon={IconType.taalhuis}
                    active={isActive(routes.authorized.bisc.taalhuizen.index)}
                    to={routes.authorized.bisc.taalhuizen.index}
                    type={UserEnvironmentEnum.Bisc}
                />
                <MainNavigationItem
                    label={i18n._(t`Aanbieders`)}
                    icon={IconType.providers}
                    active={isActive(routes.authorized.bisc.suppliers.index)}
                    to={routes.authorized.bisc.suppliers.index}
                    type={UserEnvironmentEnum.Bisc}
                />
                <MainNavigationItem
                    label={i18n._(t`Rapportages`)}
                    icon={IconType.rapportage}
                    active={isActive(routes.authorized.bisc.reports.index)}
                    to={routes.authorized.bisc.reports.index}
                    type={UserEnvironmentEnum.Bisc}
                />
                <MainNavigationItem
                    label={i18n._(t`Beheer`)}
                    icon={IconType.settings}
                    active={isActive(routes.authorized.bisc.management.index)}
                    to={routes.authorized.bisc.management.index}
                    type={UserEnvironmentEnum.Bisc}
                />

                {renderDev()}
            </>
        )
    }

    function renderTaalhuisNavigation() {
        return (
            <>
                <MainNavigationItem
                    label={i18n._(t`Deelnemers`)}
                    icon={IconType.taalhuis}
                    active={isActive(taalhuisRoutes.participants.index)}
                    to={taalhuisRoutes.participants.index}
                    type={UserEnvironmentEnum.Taalhuis}
                />
                <MainNavigationItem
                    label={i18n._(t`Rapportages`)}
                    icon={IconType.rapportage}
                    active={isActive(taalhuisRoutes.reports.index)}
                    to={taalhuisRoutes.reports.index}
                    type={UserEnvironmentEnum.Taalhuis}
                />
                <MainNavigationItem
                    label={i18n._(t`Beheer`)}
                    icon={IconType.settings}
                    active={isActive(taalhuisRoutes.management.index)}
                    to={taalhuisRoutes.management.index}
                    type={UserEnvironmentEnum.Taalhuis}
                />
                {/* {renderDev()} */}
            </>
        )
    }

    function renderAanbiederNavigation() {
        return (
            <>
                {/* <MainNavigationItem
                    label={i18n._(t`Deelnemers`)}
                    icon={IconType.taalhuis}
                    active={isActive(routes.authorized.supplier.participants.index)}
                    to={routes.authorized.supplier.participants.index}
                    type={UserEnvironmentEnum.Aanbieder}
                />
                <MainNavigationItem
                    label={i18n._(t`Groepen`)}
                    icon={IconType.group}
                    active={isActive(routes.authorized.supplier.groups.index)}
                    to={routes.authorized.supplier.groups.index}
                    type={UserEnvironmentEnum.Aanbieder}
                />
                <MainNavigationItem
                    label={i18n._(t`Beheer`)}
                    icon={IconType.settings}
                    active={isActive(routes.authorized.supplier.management.index)}
                    to={routes.authorized.supplier.management.index}
                    type={UserEnvironmentEnum.Aanbieder}
                />
                {renderDev()} */}
            </>
        )
    }

    function renderDev() {
        return (
            process.env.NODE_ENV === 'development' &&
            user && (
                <>
                    <HorizontalRule />
                    <MainNavigationItem
                        label="Kitchensink"
                        icon={IconType.biscLogo}
                        active={location.pathname === routes.authorized.kitchensink}
                        to={routes.authorized.kitchensink}
                        type={user.userEnvironment}
                    />
                    <MainNavigationItem
                        label="Lingui example"
                        icon={IconType.biscLogo}
                        active={location.pathname === routes.authorized.translationsExample}
                        to={routes.authorized.translationsExample}
                        type={user.userEnvironment}
                    />
                </>
            )
        )
    }

    function isActive(indexRoute: string) {
        return !!location.pathname.startsWith(indexRoute)
    }
}

export default AppChrome
