import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { OrganizationTypeEnum } from 'api/types/types'
import { SessionContext } from 'components/Providers/SessionProvider/SessionProvider'
import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
// import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { routes } from '../../routes/routes'
import HorizontalRule from '../Core/HorizontalRule/HorizontalRule'
import { IconType } from '../Core/Icon/IconType'
import MainNavigation from '../Core/Navigation/MainNavigation/MainNavigation'
import MainNavigationEnvironmentCard from '../Core/Navigation/MainNavigation/MainNavigationEnvironmentCard'
import MainNavigationItem from '../Core/Navigation/MainNavigation/MainNavigationItem'
import AuthorizedContentLayout from '../Core/PageLayout/AuthorizedContentLayout'
import { UserContext } from '../Providers/UserProvider/context'

interface Props {}

const AppChrome: React.FunctionComponent<Props> = props => {
    const { children } = props
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const { user } = useContext(UserContext)
    const location = useLocation()
    const history = useHistory()

    if (!user) {
        return null
    }

    const fullName = NameFormatters.formattedFullname({
        givenName: user.first_name,
        familyName: user.last_name,
    })

    return (
        <AuthorizedContentLayout
            NavigationComponent={
                <MainNavigation
                    type={user.organization.type}
                    TopComponent={
                        <MainNavigationEnvironmentCard
                            name={i18n._(t`TOP`)}
                            environment={user.organization.type}
                            type={user.organization.type}
                        />
                    }
                    ListComponent={getNavigationByType()}
                    BottomComponent={
                        <>
                            <MainNavigationItem
                                label={fullName ?? ''}
                                icon={IconType.profile}
                                to={routes.authorized.profile}
                                active={isActive(routes.authorized.profile)}
                                type={user.organization.type}
                            />
                            <MainNavigationItem
                                label={i18n._(t`Uitloggen`)}
                                icon={IconType.logOut}
                                onClick={() => {
                                    if (sessionContext.removeSession) {
                                        sessionContext.removeSession()
                                    }

                                    history.push(routes.unauthorized.loggedout)
                                }}
                                type={user.organization.type}
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

        if (user.organization.type === OrganizationTypeEnum.Bisc) {
            return renderBiscNavigation()
        }

        // if (user.organization.type === UserEnvironmentEnum.Aanbieder) {
        //     return renderAanbiederNavigation()
        // }

        // if (user.organization.type === UserEnvironmentEnum.Taalhuis) {
        //     return renderTaalhuisNavigation()
        // }

        return null
    }

    function renderBiscNavigation() {
        return (
            <>
                <MainNavigationItem
                    label={i18n._(t`Taalhuizen`)}
                    icon={IconType.taalhuis}
                    active={isActive(routes.authorized.bisc.taalhuizen.index)}
                    to={routes.authorized.bisc.taalhuizen.index}
                    type={OrganizationTypeEnum.Bisc}
                />
                {/* <MainNavigationItem
                    label={i18n._(t`Aanbieders`)}
                    icon={IconType.providers}
                    active={isActive(routes.authorized.bisc.suppliers.index)}
                    to={routes.authorized.bisc.suppliers.index}
                    type={OrganizationTypeEnum.Bisc}
                />
                <MainNavigationItem
                    label={i18n._(t`Rapportages`)}
                    icon={IconType.rapportage}
                    active={isActive(routes.authorized.bisc.reports.index)}
                    to={routes.authorized.bisc.reports.index}
                    type={OrganizationTypeEnum.Bisc}
                />
                <MainNavigationItem
                    label={i18n._(t`Beheer`)}
                    icon={IconType.settings}
                    active={isActive(routes.authorized.bisc.management.index)}
                    to={routes.authorized.bisc.management.index}
                    type={OrganizationTypeEnum.Bisc}
                /> */}

                {renderDev()}
            </>
        )
    }

    // function renderTaalhuisNavigation() {
    //     return (
    //         <>
    //             <MainNavigationItem
    //                 label={i18n._(t`Deelnemers`)}
    //                 icon={IconType.taalhuis}
    //                 active={isActive(taalhuisRoutes.participants.index)}
    //                 to={taalhuisRoutes.participants.index}
    //                 type={UserEnvironmentEnum.Taalhuis}
    //             />
    //             <MainNavigationItem
    //                 label={i18n._(t`Rapportages`)}
    //                 icon={IconType.rapportage}
    //                 active={isActive(taalhuisRoutes.reports.index)}
    //                 to={taalhuisRoutes.reports.index}
    //                 type={UserEnvironmentEnum.Taalhuis}
    //             />
    //             <MainNavigationItem
    //                 label={i18n._(t`Beheer`)}
    //                 icon={IconType.settings}
    //                 active={isActive(taalhuisRoutes.management.index)}
    //                 to={taalhuisRoutes.management.index}
    //                 type={UserEnvironmentEnum.Taalhuis}
    //             />
    //             {/* {renderDev()} */}
    //         </>
    //     )
    // }

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
                        type={user.organization.type}
                    />
                    <MainNavigationItem
                        label="Lingui example"
                        icon={IconType.biscLogo}
                        active={location.pathname === routes.authorized.translationsExample}
                        to={routes.authorized.translationsExample}
                        type={user.organization.type}
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
