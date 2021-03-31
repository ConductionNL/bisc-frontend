import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Space from 'components/Core/Layout/Space/Space'
import AccountInformationFieldset from 'components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset from 'components/fieldsets/shared/InformationFieldset'
import { useTaalhuisEmployeeQuery } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { TaalhuizenCoworkersDetailLocationStateProps } from './CoworkersDetailView'

interface Props {
    routeState: TaalhuizenCoworkersDetailLocationStateProps
}

const CoworkersDetailReadView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error } = useTaalhuisEmployeeQuery({
        variables: {
            userId: routeState.coworkerId,
        },
    })

    return (
        <>
            <Headline
                title={i18n._(t`Medewerker ${routeState.coworkerName}`)}
                TopComponent={
                    <Breadcrumbs>
                        {/* <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                        <Breadcrumb
                            text={params.taalhuisname}
                            to={routes.authorized.taalhuis.read.data({
                                taalhuisid: params.taalhuisid,
                                taalhuisname: params.taalhuisname,
                            })}
                        />
                        <Breadcrumb
                            text={i18n._(t`Medewerkers`)}
                            to={routes.authorized.taalhuis.read.coworkers.overview({
                                taalhuisid: params.taalhuisid,
                                taalhuisname: params.taalhuisname,
                            })}
                        /> */}
                    </Breadcrumbs>
                }
            />
            {renderSection()}
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button
                        type={ButtonType.primary}
                        icon={IconType.send}
                        onClick={() =>
                            history.push({
                                pathname: routes.authorized.bisc.taalhuizen.detail.coworkers.detail.update,
                                state: routeState,
                            })
                        }
                    >
                        {i18n._(t`Bewerken`)}
                    </Button>
                }
            />
        </>
    )

    function renderSection() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (data) {
            return (
                <>
                    <InformationFieldset
                        readOnly={true}
                        prefillData={{
                            lastname: data.taalhuisEmployee.familyName,
                            insertion: data.taalhuisEmployee.additionalName ?? '',
                            callSign: data.taalhuisEmployee.givenName,
                            phonenumber: data.taalhuisEmployee.telephone ?? '',
                        }}
                    />
                    <HorizontalRule />
                    <AccountInformationFieldset
                        readOnly={true}
                        prefillData={{
                            roles: data.taalhuisEmployee.userRoles.map(role => role.name),
                            email: data.taalhuisEmployee.email,
                            createdAt: data.taalhuisEmployee.dateCreated,
                            updatedAt: data.taalhuisEmployee.dateModified,
                        }}
                    />
                </>
            )
        }

        return null
    }
}

export default CoworkersDetailReadView
