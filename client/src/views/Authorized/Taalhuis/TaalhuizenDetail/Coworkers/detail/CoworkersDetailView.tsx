import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import AccountInformationFieldset from '../../../../../../components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset from '../../../../../../components/fieldsets/shared/InformationFieldset'
import { useTaalhuisEmployeeQuery } from '../../../../../../generated/graphql'
import { routes } from '../../../../../../routes/routes'
import { TaalhuisCoworkersDetailParams } from '../../../../../../routes/taalhuis/types'

interface Props {}

const CoworkersDetailView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<TaalhuisCoworkersDetailParams>()
    const decodedTaalhuisid = decodeURIComponent(params.taalhuisid)
    const decodedCoworkerId = decodeURIComponent(params.coworkerid)
    const { data, loading, error } = useTaalhuisEmployeeQuery({
        variables: {
            userId: decodedCoworkerId,
        },
    })

    if (!decodedTaalhuisid) {
        return null
    }

    return (
        <>
            <Headline
                title={i18n._(t`Medewerker ${params.coworkername}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
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
                        />
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
                        onClick={() => history.push(routes.authorized.taalhuis.read.coworkers.detail.update(params))}
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

export default CoworkersDetailView
